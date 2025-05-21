
import { createBrowserRouter } from "react-router-dom";

import Dashborad from "../Pages/Dashboard/Dashborad";
import AdminHome from "../Pages/Dashboard/Home";
import ClientInfo from "../Pages/Dashboard/ClientInfo";
import Profile from "../Pages/Dashboard/Profile";
import CustomerDetails from "../Pages/Dashboard/CustomerDetails";
import TherapistDetails from "../Pages/Dashboard/TherapistDetails";
import Bookings from "../Pages/Dashboard/Bookings";
import Analytics from "../Pages/Dashboard/Analytics";
import Promotions from "../Pages/Dashboard/Promotions";
import Roles from "../Pages/Dashboard/Roles";
import DisputManagment from "../Pages/Dashboard/DisputManagment";

import SignUp from "../Pages/Authentication/SignUp";
import Login from "../Pages/Authentication/Login";
import Forget_Password from "../Pages/Authentication/Forget_Password";
import OTP_Verification from "../Pages/Authentication/OTP_Verification";
import ResetPassword from "../Pages/Authentication/ResetPassword";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign_up",
    element: <SignUp />
  },
  {
    path: "/email_varification",
    element: <Forget_Password />
  },
  {
    path: "/verification",
    element: <OTP_Verification />
  },
  {
    path: "/reset_password",
    element: <ResetPassword />
  },

  // Dashboard routes (accessed after login)
  {
    path: "/dashboard",
    element: <Dashborad />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "home", element: <AdminHome /> },
      { path: "profile", element: <Profile /> },
      { path: "client_info", element: <ClientInfo /> },
      { path: "customer/:email", element: <CustomerDetails /> },
      { path: "therapist/:id", element: <TherapistDetails /> },
      { path: "booking_info", element: <Bookings /> },
      { path: "analytics", element: <Analytics /> },
      { path: "promotions", element: <Promotions /> },
      { path: "roles", element: <Roles /> },
      { path: "dispute_management", element: <DisputManagment /> }
    ]
  }
]);

