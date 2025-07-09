import { useState } from "react";
import ChatContainer from "./components/ChatContainer";
import NoChatSelected from "./components/NoChatSelected";
import Sidebar from "./components/Sidebar";

const ChatHome = ({ isOpen, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(null); // LIFT STATE UP

  return (
    <div className="flex flex-col h-[60vh] w-[600px] bg-[#fffaf0] border border-yellow-200 shadow-2xl rounded-xl overflow-hidden fixed bottom-24 right-24 z-50">
      <div className="flex h-[100%] rounded-lg overflow-hidden">
            <Sidebar
              onClose={onClose}
              isOpen={isOpen}
              onSelectUser={setSelectedUser} // PASS DOWN HANDLER
            />

            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer selectedUser={selectedUser} />
            )}
          </div>
    </div>
  );
};

export default ChatHome;





// import { useState } from "react";
// import ChatContainer from "./components/ChatContainer";
// import NoChatSelected from "./components/NoChatSelected";
// import Sidebar from "./components/Sidebar";

// const ChatHome = ({ isOpen, onClose }) => {
//   const [selectedUser, setSelectedUser] = useState(null); // LIFT STATE UP

//   return (
//     <div className="flex flex-col h-[60vh] w-[600px] bg-[#fffaf0] border border-yellow-200 shadow-2xl rounded-xl overflow-hidden fixed bottom-24 right-24 z-50">
//       <div className="flex items-center justify-center">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-[68%] rounded-lg overflow-hidden">
//             <Sidebar
//               onClose={onClose}
//               isOpen={isOpen}
//               onSelectUser={setSelectedUser} // PASS DOWN HANDLER
//             />

//             {!selectedUser ? (
//               <NoChatSelected />
//             ) : (
//               <ChatContainer selectedUser={selectedUser} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatHome;
























// // import { useChatStore } from "../store/useChatStore";
// import { X } from "lucide-react";
// import ChatContainer from "./components/ChatContainer";
// import NoChatSelected from "./components/NoChatSelected";
// import Sidebar from "./components/Sidebar";


// const ChatHome = ({ isOpen, onClose }) => {
//   // const { selectedUser } = useChatStore();
//   const { selectedUser } = [
//     {
//       _id: "1",
//       name: "John Doe",
//       fullName: "John Doe",
//       profilePic: "/avatar.png",
//     },
//     {
//       _id: "2",
//       name: "Jane Doe",
//       fullName: "Jane Doe",
//       profilePic: "/avatar.png",
//     },
//     {
//       _id: "3",
//       name: "Bob Smith",
//       fullName: "Bob Smith",
//       profilePic: "/avatar.png",
//     },
//   ]

//   return (
//     <div className="flex flex-col h-[60vh] w-[600px] bg-[#fffaf0] border border-yellow-200 shadow-2xl rounded-xl overflow-hidden fixed bottom-24 right-24 z-50">
     
//        {/* <button
//           onClick={onClose}
//           className="text-black font-bold text-xl hover:text-red-600 transition flex ml-auto p-3"
//         >
//           ✕
//         </button> */}

  
//       <div className="flex items-center justify-center">
//         {/* <button onClick={onClose} className="flex items-center p-2">  <X /></button> */}
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-[68%] rounded-lg overflow-hidden">
//             <Sidebar onClose={onClose} isOpen={isOpen} />

//             {/* {!selectedUser ? <NoChatSelected /> : <ChatContainer />} */}
//             {/* {!selectedUser ? <NoChatSelected /> : <ChatContainer />} */}
//             {<ChatContainer />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ChatHome;
