import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { X, Users } from "lucide-react";
import axios from "axios";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";

const baseURL = "https://backend.thaimassagesnearmeapp.com/";

const Sidebar = ({ onClose, isOpen, onSelectUser }) => {
  const token = useSelector(useCurrentToken);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const onlineUsers = ["1", "2"]; // Static for now

  useEffect(() => {
    if (!isOpen) return;

    const fetchInboxUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}api/chat/inbox/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data || []);
      } catch (err) {
        console.error("Error fetching inbox users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInboxUsers();
  }, [isOpen, token]);

  const handleUserSelect = (user) => {
    setSelectedUserId(user._id || user.user_id);
    onSelectUser(user);
  };

  return (
    <aside className="h-full w-20 lg:w-40 border-r border-base-300 flex flex-col shadow-md dark:bg-[#f5edde] ">
      <button
        onClick={onClose}
        className="flex items-center p-2 dark:text-gray-900"
      >
        <X />
      </button>

      <div className="border-b border-base-300 w-full p-5 pt-0">
        <div className="flex items-center gap-2">
          <Users className="size-6 dark:text-gray-900" />
          <span className="font-medium hidden lg:block dark:text-gray-900">
            Messages
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {loading ? (
          <SidebarSkeleton />
        ) : users.length === 0 ? (
          <div className="text-center text-zinc-500 py-4 dark:text-gray-900">
            No users found
          </div>
        ) : (
          users.map((user) => {
            const isOnline = onlineUsers.includes(user._id?.toString());
            const isSelected = selectedUserId === (user._id || user.user_id);

            return (
              <button
                key={user.user_id}
                onClick={() => handleUserSelect(user)}
                className={`w-full p-3 flex items-center gap-3 transition-colors hover:bg-base-300 ${
                  isSelected ? "bg-base-300 ring-1 ring-base-300" : ""
                }`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={
                      user?.profile_image
                        ? `${baseURL}api${user.profile_image}`
                        : "/avatar.png"
                    }
                    alt={user.name}
                    className="size-10 object-cover rounded-full"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-normal truncate text-base dark:text-zinc-600 ">
                    {user.name || "Unnamed"}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { X, Users } from "lucide-react";
// import axios from "axios";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { useCurrentToken } from "../../../redux/features/auth/authSlice";

// const baseURL = "https://backend.thaimassagesnearmeapp.com/";

// const Sidebar = ({ onClose, isOpen, onSelectUser }) => {
//   const token = useSelector(useCurrentToken);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const onlineUsers = ["1", "2"]; // Replace with dynamic online users if available

//   useEffect(() => {
//     if (!isOpen) return;

//     const fetchInboxUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${baseURL}api/chat/inbox/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(response.data || []);
//       } catch (err) {
//         console.error("Error fetching inbox users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInboxUsers();
//   }, [isOpen, token]);

//   const handleUserSelect = (user) => {
//     setSelectedUserId(user._id || user.user_id);
//     onSelectUser(user);
//   };

//   return (
//     <aside className="h-full w-20 lg:w-40 border-r border-base-300 flex flex-col transition-all duration-200">
//       <button onClick={onClose} className="flex items-center p-2">
//         <X />
//       </button>

//       <div className="border-b border-base-300 w-full p-5 pt-0">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Messages</span>
//         </div>
//       </div>

//       <div className="overflow-y-auto w-full py-3">
//         {loading ? (
//           <SidebarSkeleton />
//         ) : users.length === 0 ? (
//           <div className="text-center text-zinc-500 py-4">No users found</div>
//         ) : (
//           users.map((user) => {
//             const isOnline = onlineUsers.includes(user._id?.toString());
//             const isSelected = selectedUserId === (user._id || user.user_id);

//             return (
//               <button
//                 key={user.user_id}
//                 onClick={() => handleUserSelect(user)}
//                 className={`w-full p-3 flex items-center gap-3 transition-colors hover:bg-base-300 ${
//                   isSelected ? "bg-base-300 ring-1 ring-base-300" : ""
//                 }`}
//               >
//                 <div className="relative mx-auto lg:mx-0">
//                   <img
//                     src={
//                       user?.profile_image
//                         ? `${baseURL}api${user.profile_image}`
//                         : "/avatar.png"
//                     }
//                     alt={user.name}
//                     className="size-10 object-cover rounded-full"
//                   />
//                   {isOnline && (
//                     <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
//                   )}
//                 </div>

//                 <div className="hidden lg:block text-left min-w-0">
//                   <div className="font-normal truncate text-base">
//                     {user.name || "Unnamed"}
//                   </div>
//                   <div className="text-xs text-zinc-400">
//                     {isOnline ? "Online" : "Offline"}
//                   </div>
//                 </div>
//               </button>
//             );
//           })
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

// // import { useEffect, useState } from "react";
// // // import { useChatStore } from "../store/useChatStore";
// // // import { useAuthStore } from "../store/useAuthStore";
// // import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// // import { Users, X } from "lucide-react";
// // import axios from "axios";
// // import { useCurrentToken } from "../../../redux/features/auth/authSlice";
// // import { useSelector } from "react-redux";
// // const baseURL = "https://backend.thaimassagesnearmeapp.com/";

// // const Sidebar = ({ onClose, isOpen }) => {
// //   // const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

// //   // const { onlineUsers } = useAuthStore();
// //   const onlineUsers = ["1", "2"]; // Example online users
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [showOnlineOnly, setShowOnlineOnly] = useState(false);
// //   // const users = [
// //   //   {
// //   //     _id: "1",
// //   //     name: "John Doe",
// //   //     fullName: "John Doe",
// //   //     profilePic: "/avatar.png",
// //   //   },
// //   //   {
// //   //     _id: "2",
// //   //     name: "Jane Doe",
// //   //     fullName: "Jane Doe",
// //   //     profilePic: "/avatar.png",
// //   //   },
// //   //   {
// //   //     _id: "3",
// //   //     name: "Bob Smith",
// //   //     fullName: "Bob Smith",
// //   //     profilePic: "/avatar.png",
// //   //   },
// //   // ];

// //   // useEffect(() => {
// //   //   getUsers();
// //   // }, [getUsers]);

// //   // const filteredUsers = showOnlineOnly
// //   //   ? users.filter((user) => onlineUsers.includes(user._id))
// //   //   : users;

// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const token = useSelector(useCurrentToken)
// //   // console.log({ token })
// //   useEffect(() => {
// //     if (!isOpen) return; // Prevent unnecessary fetch when modal is closed

// //     const fetchInboxUsers = async () => {
// //       setLoading(true);
// //       try {
// //         const response = await axios.get(
// //           "https://backend.thaimassagesnearmeapp.com/api/chat/inbox/",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`, // or use withCredentials: true
// //             },
// //             // withCredentials: true,
// //           }
// //         );
// //         console.log("Fetched inbox users:", response.data);
// //         setUsers(response.data); // Adjust this if API response has a nested structure
// //       } catch (error) {
// //         console.error("Error fetching inbox users:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchInboxUsers();
// //   }, [isOpen]); // fetch only when chat opens

// //   // if (isUsersLoading) return <SidebarSkeleton />;

// //   return (
// //     <aside className="h-full w-20 lg:w-40 border-r border-base-300 flex flex-col transition-all duration-200">
// //       <button onClick={onClose} className="flex items-center p-2">
// //         {" "}
// //         <X />
// //       </button>

// //       <div className="border-b border-base-300 w-full p-5 pt-0">
// //         <div className="flex items-center gap-2">
// //           <Users className="size-6" />
// //           <span className="font-medium hidden lg:block">Messages</span>
// //         </div>
// //         {/* TODO: Online filter toggle */}
// //         {/* <div className="mt-3 hidden lg:flex items-center gap-2">
// //           <label className="cursor-pointer flex items-center gap-2">
// //             <input
// //               type="checkbox"
// //               checked={showOnlineOnly}
// //               onChange={(e) => setShowOnlineOnly(e.target.checked)}
// //               className="checkbox checkbox-sm"
// //             />
// //             <span className="text-sm">Show online only</span>
// //           </label>
// //           <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
// //         </div> */}
// //       </div>

// //       <div className="overflow-y-auto w-full py-3">
// //         {users.map((user) => (
// //           <button
// //             key={user.user_id}
// //             onClick={() => setSelectedUser(user)}
// //             className={`
// //               w-full p-3 flex items-center gap-3
// //               hover:bg-base-300 transition-colors
// //               ${
// //                 selectedUser?._id === user._id
// //                   ? "bg-base-300 ring-1 ring-base-300"
// //                   : ""
// //               }
// //             `}
// //           >
// //             <div className="relative mx-auto lg:mx-0">
// //               <img
// //                 // src={user.profile_image || "/avatar.png"}
// //                 src={`${baseURL}api${user?.profile_image}  || "/avatar.png`}
// //                 alt={user.name}
// //                 className="size-10 object-cover rounded-full"
// //               />
// //               {onlineUsers.includes(user._id) && (
// //                 <span
// //                   className="absolute bottom-0 right-0 size-3 bg-green-500
// //                   rounded-full ring-2 ring-zinc-900"
// //                 />
// //               )}
// //             </div>

// //             {/* User info - only visible on larger screens */}
// //             <div className="hidden lg:block text-left min-w-0">
// //               <div className="font-normal truncate text-base">
// //                 {user.name}
// //               </div>
// //               <div className="text-xs text-zinc-400">
// //                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
// //               </div>
// //             </div>
// //           </button>
// //         ))}

// //         {/* {filteredUsers.length === 0 && (
// //           <div className="text-center text-zinc-500 py-4">No online users</div>
// //         )} */}
// //       </div>
// //     </aside>
// //   );
// // };
// // export default Sidebar;
