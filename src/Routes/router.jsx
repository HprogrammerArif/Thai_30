

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
      },
      {
        path: "booking_info",
        element: <Bookings/>
      },
      {
        path: "analytics",
        element: <Analytics/>
      },
      {
        path: "promotions",
        element: <Promotions/>
      },
      {
        path: "roles",
        element: <Roles/>
      },
      {
        path: "dispute_management",
        element: <DisputManagment/>
      }
    ]
  }
]);
