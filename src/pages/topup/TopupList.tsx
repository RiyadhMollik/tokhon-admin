import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../extra/loader';
import Pagination from './../Pagination';

const TopupList = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(0);

  const handleImageClick = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const fetchData = async (statusFilter = '', searchText = '') => {
    setIsLoader(true);
    try {
      const response = await axios.get('/api/wallet/top-up-requests', {
        params: {
          status: statusFilter,
          search: searchText,
          page,
        },
      });
      setData(response.data.data || []);
      setPagination(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoader(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchData(status, search);
  }, [page, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(status, search);
  };

  const handleApprove = async (id) => {
    setIsLoader(true);
    try {
      const response = await axios.post('/api/wallet/approve-topup-request', {
        topUpRequestId: id,
      });
      setAlertMessage(response.data.message || 'Approved successfully');
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
      fetchData(status, search);
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('An error occurred while updating the user.');
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
    } finally {
      setIsLoader(false);
    }
  };

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
        {isLoader && <Loader />}

        {/* Filter + Search Form */}
        <form onSubmit={handleSubmit} className="form-inline flex flex-wrap items-center gap-4 mb-4">
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-stroke bg-transparent py-2 px-4 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            type="text"
            placeholder="Search by name, email or transaction ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-stroke bg-transparent py-2 px-4 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />

          <button
            type="submit"
            className="rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
          >
            Search
          </button>
        </form>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[200px] py-3 px-4 font-medium text-black dark:text-white">Name</th>
              <th className="min-w-[100px] py-3 px-4 font-medium text-black dark:text-white">Amount</th>
              <th className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white">Transaction ID</th>
              <th className="min-w-[120px] py-3 px-4 font-medium text-black dark:text-white">Method</th>
              <th className="min-w-[100px] py-3 px-4 font-medium text-black dark:text-white">Image</th>
              <th className="min-w-[100px] py-3 px-4 font-medium text-black dark:text-white">Status</th>
              <th className="py-3 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-[#eee] dark:border-strokedark">
                <td className="py-3 px-4 text-black dark:text-white">
                  {item.user?.name || 'N/A'}
                </td>
                <td className="py-3 px-4 text-black dark:text-white">
                  {item.amount}
                </td>
                <td className="py-3 px-4 text-black dark:text-white">
                  {item.transaction_id}
                </td>
                <td className="py-3 px-4 text-black dark:text-white">
                  {item.method}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={item.image}
                    alt="proof"
                    width={50}
                    className="cursor-pointer rounded"
                    onClick={handleImageClick}
                  />
                  {showModal && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                      onClick={closeModal}
                    >
                      <img
                        src={item.image}
                        alt="Zoom"
                        className="max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 text-black dark:text-white capitalize">
                  {item.status}
                </td>
                <td className="py-3 px-4">
                  {item.status === 'pending' ? (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="rounded bg-primary px-4 py-1 text-white hover:bg-opacity-90"
                    >
                      Approve
                    </button>
                  ) : (
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          totalPages={pagination}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TopupList;
