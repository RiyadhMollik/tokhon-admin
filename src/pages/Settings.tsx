import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './extra/loader';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    commission: '',
    referral_commission: '',
    service_charge: '',
    approveNeed: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const response = await axios.get('api/settings');
        setFormData({
          commission: response.data.settings.commission,
          referral_commission: response.data.settings.referral_commission,
          service_charge: response.data.settings.service_charge,
          approveNeed: response.data.settings.approveNeed,
        });
        setIsLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoader(false);
      }
    };

    fetchData();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoader(true);

    try {
      const response = await axios.post(
        `/api/settings`,
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
        navigate('/settings');
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

  return (
    <div>
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
              UPDATE SETTING
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Commission
                </label>
                <input
                  type="text"
                  name="commission"
                  placeholder="Commission"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.commission}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Refer Commission
                </label>
                <input
                  type="text"
                  name="referral_commission"
                  placeholder="Refer Commission"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.referral_commission}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Service Charge
                </label>
                <input
                  type="text"
                  name="service_charge"
                  placeholder="Service Charge"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.service_charge}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Verified
                </label>

                <select
                  name="approveNeed"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.approveNeed ? '1' : '0'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      approveNeed: e.target.value === '1',
                    })
                  }
                >
                  <option value="0">False</option>
                  <option value="1">True</option>
                </select>
              </div>

              <div className="flex">
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
    </div>
  );
};

export default Settings;
