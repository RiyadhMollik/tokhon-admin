import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';
import { useNavigate } from 'react-router-dom';

const VehicleDetails = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState(null);
  const [extra, setExtra] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get(`api/driver-vehicles/${id}`);
        setData(response.data); // Set the full response data
        console.log(response.data);
        setExtra(JSON.parse(response.data.extraOptions))
        setIsLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoader(false);
      }
    };

    fetchData();
  }, [id]);

  const handleApprove = async () => {
    setIsLoader(true); // Show loader
    try {
      // Make the API call
      const response = await axios.put(`/api/driver-vehicles/approve/${id}`);

      // Display success message
      setAlertMessage(response.data.message || 'Approved successfully');
      setAlertVisible(true);

      // Hide alert after 2 seconds
      setTimeout(() => setAlertVisible(false), 2000);

      window.location.reload();
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
  const documents = JSON.parse(data?.documents || "{}");
  const vehicleDetails = JSON.parse(data?.vehicleDetails || "{}");
  if (isLoader) return <Loader />;
  if (!data) return <p>No vehicle data available.</p>;

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Vehicle Details</h1>

      {alertVisible && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded shadow-lg z-50">
          {alertMessage}
        </div>
      )}

      {isLoader && <Loader />}

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h5 className="text-lg font-semibold text-gray-700">Vehicle Type: {data.vehicleTypeName}</h5>
        <p className="text-gray-600 mt-2">{data.description}</p>
        <div className="mt-4">
          <a href={data.image}>
            <img
              src={data.image}
              alt="Vehicle"
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          </a>
        </div>

        {extra ? (
          <div className="mt-4">
            <h6 className="text-lg font-semibold text-gray-700">Extra Options:</h6>
            <p className="text-gray-600">Capacity: {extra.capacity}</p>
            <ul className="list-disc list-inside text-gray-600">
              {extra.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">No extra options available.</p>
        )}

        <div className="mt-4">
          <h6 className="text-lg font-semibold text-gray-700">Documents:</h6>
          <p className="text-gray-600"><strong>NID:</strong> <a href={documents.nid} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></p>
          <p className="text-gray-600"><strong>Driving License:</strong> <a href={documents.drivingLicense} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></p>
          {documents.vehiclePicFront ? (
            <p className="text-gray-600"><strong>Vehicle Front Picture:</strong> <a href={documents.vehiclePicFront} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></p>
          ) : (
            <p className="text-gray-600"><strong>Vehicle Front Picture:</strong> Not Available</p>
          )}
          <p className="text-gray-600"><strong>Driving License Number:</strong> {documents.drivingLicenceNumber || "Not Available"}</p>
        </div>

        <div className="mt-4">
          <h6 className="text-lg font-semibold text-gray-700">Vehicle Details:</h6>
          <p className="text-gray-600">Year: {vehicleDetails?.year}</p>
          <p className="text-gray-600">Color: {vehicleDetails?.color}</p>
          <p className="text-gray-600">Model: {vehicleDetails?.model}</p>
          <p className="text-gray-600">Number: {vehicleDetails?.number}</p>
          <p className="text-gray-600"><strong>Status:</strong> {data.status}</p>
          <p className="text-gray-600"><strong>Verified:</strong> {data.verified ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        {data.status !== "verified" && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md"
            onClick={() => handleApprove(data?.id)}
          >
            Approve
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={() => navigate("/adv")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;
