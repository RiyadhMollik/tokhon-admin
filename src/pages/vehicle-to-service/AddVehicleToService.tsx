import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';

const AddVehicleToService = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);


  const [serviceId, setServiceId] = useState('');
  const [vehicleTypeId, setVehicleTypeId] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [perKm, setPerKm] = useState('');
  const [commission, setCommission] = useState('');

  const [enabled, setEnabled] = useState('');
  const [capacity, setCapacity] = useState('');
  const [outsideCity, setOutsideCity] = useState('');

  const [serviceData, setServiceData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/services');   
        setServiceData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/vehicle-types');   
        setVehicleData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      serviceId,
      vehicleTypeId,
      vehicleName,
      perKm,
      commission,
      enabled,
      capacity,
      outsideCity
    };
  
    try {
      setIsLoader(true);
      const response = await axios.post('/api/services/vehicles', data);
      setAlertVisible(true);
  
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
  
      if (response.status === 201) {
        navigate('/vehicle-type/list');
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
            <li className="font-medium text-primary">ADD VEHICLE TO SERVICE</li>
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
            <h3 className="font-medium text-black dark:text-white">
              ADD VEHICLE TO SERVICE
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form onSubmit={handleSubmit}>


              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Service
                </label>
                <select
                  name="service"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  <option value="">Please select</option>
                  {serviceData?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Vehicle
                </label>
                <select
                  name="service"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={vehicleTypeId}
                  onChange={(e) => setVehicleTypeId(e.target.value)}
                >
                  <option value="">Please select</option>
                  {vehicleData?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  placeholder="Vehicle Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Per KM
                </label>
                <input
                  type="text"
                  placeholder="Per KM"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={perKm}
                  onChange={(e) => setPerKm(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Commission
                </label>
                <input
                  type="text"
                  placeholder="Commission"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Enabled
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={enabled}
                  onChange={(e) => setEnabled(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                Capacity
                </label>
                <input
                  type="text"
                  placeholder="Capacity"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Outside City
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={outsideCity}
                  onChange={(e) => setOutsideCity(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
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

export default AddVehicleToService;
