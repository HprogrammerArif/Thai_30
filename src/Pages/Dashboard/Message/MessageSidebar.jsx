import { useEffect, useState } from "react";
import axios from "axios";

const MessageSidebar = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("ws://10.10.13.75:3333/api/chat/inbox/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  return (
    <div className="w-[400px] h-[100vh] bg-white p-4 border-r border-yellow-100">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      <div className="space-y-4 overflow-y-auto h-[90%]">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserClick(user)}
            className="flex items-center p-2 rounded-lg hover:bg-yellow-50 cursor-pointer transition"
          >
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-400">{user.timeAgo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
