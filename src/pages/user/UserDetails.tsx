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
        const response = await axios.get(`/api/user-details/${id}`);
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
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8">
        <ul className="list-group">
          <li className="list-group-item active" aria-current="true">
            Details {data.name}
          </li>
          <li className="list-group-item bg-white">Email: {data.email}</li>
          <li className="list-group-item bg-white">
            Phone Number: {data.phone_number}
          </li>
          <li className="list-group-item bg-white">Address: {data.address}</li>
          <li className="list-group-item bg-white">
            NID Photo:{' '}
            <img src={data.nid_photo} alt="NID" style={{ maxWidth: '100%' }} />
          </li>
          <li className="list-group-item bg-white">
            Verified Status: {data.is_verified ? 'Verified' : 'Not-Verified'}
          </li>
          <li className="list-group-item bg-white">
            Push Token: {data.push_token}
          </li>
          <li className="list-group-item bg-white">
            Referral Code: {data.referral_code}
          </li>
          <li className="list-group-item bg-white">
            Wallet Balance: {data.wallet_balance}
          </li>
          <li className="list-group-item bg-white">Gender: {data.gender}</li>
        </ul>
      </div>
      <div className="col-sm-2"></div>

      <div className="row">
        <div className="col-sm-12 text-center mt-2">
          <button
            className="btn btn-primary fw-medium text-white py-2 px-4"
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
