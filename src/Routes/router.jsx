

import { createBrowserRouter } from "react-router-dom";
import Dashborad from "../Pages/Dashboard/Dashborad";
import AdminHome from "../Pages/Dashboard/Home";
import ClientInfo from "../Pages/Dashboard/ClientInfo";
import Profile from "../Pages/Dashboard/Profile";
import CustomerDetails from "../Pages/Dashboard/CustomerDetails";
import TherapistDetails from "../Pages/Dashboard/TherapistDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashborad />,
    children: [
      {
        index: true, // This ensures that '/' loads AdminHome by default
        element: <AdminHome />
      },
      {
        path: "home",
        element: <AdminHome />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "client_info",
        element: <ClientInfo />
      },
      {
        path: "customer/:email",
        element: <CustomerDetails/>
      },
      {
        path: "therapist/:id",
        element: <TherapistDetails/>
      }
    ]
  }
]);
