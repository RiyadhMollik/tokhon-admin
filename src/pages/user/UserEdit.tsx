import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';

const UserEdit = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    is_verified: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get(`api/user/${id}`);
        setData(response.data);
        setFormData({
          is_verified: response.data.is_verified, // Ensure pre-filled data matches structure
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
    setFormData((prev) => ({
      ...prev,
      [name]: value === '1', // Convert '1' and '0' to boolean for `is_verified`
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoader(true);

    try {
      const response = await axios.put(
        `api/user/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setAlertMessage(response.data.message || 'User updated successfully');
      setAlertVisible(true);

      setTimeout(() => setAlertVisible(false), 2000);

      if (response.data.success) {
        // Uncomment this line to navigate back to the user list
        navigate('/users');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('An error occurred while updating the user.');
      setAlertVisible(true);

      setTimeout(() => setAlertVisible(false), 2000);
    } finally {
      setIsLoader(false);
    }
  };

  if (isLoader) return <Loader />;
  if (!data) return <p>No user data available.</p>;

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
            <li className="font-medium text-primary">USER</li>
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
              UPDATE USER
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Verified
                </label>

                <select
                  name="is_verified"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.is_verified ? '1' : '0'}
                  onChange={handleChange}
                >
                  <option value="0">False</option>
                  <option value="1">True</option>
                </select>
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

export default UserEdit;
