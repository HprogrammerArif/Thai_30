

import { createBrowserRouter } from "react-router-dom";
import Dashborad from "../Pages/Dashboard/Dashborad";
import AdminHome from "../Pages/Dashboard/Home";
import ClientInfo from "../Pages/Dashboard/ClientInfo";

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
        path: "client_info",
        element: <ClientInfo />
      }
    ]
  }
]);
