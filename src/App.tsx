import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AuthRoute from './pages/Authentication/AuthRoute';
import PrivateRoute from './pages/Authentication/PrivateRoute';
import ServiceCreate from './pages/service/ServiceCreate';
import ServiceList from './pages/service/ServiceList';
import ListType from './pages/vehicle/ListType';
import AddType from './pages/vehicle/AddType';
import VehicleDetails from './pages/vehicle/VehicleDetails';
import AddVehicleToService from './pages/vehicle-to-service/AddVehicleToService';
import UserList from './pages/user/UserList';
import AllDriverVehicle from './pages/vehicle/AllDriverVehicle';
import RideRequestList from './pages/ride-request/RideRequestList';
import RideDetails from './pages/ride-request/RideDetails';
import UserDetails from './pages/user/UserDetails';
import UserEdit from './pages/user/UserEdit';
import TopupList from './pages/topup/TopupList';
import RideEdit from './pages/vehicle/RideEdit';
import axios from 'axios';
import ServiceEdit from './pages/service/ServiceEdit';
import TypeDetails from "./pages/vehicle/TypeDetails";
import VehicleToServiceList from './pages/vehicle-to-service/VehicleToServiceList';
import EditVehicleToService from './pages/vehicle-to-service/EditVehicleToService';
import NotificationResult from './pages/NotificationResult/NotificationResult';
import GlobalSetting from './pages/GlobalSetting/GlobalSetting';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  // axios.defaults.baseURL = 'https://localhost/ikbarvai/transport/'; // local
  // axios.defaults.baseURL = "https://hoishailhadaapi.tokhon.com/";
  axios.defaults.baseURL = "http://localhost:3000/";
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : '';

  // Define routes that should not use DefaultLayout
  const noLayoutRoutes = ['/'];

  const isNoLayoutRoute = noLayoutRoutes.includes(pathname);

  return loading ? (
    <Loader />
  ) : isNoLayoutRoute ? (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Tokhon" />
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          </>
        }
      />
    </Routes>
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <ECommerce />
              </PrivateRoute>
            </>
          }
        />

        <Route
          path="/service/create"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <ServiceCreate />
              </PrivateRoute>
            </>
          }
        />

        <Route
          path="/service/list"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <ServiceList />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/service/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <ServiceEdit />
              </PrivateRoute>
            </>
          }
        />

        <Route
          path="/vehicle-type/list"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <ListType />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/vehicle-type/create"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <AddType />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/vehicle-type/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <TypeDetails />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/vts"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <AddVehicleToService />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/vts/list"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <VehicleToServiceList />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/vts/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <EditVehicleToService />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/adv"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <AllDriverVehicle />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/rrl"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <RideRequestList />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/ride-details/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <RideDetails />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/user-details/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <UserDetails />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/user-edit/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <UserEdit />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/topup/list"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <TopupList />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/vehicle-details/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <VehicleDetails />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/ride-edit/:id"
          element={
            <>
              <PageTitle title="Tokhon" />
              <PrivateRoute>
                <RideEdit />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Tokhon" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Tokhon" />
              <Profile />
            </>
          }
        />
        <Route
          path="/messege"
          element={
            <>
              <PageTitle title="Profile | Tokhon" />
              <NotificationResult/>
            </>
          }
        />
        <Route
          path="/global-setting"
          element={
            <>
              <PageTitle title="Profile | Tokhon" />
              <GlobalSetting />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Tokhon" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Tokhon" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Tokhon" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Tokhon" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Tokhon" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Tokhon" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Tokhon" />
              <Buttons />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
