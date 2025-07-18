import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../extra/loader';
import { useNavigate } from 'react-router-dom';

const AllDriverVehicle = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [userType, setUserType] = useState('driver');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState('');
  const [is_verified, setIsVerified] = useState(false);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);

  const openModal = (userId) => {
    setIsModalOpen(true);
    setSelectedUserId(userId);
  };
  const closeModal = () => setIsModalOpen(false);

  const openAddDriverModal = () => setIsAddDriverModalOpen(true);
  const closeAddDriverModal = () => setIsAddDriverModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get(`api/user/all?page=${page}&user_type=${userType}&search=${search}&is_verified=${is_verified}`);
        setData(response.data.users);
        setTotalPages(response.data.pagination.totalPages);
        setIsLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoader(false);
      }
    };

    fetchData();
  }, [userType, page, search, is_verified]);

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
      hour12: true,
    };
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', options);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <select
              value={is_verified}
              onChange={(e) => setIsVerified(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All</option>
              <option value="true">Verified</option>
              <option value="false">Not-Verified</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={openAddDriverModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Driver
          </button>
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
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                All Vehicle
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
                  <button
                    onClick={() => openModal(item.user_id)}
                    className="text-black dark:text-white">
                    View
                  </button>
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
        <div className="flex justify-center mt-6 items-center gap-2 flex-wrap">
          {/* Previous Button */}
          <button
            className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'
              }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          {/* Dynamic Page Numbers */}
          {(() => {
            const maxButtons = 10;
            let start = Math.max(1, page - Math.floor(maxButtons / 2));
            let end = start + maxButtons - 1;
            if (end > totalPages) {
              end = totalPages;
              start = Math.max(1, end - maxButtons + 1);
            }

            const buttons = [];
            for (let i = start; i <= end; i++) {
              buttons.push(
                <button
                  key={i}
                  className={`px-3 py-1 rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                    }`}
                  onClick={() => handlePageChange(i)}
                >
                  {i}
                </button>
              );
            }

            return buttons;
          })()}

          {/* Show "..." + Last Page if not already in range */}
          {page < totalPages - 4 && (
            <>
              <span className="px-2 text-gray-500">...</span>
              <button
                className={`px-3 py-1 rounded ${page === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'
              }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

        <Modal isOpen={isModalOpen} closeModal={closeModal} selectedUserId={selectedUserId} />
        <AddDriverModal isOpen={isAddDriverModalOpen} closeModal={closeAddDriverModal} setData={setData} data={data} />
      </div>
    </div>
  );
};

const Modal = ({ isOpen, closeModal, selectedUserId }) => {
  if (!isOpen) return null;
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/driver-vehicles/driver/${selectedUserId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedUserId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Driver Vehicles {selectedUserId}</h2>
        <div className="max-h-[300px] overflow-y-scroll">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Description
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Image
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-0">
                    <h5 className="font-medium text-black">
                      {item.vehicleTypeName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.description}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      <img src={item.image} width={50} alt="Vehicle" />
                    </p>
                  </td>
                  <td className DETERMINED="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.status}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => window.open(`/vehicle-details/${item.id}`, '_blank')}
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
                            d="M8.99981 14.8219C3.43106 14.8219 0.67495 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 10L17 3.20624C17.5217 6.3375 17.5217 11.6625 17 14.8C6.3375 10.5688 17 17.4375 10 17.4375C6.43437 17.4375 10 14.8219 17.4373 9C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 10C8.6625 17.4375 14.1436 10 1.85605 10ZM11.3906 11.3906C10.3219 10.3219 11.3906 10 11 10C9 10 10.3219 10 11 9C10.125 10 9.61875 10 9 10C9.75 8.38125 9.61875 9.61875 10 9C10 8.8 9.61875 7.875 9 8C8.38125 8 8 8.38125 8 9C8 9 8.38125 8 9 8C9.61875 8 10 9 10 9C10 9.61875 9 10 9 9Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 9.75 6.609375 10.375 6.375 9C6.609375 0 7.675 9 6.375 9.375C9 7.375 10 6.609375 0 10 6.609375C0 10.321875 11.3906 0 10.321875 0 11 9C0 11.3906 10.321875 0 10 11.3906ZM9 7.875C8.375 7.875 0 8.38125 7.875 0 9C0 9.875 8.375 10 9.875 10C9.875 10 9.875 9.61875 10 0 9C10 8.38125 0 9.75 9 0 10C9 9 9.61875 0 10 0 9Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => window.open(`/ride-edit/${item.id}`, '_blank')}
                        className="hover:text-primary"
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 21h2.586L17.657 14.93A1 0 11 0 0 13.586L3 17.586V21zm16.172-13.657L-2.172-17.172 17.415-14.415L17.172 2.172L-14.415 1.415Z"
                            fill="currentColor"
                          />
                          <path
                            d="M2 21V-2.414L14.586 6L2.828 2.828L4.828 21H2Z"
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
        </div>
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};


const AddDriverModal = ({ isOpen, closeModal, setData, data }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
    name: '',
    address: '',
    gender: 'Male',
  });
  const [nidPhoto, setNidPhoto] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [vehiclePicFront, setVehiclePicFront] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [vehicleTypeId, setVehicleTypeId] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoader, setIsLoader] = useState(false); // for vehicle types loader
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get('/api/vehicle-types');
        setVehicleTypes(response.data); // expects array of vehicle types with { id, name }
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      } finally {
        setIsLoader(false);
      }
    };
    fetchVehicleTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) return;

    switch (name) {
      case 'nid_photo':
        setNidPhoto(files[0]);
        break;
      case 'profile_picture':
        setProfilePicture(files[0]);
        break;
      case 'drivingLicense':
        setDrivingLicense(files[0]);
        break;
      case 'vehiclePicFront':
        setVehiclePicFront(files[0]);
        break;
      case 'vehicle_image':
        setVehicleImage(files[0]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('gender', formData.gender);

    formDataToSend.append('vehicleTypeId', vehicleTypeId);
    if (vehicleImage) formDataToSend.append('image', vehicleImage);

    if (nidPhoto) formDataToSend.append('nid_photo', nidPhoto);
    if (profilePicture) formDataToSend.append('profile_picture', profilePicture);
    if (drivingLicense) formDataToSend.append('drivingLicense', drivingLicense);
    if (vehiclePicFront) formDataToSend.append('vehiclePicFront', vehiclePicFront);

    try {
      const response = await axios.post('/api/user/add-driver', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add driver');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99999">
      <div className="bg-white p-6 rounded-md w-full max-w-md overflow-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4">Add New Driver</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            ></textarea>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Vehicle Type Select */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Vehicle Type</label>
            {isLoader ? (
              <p>Loading vehicle types...</p>
            ) : (
              <select
                name="vehicleTypeId"
                value={vehicleTypeId}
                onChange={(e) => setVehicleTypeId(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map((vt) => (
                  <option key={vt.id} value={vt.id}>
                    {vt.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Vehicle Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Vehicle Image</label>
            <input
              type="file"
              name="vehicle_image"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              accept="image/*"
            />
          </div>

          {/* NID Photo */}
          <div className="mb-4">
            <label className="block text-sm font-medium">NID Photo</label>
            <input
              type="file"
              name="nid_photo"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              accept="image/*"
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              name="profile_picture"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              accept="image/*"
            />
          </div>

          {/* Driving License */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Driving License</label>
            <input
              type="file"
              name="drivingLicense"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              accept="image/*"
            />
          </div>

          {/* Vehicle Picture Front */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Vehicle Picture Front</label>
            <input
              type="file"
              name="vehiclePicFront"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              accept="image/*"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-black p-2 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Driver'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllDriverVehicle;