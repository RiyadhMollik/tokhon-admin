import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';
import { useNavigate } from 'react-router-dom';

const RideDetails = () => {
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
        const response = await axios.get('api/ride-details', {
          params: { id: id },
        });
        setData(response.data.data);
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
      const response = await axios.get(`/api/ride-approve`, {
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
  if (!data) return <p>No ride data available.</p>;

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="fw-bold">Ride Details</h1>
        </div>
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

      {/* User Details Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <img
                src={data.user_pic}
                alt={data.user_name}
                className="rounded-circle mb-3"
                style={{ width: '80px', height: '80px' }}
              />
              <h5 className="card-title">{data.user_name}</h5>
              <p className="card-text">Phone: {data.user_number}</p>
              <p className="card-text">Rating: {data.user_rating}</p>
            </div>
          </div>
        </div>

        {/* Driver Details */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <img
                src={data.driver_pic}
                alt={data.driver_name}
                className="rounded-circle mb-3"
                style={{ width: '80px', height: '80px' }}
              />
              <h5 className="card-title">{data.driver_name}</h5>
              <p className="card-text">Phone: {data.driver_number}</p>
              <p className="card-text">Rating: {data.driver_rating}</p>
              <p className="card-text">Vehicle: {data.vehicle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Details Section */}
      <div className="row mb-4">
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Ride Details</h5>
              <p className="card-text">
                <strong>Pickup:</strong> {data.pickup_place}
              </p>
              <p className="card-text">
                <strong>Destination:</strong> {data.destination_place}
              </p>
              <p className="card-text">
                <strong>Fare:</strong> ${data.fare}
              </p>
              <p className="card-text">
                <strong>Time:</strong> {new Date(data.time).toLocaleString()}
              </p>
              <p className="card-text">
                <strong>Status:</strong> {data.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bids Section */}
      <div className="row">
        <div className="col">
          <h5>Bids</h5>
          {data.bids.map((bid, index) => (
            <div className="card mb-3 shadow-sm" key={index}>
              <div className="card-body">
                <img
                  src={bid.profilePic}
                  alt={bid.name}
                  className="rounded-circle me-3"
                  style={{ width: '50px', height: '50px' }}
                />
                <strong>{bid.name}</strong>
                <p>Phone: {bid.number}</p>
                <p>Vehicle: {bid.vehicle}</p>
                <p>Bid Amount: ${bid.bidAmount}</p>
                <p>Status: {bid.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Button */}
      <div className="row mt-4">
        <div className="col text-center">
          {data?.status === 'pending' ? (
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
            onClick={() => navigate(`/rrl`)}
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
