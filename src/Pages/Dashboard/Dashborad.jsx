import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import {
  BadgePercent,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  MessagesSquare,
} from "lucide-react";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsFillBarChartFill } from "react-icons/bs";
import { useGetAdminQuery } from "../redux/features/baseAPI/baseApi";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";
import { FaHistory } from "react-icons/fa";

const userRole = {
  ADMIN: "admin",
  FINANCE: "finance",
  BOOKING: "booking",
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: adminData } = useGetAdminQuery();
  // const { data: financeData } = useGetFinanceQuery();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  let profileData;

  const baseURL = "http://192.168.10.16:3333/";

  const menuItems = [
    {
      items: [
        {
          name: "Dashboard",
          icon: <LuLayoutDashboard size={20} />,
          path: "/dashboard/home",
        },
        {
          name: "Users & Therapists",
          icon: <FaUserGroup size={20} />,
          path: "/dashboard/client_info",
        },
        {
          name: "Bookings & Payments",
          icon: <CalendarDays size={20} />,
          path: "/dashboard/booking_info",
        },
        {
          name: "Roles & Permissions",
          icon: <RiUserSettingsLine size={20} />,
          path: "/dashboard/roles",
        },
        {
          name: "Analytics",
          icon: <BsFillBarChartFill size={20} />,
          path: "/dashboard/analytics",
        },
        {
          name: "Promotions",
          icon: <BadgePercent size={20} />,
          path: "/dashboard/promotions",
        },
        {
          name: "Dispute Management",
          icon: <MessagesSquare size={20} />,
          path: "/dashboard/dispute_management",
        },

        //Finance Admin Dashboard routes
        {
          name: "Dashboard",
          icon: <LuLayoutDashboard size={20} />,
          path: "/dashboard/finance_admin_home",
        },
        {
          name: "Dispute Management",
          icon: <MessagesSquare size={20} />,
          path: "/dashboard/dispute_management",
        },

        //Booking Admin Dashboard routes
        {
          name: "Dashboard",
          icon: <LuLayoutDashboard size={20} />,
          path: "/dashboard/booking_admin_home",
        },
        {
          name: "Users & Therapists",
          icon: <FaUserGroup size={20} />,
          path: "/dashboard/client_info",
        },
        {
          name: "Bookings & Payments",
          icon: <CalendarDays size={20} />,
          path: "/dashboard/booking_info",
        },
      ],
    },
  ];

  // const user = useSelector(selectCurrentUser);
  // let menuItems = [];

  // // const role = user.role;
  // const role = 'booking';

  // switch (role) {
  //   case userRole.ADMIN:
  //     menuItems = [
  //       {
  //         items: [
  //           {
  //             name: "Dashboard",
  //             icon: <LuLayoutDashboard size={20} />,
  //             path: "/dashboard/home",
  //           },
  //           {
  //             name: "Users & Therapists",
  //             icon: <FaUserGroup size={20} />,
  //             path: "/dashboard/client_info",
  //           },
  //           {
  //             name: "Bookings & Payments",
  //             icon: <CalendarDays size={20} />,
  //             path: "/dashboard/booking_info",
  //           },
  //           {
  //             name: "Roles & Permissions",
  //             icon: <RiUserSettingsLine size={20} />,
  //             path: "/dashboard/roles",
  //           },
  //           {
  //             name: "Analytics",
  //             icon: <BsFillBarChartFill size={20} />,
  //             path: "/dashboard/analytics",
  //           },
  //           {
  //             name: "Promotions",
  //             icon: <BadgePercent size={20} />,
  //             path: "/dashboard/promotions",
  //           },
  //           {
  //             name: "Dispute Management",
  //             icon: <MessagesSquare size={20} />,
  //             path: "/dashboard/dispute_management",
  //           },
  //         ],
  //       },
  //     ];
  //     break;

  //   case userRole.FINANCE:
  //     menuItems = [
  //      {
  //       items: [
  //          //Finance Admin Dashboard routes
  //       {
  //         name: "Dashboard",
  //         icon: <LuLayoutDashboard size={20} />,
  //         path: "/dashboard/finance_admin_home",
  //       },
  //       {
  //         name: "Dispute Management",
  //         icon: <MessagesSquare size={20} />,
  //         path: "/dashboard/dispute_management",
  //       },
  //       ]
  //      }
  //     ];
  //     break;

  //   case userRole.BOOKING:
  //     menuItems = [
  //      {
  //       items : [
  //          //Booking Admin Dashboard routes
  //       {
  //         name: "Dashboard",
  //         icon: <LuLayoutDashboard size={20} />,
  //         path: "/dashboard/booking_admin_home",
  //       },
  //       {
  //         name: "Booking History",
  //         icon: <FaHistory size={20} />,
  //         path: "/dashboard/booking_history",
  //       },
  //       {
  //         name: "Users & Therapists",
  //         icon: <FaUserGroup size={20} />,
  //         path: "/dashboard/client_info",
  //       },
  //       {
  //         name: "Bookings & Payments",
  //         icon: <CalendarDays size={20} />,
  //         path: "/dashboard/booking_info",
  //       },
  //       ]
  //      }
  //     ];
  //     break;

  //   default:
  //     break;
  // }

  // //logout function
  // const handleLogOut =( )=>{
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("refresh_token");

  //   setTimeout(() => {
  //     navigate("/login")
  //   }, 500);
  // }

  const handleLogOut = () => {
    dispatch(logout());

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const user = useSelector(selectCurrentUser);

  // if(user?.role){}

  switch (user?.role) {
    case "admin":
      profileData = adminData;
      break;

    // case "finance_admin":
    //   profileData = financeData;
    //   break;

    default:
      break;
  }

  console.log({ user, adminData });
  // Derive selectedItem for header display
  const selectedItem =
    menuItems[0]?.items?.find((item) => item.path === location.pathname)
      ?.name || "Dashboard";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 transition-all duration-500 ease-in-out`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4">
          <div className="flex items-center ms-1 gap-2 mt-20">
            <div
              className={`transform transition-all duration-500 ${
                isCollapsed
                  ? "opacity-0 -translate-x-full"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <img
                src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747305047/Group_1686551099_1_pijkms.png"
                alt="Logo"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 md:mt-20">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-8">
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.path}
                      end // Ensure exact matching for routes
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 group relative ${
                          isActive
                            ? "bg-gray-200 text-gray-900 font-semibold"
                            : ""
                        }`
                      }
                    >
                      <span
                        className={`group-hover:text-gray-700 transition-colors duration-300 ${
                          location.pathname === item.path
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`transform transition-all duration-500 ${
                          isCollapsed
                            ? "opacity-0 -translate-x-full"
                            : "opacity-100 translate-x-0"
                        } whitespace-nowrap`}
                      >
                        {item.name}
                      </span>
                      {item.badge && !isCollapsed && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 py-10">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
              >
                {isCollapsed ? (
                  <ChevronsRight size={20} />
                ) : (
                  <ChevronsLeft size={20} />
                )}
              </button>
              <div className="flex flex-col">
                <span className="text-gray-700 font-bold text-xl">
                  {selectedItem}
                </span>
                <h1>
                  Hi, Welcome{" "}
                  <span className="text-[#B28D28] font-bold">
                    {adminData?.full_name}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4 me-10">
              <button className="p-2 bg-[#FAE08C1A] hover:bg-[#f8de91] border-2 border-[#B28D2833] rounded-full transition-colors duration-300">
                <Bell size={24} className="text-[#B28D28]" />
              </button>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12">
                  <img
                    src={`${baseURL}api${adminData?.image}`}
                    className="rounded-full w-10 h-10 object-cover"
                    alt="Admin Avatar"
                  />
                </div>
                <div>
                  <h2 className="font-bold">{adminData?.role}</h2>
                  <p className="text-gray-900">{adminData?.email}</p>
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <ChevronDown size={20} />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content mt-4 menu bg-base-200 rounded-box z-50 w-32 p-2 shadow-md border border-gray-400"
                  >
                    <li>
                      <NavLink
                        to="/dashboard/profile"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-12 bg-[#F5F5F6]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
