import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';

const RideEdit = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    status: 'pending',
    drivingLicense: null,
    nid: null,
    vehiclePicFront: null,
    color: null,
    year: null,
    model: null,
    number: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get('api/driver-vehicles', {
          params: { id: id },
        });
        setData(response.data.data);
        setFormData({
          status: response.data.data.status,
          drivingLicense: response.data.data.documents.drivingLicense,
          nid: response.data.data.documents.nid,
          vehiclePicFront: response.data.data.documents.vehiclePicFront,
          color: response.data.data.vehicleDetails.color,
          year: response.data.data.vehicleDetails.year,
          model: response.data.data.vehicleDetails.model,
          number: response.data.data.vehicleDetails.number,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoader(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update the field dynamically
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file, // Store the file object
        [`${name}Preview`]: URL.createObjectURL(file), // Store the preview URL
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoader(true);

    try {
      // Create a new FormData object
      const formDataObj = new FormData();

      // Append each field from the formData state to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      // Make the PUT request with the FormData object
      const response = await axios.put(`/api/driver-vehicles/${id}`, formDataObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      
      // Handle the response
      setAlertVisible(true);
      // Optionally redirect after a delay
      if (response.status === 200) {
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/adv"); // Uncomment if redirection is required
        }, 2000);
      }
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
      setAlertMessage(
        error.response?.data?.message ||
          'An error occurred while updating the user.',
      );
      setAlertVisible(true);

      setTimeout(() => setAlertVisible(false), 2000);
    } finally {
      // Hide the loader
      setIsLoader(false);
    }
  };

  if (isLoader) return <Loader />;
  if (!data) return <p>No data available.</p>;

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
            <Link to="/adv" className="font-medium text-primary">
              RIDE
            </Link>
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

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              UPDATE RIDE REQUEST
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Verified
                </label>

                <select
                  name="status"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={
                    formData.status === 'verified' ? 'verified' : 'pending'
                  } // Conditional value
                  onChange={handleChange}
                >
                  <option value="pending">False</option>
                  <option value="verified">True</option>
                </select>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Driving License
                  </label>
                  <input
                    name="drivingLicense"
                    type="file"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Driving License
                  </label>
                  <a
                    href={
                      formData.drivingLicensePreview || formData.drivingLicense
                    }
                  >
                    <img
                      src={
                        formData.drivingLicensePreview ||
                        formData.drivingLicense
                      }
                      alt="Driving License Preview"
                      width={100}
                      height={10}
                    />
                  </a>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                {/* First Name Input */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    NID
                  </label>
                  <input
                    name="nid"
                    type="file"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>

                {/* Last Name Input */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    NID
                  </label>
                  <a href={formData.nidPreview || formData.nid}>
                    <img
                      src={formData.nidPreview || formData.nid}
                      width={100}
                      height={10}
                    ></img>
                  </a>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                {/* First Name Input */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Vehicle Pic Front
                  </label>
                  <input
                    name="vehiclePicFront"
                    type="file"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>

                {/* Last Name Input */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Vehicle Pic Front
                  </label>
                  <a
                    href={
                      formData.vehiclePicFrontPreview ||
                      formData.vehiclePicFront
                    }
                  >
                    <img
                      src={
                        formData.vehiclePicFrontPreview ||
                        formData.vehiclePicFront
                      }
                      width={100}
                      height={10}
                    ></img>
                  </a>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                {/* First Name Input */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Color
                  </label>
                  <input
                    name="color"
                    type="text"
                    placeholder="Enter Color"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleChange}
                    value={formData.color}
                  />
                </div>

                {/* Last Name Input */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Model
                  </label>
                  <input
                    name="model"
                    type="text"
                    placeholder="Enter Model"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleChange}
                    value={formData.model}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                {/* First Name Input */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Year
                  </label>
                  <input
                    name="year"
                    type="text"
                    placeholder="Enter year"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleChange}
                    value={formData.year}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RideEdit;
