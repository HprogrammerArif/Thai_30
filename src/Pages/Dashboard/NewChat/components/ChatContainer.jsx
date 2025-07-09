import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { formatMessageTime } from "../lib/utils";
import { useSelector } from "react-redux";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";

const ChatContainer = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const token = useSelector(useCurrentToken);

  const authUserId = 2; // 👈 Replace this with dynamic user ID from auth state

  useEffect(() => {
    if (!selectedUser?.chat_room_id) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.16:3333/api/chat/messages/${selectedUser.chat_room_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
        console.log("Messages loaded:", response.data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [selectedUser, token]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader selectedUser={selectedUser} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = String(message.sender) === String(authUserId);

          return (
            <div
              key={message.id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={isOwnMessage ? "/avatar.png" : selectedUser?.profile_image || "/avatar.png"}
                    alt="profile"
                  />
                </div>
              </div>

              <div className="chat-header mb-1">
                <span className="text-xs text-gray-500">
                  {isOwnMessage ? "You" : message.sender_username}
                </span>
                <time className="text-xs opacity-50 ml-2">
                  {formatMessageTime(message.timestamp)}
                </time>
              </div>

              <div className="chat-bubble">{message.content}</div>
            </div>
          );
        })}
      </div>

      <MessageInput roomId={selectedUser.chat_room_id} />
    </div>
  );
};

export default ChatContainer;





















// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import MessageInput from "./MessageInput";
// import ChatHeader from "./ChatHeader";
// import { formatMessageTime } from "../lib/utils";
// import { useSelector } from "react-redux";
// import { useCurrentToken } from "../../../redux/features/auth/authSlice";

// const ChatContainer = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const messageEndRef = useRef(null);
//   const token = useSelector(useCurrentToken)

  

//   useEffect(() => {
//     if (!selectedUser?.chat_room_id) return;

//     const fetchMessages = async () => {
//       try {
//         // const response = await axios.get(
//         //   `http://192.168.10.16:3333/api/chat/messages/${selectedUser.chat_room_id}/`
//         // );
//         const response = await axios.get(
//           `http://192.168.10.16:3333/api/chat/messages/${selectedUser.chat_room_id}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setMessages(response.data); // adjust based on actual response
//         console.log("Messages loaded:", response.data);
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser]);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const authUser = {
//     _id: "1",
//     name: "John Doe",
//     profilePic: "/avatar.png",
//   };

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader selectedUser={selectedUser} />
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${
//               message.senderId === authUser._id ? "chat-end" : "chat-start"
//             }`}
//             ref={messageEndRef}
//           >
//             <div className="chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img src={message.profilePic || "/avatar.png"} alt="profile" />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble">{message.text}</div>
//           </div>
//         ))}
//       </div>
//       <MessageInput roomId={selectedUser.chat_room_id} />
//     </div>
//   );
// };

// export default ChatContainer;

// // import { useChatStore } from "../store/useChatStore";
// // import { useEffect, useRef } from "react";

// import MessageInput from "./MessageInput";
// // import MessageSkeleton from "./skeletons/MessageSkeleton";
// // import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";
// import ChatHeader from "./ChatHeader";
// import { useRef, useState } from "react";

// const ChatContainer = () => {
//   // const {
//   //   messages,
//   //   getMessages,
//   //   isMessagesLoading,
//   //   selectedUser,
//   //   subscribeToMessages,
//   //   unsubscribeFromMessages,
//   // } = useChatStore();
//   // const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);
//   // const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // useEffect(() => {
//   //   getMessages(selectedUser._id);

//   //   subscribeToMessages();

//   //   return () => unsubscribeFromMessages();
//   // }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   // useEffect(() => {
//   //   if (messageEndRef.current && messages) {
//   //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//   //   }
//   // }, [messages]);

//   // if (isMessagesLoading) {
//   //   return (
//   //     <div className="flex-1 flex flex-col overflow-auto">
//   //       <ChatHeader />
//   //       <MessageSkeleton />
//   //       <MessageInput />
//   //     </div>
//   //   );
//   // }

//   const authUser = {
//     _id: "1",
//     name: "John Doe",
//     fullName: "John Doe",
//     profilePic: "/avatar.png",
//   };

//   const messages = [
//       {
//         _id: "1",
//         senderId: "1",
//         text: "Hello there! How are you doing today?",
//         createdAt: new Date(),
//         profilePic: "https://picsum.photos/200/300",
//       },
//       {
//         _id: "2",
//         senderId: "2",
//         text: "I'm doing great, thanks for asking! How about you?",
//         createdAt: new Date(),
//         profilePic: "https://picsum.photos/200/300",
//       },

//   ]

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   // src={
//                   //   message.senderId === authUser._id
//                   //     ? authUser.profilePic || "/avatar.png"
//                   //     : selectedUser.profilePic || "/avatar.png"
//                   // }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p className="text-sm text-gray-700">{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>
//       <MessageInput />

//     </div>
//   );
// };
// export default ChatContainer;
