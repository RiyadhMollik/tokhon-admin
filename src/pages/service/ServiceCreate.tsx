import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';

const ServiceCreate: React.FC = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create a FormData object to gather form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('type', type);
    if (image) {
      formData.append('image', image);
    }

    try {
      setIsLoader(true);

      const response = await axios.post('/api/services', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      
      setAlertVisible(true);

      // Hide the alert after 2 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);

      // Navigate to another page if needed
      if (response.status === 201) {
        navigate('/service/list');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('An error occurred while creating the service.');
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">Service</li>
          </ol>
        </nav>
      </div>

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

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">ADD NEW</h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  placeholder="Enter Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Type
                </label>
                <select
                  name="type"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="rental">Rental</option>
                  <option value="share-ride">Share-ride</option>
                  <option value="parcel">Parcel</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Image
                </label>
                <input
                  type="file"
                  placeholder="Upload Image"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  ADD NEW
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCreate;
