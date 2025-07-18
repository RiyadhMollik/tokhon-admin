import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../extra/loader';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [userType, setUserType] = useState('normal');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get(`api/user/all?page=${page}&user_type=${userType}&search=${search}`);
        setData(response.data.users); // Assuming `response.data` is an array of services
        setTotalPages(response.data.pagination.totalPages)
        setIsLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoader(false);
      }
    };

    fetchData();
  }, [userType, page, search]);

  const viewUser = (id) => {
    window.open(`/user-details/${id}`, '_blank');
  };
  const handlePageChange = (page) => {
    setPage(page);
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
      <div className="max-w-full ">
        <div className="flex justify-between items-center mb-4">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {alertVisible && (
          <div className="address_alert_copy custom_alert" style={{ zIndex: '200017', transition: '.3s all' }}>
            <div className="van-toast__text">{alertMessage}</div>
          </div>
        )}
        {isLoader && <Loader />}

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                Address
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                Gender
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
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
                    {item.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.phone_number}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.address}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.gender}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.is_verified == false ? 'Not-Verified' : 'Verified'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.created_at && formatDateTime(item.created_at)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => viewUser(item.user_id)}
                      className="hover:text-primary"
                    >
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

                    <button
                      onClick={() => window.open(`/user-edit/${item.user_id}`, '_blank')}
                      className="hover:text-primary"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 21h2.586L17.657 8.93a1 1 0 0 0 0-1.415l-2.172-2.172a1 1 0 0 0-1.415 0L3 16.586V21zm16.172-13.657l-2.172-2.172 1.415-1.415 2.172 2.172-1.415 1.415z"
                          fill="currentColor"
                        />
                        <path
                          d="M2 21v-2.414L14.586 6l2.828 2.828L4.828 21H2z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Dynamic Pagination Buttons */}
        <div className="flex justify-center mt-4 gap-4">
          {/* Previous Button */}
          <button
            className={`px-4 py-2 rounded-l ${page === 1 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-2">
            {(() => {
              const pages = [];
              const maxButtons = 10;
              let start = Math.max(1, page - Math.floor(maxButtons / 2));
              let end = start + maxButtons - 1;

              if (end > totalPages) {
                end = totalPages;
                start = Math.max(1, end - maxButtons + 1);
              }

              for (let i = start; i <= end; i++) {
                pages.push(
                  <button
                    key={i}
                    className={`px-4 py-2 rounded ${page === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    onClick={() => handlePageChange(i)}
                  >
                    {i}
                  </button>
                );
              }

              // Add last page button if it's not already included
              if (end < totalPages) {
                if (end < totalPages - 1) {
                  pages.push(
                    <span key="ellipsis" className="px-2 text-gray-500">...</span>
                  );
                }
                pages.push(
                  <button
                    key={totalPages}
                    className={`px-4 py-2 rounded ${page === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                );
              }

              return pages;
            })()}
          </div>

          {/* Next Button */}
          <button
            className={`px-4 py-2 rounded-r ${page === totalPages ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'}`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
