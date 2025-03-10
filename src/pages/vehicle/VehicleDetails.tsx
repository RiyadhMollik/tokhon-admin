import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';
import { useNavigate } from 'react-router-dom';

const VehicleDetails = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get('api/driver-vehicles', {
          params: { id: id },
        });
        setData(response.data.data); // Set the full response data
        setIsLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoader(false);
      }
    };

    fetchData();
  }, [id]);

  const handleApprove = async (id) => {
    setIsLoader(true); // Show loader

    try {
      // Make the API call
      const response = await axios.get(`/api/driver-vehicle/approve`, {
        params: {
          id: id,
        },
      });

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

  if (isLoader) return <Loader />;
  if (!data) return <p>No vehicle data available.</p>;

  return (
    <div className="container mt-4">
      <h1 className="fw-bold text-center">Vehicle Details</h1>

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

      {/* Vehicle Details */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Vehicle Type: {data.vehicleTypeName}</h5>
          <p className="card-text">{data.description}</p>
          <a href={data.image}>
            <img
              width={50}
              src={data.image}
              alt="Vehicle"
              className="img-fluid mb-3"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          </a>

          {/* Conditional Rendering for Extra Options */}
          {data.extraOptions ? (
            <>
              <h6>Extra Options:</h6>
              <p>Capacity: {data.extraOptions.capacity}</p>
              <ul>
                {data.extraOptions.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No extra options available.</p>
          )}

          <h6>Documents:</h6>
          <p>
            <strong>NID:</strong>{' '}
            <a
              href={data.documents?.nid}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </p>
          <p>
            <strong>Driving License:</strong>{' '}
            <a
              href={data.documents?.drivingLicense}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </p>
          <p>
            <strong>Vehicle Front Picture:</strong>{' '}
            <a
              href={data.documents?.vehiclePicFront}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </p>
          <p>
            <strong>Driving License Number:</strong>{' '}
            {data.documents?.drivingLicenceNumber}
          </p>

          <h6>Vehicle Details:</h6>
          <p>Year: {data.vehicleDetails?.year}</p>
          <p>Color: {data.vehicleDetails?.color}</p>
          <p>Model: {data.vehicleDetails?.model}</p>
          <p>Number: {data.vehicleDetails?.number}</p>

          <p>
            <strong>Status:</strong> {data.status}
          </p>

          <p>
            <strong>Verified:</strong> {data.verified ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center mt-4">
        {data.status != 'verified' ? (
          <button
            className="inline-block rounded  py-0.5 px-2.5 text-sm font-medium bg-meta-3/[0.08] text-meta-3"
            onClick={() => handleApprove(data?.id)} // Replace with your approval logic
          >
            Approve
          </button>
        ) : (
          <div></div>
        )}
        <button
          className="inline-block rounded  py-0.5 px-2.5 text-sm font-medium bg-red/[0.08] text-red ml-5"
          onClick={() => navigate('/adv')}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;
