import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../extra/loader';
import { useNavigate } from 'react-router-dom';

const RideRequestList = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Number of items per page
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const savedStatus = localStorage.getItem("status");
    const savedTimestamp = localStorage.getItem("statusTimestamp");

    if (savedStatus && savedTimestamp) {
      const currentTime = new Date().getTime();
      // Check if the saved timestamp is within the last 1 hour (3600000 milliseconds)
      if (currentTime - savedTimestamp < 3600000) {
        setStatus(savedStatus);
      } else {
        // Clear localStorage if the saved time is expired
        localStorage.removeItem("status");
        localStorage.removeItem("statusTimestamp");
      }
    }
  }, []);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // Save the status and current timestamp to localStorage
    localStorage.setItem("status", newStatus);
    localStorage.setItem("statusTimestamp", new Date().getTime());
  };
  // Fetch data function with pagination
  const fetchData = async (statusFilter = '', page = 1 , search='') => {
    setIsLoader(true);
    try {
      const response = await axios.get('api/ride-requests', {
        params: {
          status: statusFilter,
          page: page,
          limit: limit,
          search: search
        },
      });
      console.log(response);

      setData(response.data.data || []);
      setTotalPages(response.data.pagination.totalPages);
      setCurrentPage(response.data.pagination.currentPage);
      setIsLoader(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoader(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData(status, currentPage , search);
  }, [status, currentPage ,search]);


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchData(status); // Fetch data with the selected status
  };

  const handleApprove = async (id) => {
    setIsLoader(true); // Show loader

    try {
      // Make the API call
      const response = await axios.post(`/api/ride-request/approved`, {
        params: {
          id: id,
        },
      });

      // Display success message
      setAlertMessage(response.data.message || 'Approved successfully');
      setAlertVisible(true);

      // Hide alert after 2 seconds
      setTimeout(() => setAlertVisible(false), 2000);

      fetchData(status);
    } catch (error) {
      console.error('Error submitting form:', error);

      // Display error message
      setAlertMessage('An error occurred while updating the user.');
      setAlertVisible(true);

      // Hide alert after 2 seconds
      setTimeout(() => setAlertVisible(false), 2000);
    } finally {
      setIsLoader(false); // Hide loader
    }
  };

  const viewRide = (id) => {
    navigate(`/ride-details/${id}`);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(status, page);
  };
  function formatDateTime(dateTime) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    const date = new Date(dateTime);
    return date.toLocaleString('en-US', options);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {alertVisible && (
          <div
            id="copyModal"
            role="dialog"
            className="address_alert_copy custom_alert"
            style={{ zIndex: '200017', transition: '.3s all' }}
          >
            <div className="van-toast__text">{alertMessage}</div>
          </div>
        )}
        {isLoader ? <Loader /> : null}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="form-inline flex items-center gap-4"
        >
          <select
            className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            name="status"
            value={status}
            onChange={handleStatusChange}
            aria-label="Default select example"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="ride_completed">Verified</option>
            <option value="bidding">Bidding</option>
          </select>
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="flex justify-center rounded border border-gray px-6 py-3 font-medium text-black hover:bg-opacity-90"
          />
        </form>
        <br></br>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                #
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Pickup Place
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Destination Place
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date and Time
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.user_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.pickup_place}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.destination_place}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center justify-between">
                    {item.status === 'pending' ? (
                      <button
                        onClick={() => handleApprove(item.id)} // Replace with your approval logic
                        className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                      >
                        Approve
                      </button>
                    ) : (
                      <p
                        className={`${item.status === 'complete'
                          ? 'text-green-500'
                          : 'text-black'
                          } dark:text-white`}
                      >
                        {item.status}
                      </p>
                    )}
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDateTime(item.created_at)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => viewRide(item.id)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 gap-4">
          <button
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded-l`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center space-x-2">
            {/* Show the first page */}
            {currentPage > 3 && (
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
            )}

            {/* Show "..." if there are hidden pages between first and current */}
            {currentPage > 3 && (
              <span className="px-4 py-2 text-gray-500">...</span>
            )}

            {/* Show current page - 1, current page, and current page + 1 */}
            {currentPage > 1 && (
              <button
                className={`px-4 py-2 ${currentPage === currentPage - 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 '} rounded`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
            )}
            <button
              className={`px-4 py-2 ${currentPage === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage}
            </button>
            {currentPage < totalPages && (
              <button
                className={`px-4 py-2 ${currentPage === currentPage + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}

            {/* Show "..." if there are hidden pages between last and current */}
            {currentPage < totalPages - 2 && (
              <span className="px-4 py-2 text-gray-500">...</span>
            )}

            {/* Show the last page */}
            {currentPage < totalPages - 2 && (
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded-r`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>


      </div>
    </div>
  );
};

export default RideRequestList;
