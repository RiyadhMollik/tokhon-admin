import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get(`api/user/${id}`);
        setData(response.data); // Assuming response.data contains the user object
        setIsLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoader(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoader) return <Loader />;
  if (!data) return <p>No user data available.</p>;

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="fw-bold">User Details</h1>
        </div>
      </div>

      {/* Alert Section */}
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

      {/* User and Driver Details */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img
                src={data.profile_picture}
                alt={data.name}
                className="rounded-circle mb-3 mx-auto d-block"
                style={{ width: '80px', height: '80px' }}
              />
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text">Email: {data.email}</p>
              <p className="card-text">Phone: {data.phone_number}</p>
              <p className="card-text">Gender: {data.gender}</p>
              <p className="card-text">Joined AT: {data.created_at}</p>
              <p className="card-text">Address: {data.address}</p>
              <p className="card-text">Wallet Balance: {data.wallet_balance}</p>
              <hr></hr>
                <h2>NID</h2>
                <img
                  src={data.nid_photo}
                  alt={data.name}
                  className="rounded-circle mb-3 mx-auto d-block"
                  style={{ width: '80px', height: '80px' }}
                />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12 text-center mt-2">
          <button
            className=" rounded bg-primary px-2 py-1 text-xs font-medium text-white"
            onClick={() => navigate(`/user-edit/${data.user_id}`)}
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
