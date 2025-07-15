import { X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";
const baseURL = "http://10.10.13.75:3333/";
import { useState } from "react";

const ChatHeader = ({ selectedUser }) => {
  // const { selectedUser, setSelectedUser } = useChatStore();
  // const { onlineUsers } = useAuthStore();
  const [User, setSelectedUser] = useState(null);

  // dummy data for demonstration
  // const selectedUser = {
  //   _id: "1",
  //   name: "John Doe",
  //   fullName: "John Doe",
  //   profilePic: "/avatar.png",
  // };
  const onlineUsers = ["1", "2"]; // Example online users
  // const selectedUser = {
  //   _id: "1",
  //   name: "John Doe",
  //   fullName: "John Doe",
  //   profilePic: "/avatar.png",
  // };

  console.log({ selectedUser });

  return (
    <div className="p-2.5 border-b border-base-300 dark:text-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={
                  `${baseURL}api${selectedUser?.profile_image}` || "/avatar.png"
                }
                alt={selectedUser.name}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button> */}
      </div>
    </div>
  );
};
export default ChatHeader;
