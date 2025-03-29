import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';

const ServiceEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/services/${id}`);
        const service = response.data;

        setName(service.name);
        setDescription(service.description);
        setType(service.type);
        if (service.image) {
          setPreviewImage(service.image); // Set preview image if available
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      setIsLoader(true);
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("type", type);
      if (image) {
        formData.append("image", image); // Correct file handling
      }
  
      const response = await axios.put(`/api/services/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setAlertMessage(response.data.message || "Service updated successfully!");
      setAlertVisible(true);
  
      setTimeout(() => {
        setAlertVisible(false);
        if (response.data.success) {
          navigate("/service/list");
        }
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage("An error occurred while updating the service.");
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
            <li className="font-medium text-primary">Service Edit</li>
          </ol>
        </nav>
      </div>

      {alertVisible && (
        <div className="address_alert_copy custom_alert" style={{ zIndex: '200017', transition: '.3s all' }}>
          <div className="van-toast__text">{alertMessage}</div>
        </div>
      )}
      {isLoader && <Loader />}

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Update Service</h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-black dark:text-white">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">Description</label>
                <textarea
                  placeholder="Enter Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">Type</label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Please select</option>
                  <option value="rental">Rental</option>
                  <option value="share-ride">Share-ride</option>
                  <option value="parcel">Parcel</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">Image</label>
                <input
                  type="file"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImage(file);
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewImage && (
                  <div className="mt-3">
                    <img src={previewImage} alt="Preview" className="h-32 w-32 object-cover rounded-lg border" />
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button type="submit" className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceEdit;
