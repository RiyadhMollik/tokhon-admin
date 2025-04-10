import React, { useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import axios from 'axios';

const ECommerce: React.FC = () => {
  const [rideData, setRideData] = React.useState({});
  const [userData, setUserData] = React.useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ride-request/dashboard/all');
        setRideData(response.data); // Directly set the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/count/drivers-and-users');
        setUserData(response.data); // Directly set the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchUserData();
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Ride Request" total={rideData?.totalRideRequests} rate="00%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8L12 12L8 8M12 12L12 2M12 12L16 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>

        <CardDataStats title="Total Users" total={userData?.totalNormalUsers} rate="00%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <circle cx="15" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M5 15C5 12.2386 7.23858 10 10 10C12.7614 10 15 12.2386 15 15"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </CardDataStats>

        <CardDataStats title="Total Drivers" total={userData?.totalDrivers} rate="00%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <circle cx="15" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 14C12 13.4477 12.4477 13 13 13H17C17.5523 13 18 13.4477 18 14V18C18 18.5523 17.5523 19 17 19H13C12.4477 19 12 18.5523 12 18V14Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </CardDataStats>

        <CardDataStats title="Total Ride Places" total={rideData?.totalRidePlaces} rate="00%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2L20 6L16 10L12 6L16 2Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          </svg>
        </CardDataStats>

        <CardDataStats title="Total Bidding/Active" total={rideData?.totalBiddingActive} rate="00%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0L11 12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M7 4L11 0L15 4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M7 18L11 14L15 18"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </CardDataStats>

        <CardDataStats title="Total Ride Complete" total={rideData?.totalRideComplete} rate="00%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="2" />
            <path
              d="M11 8L11 15"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 11L15 11"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </CardDataStats>

        <CardDataStats title="Total Req Ride Pending" total={rideData?.totalRideReqPending} rate="00%" levelDown>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2L10 12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M7 6L10 2L13 6"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </CardDataStats>

        <CardDataStats title="Total Ride Canceled" total={rideData?.totalRideCanceled} rate="00%" levelDown>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L20 20"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 2L2 20"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </CardDataStats>
      </div>
    </>
  );
};

export default ECommerce;
