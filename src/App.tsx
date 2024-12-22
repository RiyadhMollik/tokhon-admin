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


import axios from 'axios';




function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  axios.defaults.baseURL = 'https://localhost/ikbarvai/transport/'; // local
  // axios.defaults.baseURL = "https://transport.myway66.com/transport/"; // live
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
            <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <PrivateRoute>
                <ServiceList />
              </PrivateRoute>
            </>
          }
        />

        <Route
          path="/vehicle-type/list"
          element={
            <>
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <PrivateRoute>
                <AddType />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/vts"
          element={
            <>
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <PrivateRoute>
                <AddVehicleToService />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Service | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <PrivateRoute>
                <VehicleDetails />
              </PrivateRoute>
            </>
          }
        />
















        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
