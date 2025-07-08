import { useEffect, useRef, useState } from "react";
import { PiPaperPlaneRightDuotone } from "react-icons/pi";
import useChatSocket from "./useChatSocket";
import axios from "axios";

export default function MessageModalTest({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);  
  const ws= useRef(null)

   const roomId = 1; // 
  const userId = 8; // current user
  const receiverId = 18; // recipient user
  
   // Always call the hook — logic inside it can check conditions
  useEffect(() => {
    ws.current = new WebSocket(`ws://192.168.20.201:1235/ws/chat/1/`);
    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.current.onmessage = (event) => {
      console.log("Received message:", event.data);
    };
    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
    ws.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.current?.close();
    };
  }, []); // always run once

  // Load room/messages when modal is opened
  useEffect(() => {
    if (!isOpen) return;

    const fetchRoomAndMessages = async () => {
      try {
        await axios.get(`http://192.168.20.201:8000/api/chat/get-or-create-room/${userId}/${receiverId}/`);
        const res = await axios.get(`http://192.168.20.201:8000/api/chat/messages/${roomId}/`);
        setMessages(res.data);
      } catch (error) {
        console.error("Chat init failed:", error);
      }
    };

    fetchRoomAndMessages();
  }, [isOpen]);

  const { sendMessage } = useChatSocket({
    roomId,
    onMessageReceived: (msg) => setMessages((prev) => [...prev, msg]),
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      message: newMessage,
      sender: userId,
    };

    sendMessage(message);
    setNewMessage("");
  };

  if (!isOpen) return null; // ❗Don't render if modal is not open





  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric", 
      minute: "2-digit",
      hour12: true,
    });

  return (
   <div className="flex flex-col h-[60vh] w-[400px] bg-[#fffaf0] border border-yellow-200 shadow-2xl rounded-xl overflow-hidden fixed bottom-24 right-24 z-50">
  {/* Header */}
  <div className="navbar bg-gradient-to-r from-[#F6C90E] to-[#E3B505] text-black shadow-md px-4 py-3">
    <div className="flex-1">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full bg-white/30 ring-2 ring-white ring-opacity-30"></div>
        </div>
        <div>
          <h2 className="font-bold text-lg text-gray-900">Chat</h2>
          <p className="text-sm font-medium text-green-700">Online</p>
        </div>
      </div>
    </div>
    <button
      onClick={onClose}
      className="text-black font-bold text-xl hover:text-red-600 transition"
    >
      ✕
    </button>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto p-4 bg-[#fffbe6] space-y-4 scroll-smooth">
    {messages.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p className="text-center text-lg">Start the conversation!</p>
      </div>
    ) : (
     messages.map((msg) => (
  <div
    key={msg.id}
    className={`chat ${msg.sender === userId ? "chat-end" : "chat-start"}`}
  >
    <div className="chat-bubble bg-yellow-200">
      {msg.message}
    </div>
  </div>
))
    )}

    {isTyping && (
      <div className="chat chat-start animate-pulse">
        <div className="chat-image avatar">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
        </div>
        <div className="chat-bubble bg-yellow-200">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Input */}
  <div className="p-4 bg-[#fff8d6] border-t border-yellow-300">
    <form onSubmit={handleSendMessage} className="flex gap-3 items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type something..."
        className="input input-bordered flex-1 rounded-full border-yellow-300 bg-white focus:ring-yellow-400"
      />
      <button
        type="submit"
        disabled={!newMessage.trim()}
        className={`btn btn-circle text-white ${
          newMessage.trim()
            ? "bg-yellow-400 hover:bg-yellow-500 hover:scale-110 shadow-lg"
            : "btn-disabled opacity-50"
        }`}
      >
        <PiPaperPlaneRightDuotone className="text-black" size={22} />
      </button>
    </form>
  </div>
</div>

  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue, push, set, off } from 'firebase/database';

// const SupportChat = ({ userId, isAdmin = false, authToken }) => {
//   const [firebase, setFirebase] = useState(null);
//   const [database, setDatabase] = useState(null);
//   const [activeChats, setActiveChats] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [chatSubject, setChatSubject] = useState('');
//   const [showNewChatForm, setShowNewChatForm] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const initFirebase = async () => {
//       try {
//         const response = await fetch('https://rongever.duckdns.org/
//  api/support/firebase-config/', {
//           headers: {
//             'Authorization': `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();

//         if (data.success) {
//           const app = initializeApp(data.config);
//           const db = getDatabase(app);
//           setFirebase(app);
//           setDatabase(db);
//         }
//       } catch (error) {
//         console.error('Firebase initialization error:', error);
//       }
//     };

//     initFirebase();
//   }, [authToken]);

//   useEffect(() => {
//     if (!database) return;

//     const loadChats = async () => {
//       try {
//         if (isAdmin) {
//           const activeChatRef = ref(database, 'active_support_chats');
//           onValue(activeChatRef, (snapshot) => {
//             const chats = [];
//             if (snapshot.exists()) {
//               Object.entries(snapshot.val()).forEach(([chatId, chatData]) => {
//                 chats.push({
//                   chatId,
//                   ...chatData
//                 });
//               });
//             }
//             setActiveChats(chats);
//           });
//         } else {
//           const response = await fetch('/api/support/get-chats/', {
//             headers: {
//               'Authorization': `Bearer ${authToken}`,
//               'Content-Type': 'application/json',
//             },
//           });
//           const data = await response.json();
//           if (data.success) {
//             setActiveChats(data.chats);
//           }
//         }
//       } catch (error) {
//         console.error('Error loading chats:', error);
//       }
//     };

//     loadChats();

//     return () => {
//       if (database && isAdmin) {
//         const activeChatRef = ref(database, 'active_support_chats');
//         off(activeChatRef);
//       }
//     };
//   }, [database, isAdmin, authToken]);

//   useEffect(() => {
//     if (!database || !currentChat) return;

//     const messagesRef = ref(database, `support_chats/${currentChat}/messages`);
//     onValue(messagesRef, (snapshot) => {
//       const messagesList = [];
//       if (snapshot.exists()) {
//         Object.entries(snapshot.val()).forEach(([messageId, messageData]) => {
//           messagesList.push({
//             messageId,
//             ...messageData
//           });
//         });
//         messagesList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
//       }
//       setMessages(messagesList);
//     });

//     return () => {
//       off(messagesRef);
//     };
//   }, [database, currentChat]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const startNewChat = async () => {
//     try {
//       const response = await fetch('/api/support/start-chat/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           subject: chatSubject || 'General Support'
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCurrentChat(data.firebase_chat_id);
//         setShowNewChatForm(false);
//         setChatSubject('');
//       }
//     } catch (error) {
//       console.error('Error starting chat:', error);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !currentChat) return;

//     try {
//       const response = await fetch(`/api/support/send-message/${currentChat}/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: newMessage,
//           type: 'text'
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setNewMessage('');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const selectChat = (chatId) => {
//     setCurrentChat(chatId);
//   };

//   const closeChat = async (chatId) => {
//     try {
//       const response = await fetch(`/api/support/close-chat/${chatId}/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCurrentChat(null);
//         setMessages([]);
//       }
//     } catch (error) {
//       console.error('Error closing chat:', error);
//     }
//   };

//   return (
//     <div className="support-chat-container bg-gray-200" style={{ display: 'flex', height: '600px', border: '1px solid #ddd' }}>
//       {/* Chat List Sidebar */}
//       <div className="chat-sidebar" style={{ width: '300px', borderRight: '1px solid #ddd', padding: '10px' }}>
//         <div className="chat-header">
//           <h3>{isAdmin ? 'Active Support Chats' : 'Your Support Chats'}</h3>
//           {!isAdmin && (
//             <button
//               onClick={() => setShowNewChatForm(true)}
//               style={{
//                 padding: '8px 16px',
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 marginBottom: '10px'
//               }}
//             >
//               Start New Chat
//             </button>
//           )}
//         </div>

//         {/* New Chat Form */}
//         {showNewChatForm && (
//           <div className="new-chat-form" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
//             <input
//               type="text"
//               placeholder="Chat subject..."
//               value={chatSubject}
//               onChange={(e) => setChatSubject(e.target.value)}
//               style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
//             />
//             <div>
//               <button onClick={startNewChat} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
//                 Start
//               </button>
//               <button onClick={() => setShowNewChatForm(false)} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Chat List */}
//         <div className="chat-list">
//           {activeChats.map((chat) => (
//             <div
//               key={chat.chatId || chat.firebase_chat_id}
//               className={`chat-item ${currentChat === (chat.chatId || chat.firebase_chat_id) ? 'active' : ''}`}
//               onClick={() => selectChat(chat.chatId || chat.firebase_chat_id)}
//               style={{
//                 padding: '10px',
//                 marginBottom: '5px',
//                 backgroundColor: currentChat === (chat.chatId || chat.firebase_chat_id) ? '#e7f3ff' : '#f8f9fa',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 cursor: 'pointer'
//               }}
//             >
//               <div style={{ fontWeight: 'bold' }}>
//                 {isAdmin ? chat.userName || chat.user?.username : chat.subject}
//               </div>
//               <div style={{ fontSize: '12px', color: '#666' }}>
//                 {chat.status} • {new Date(chat.last_message_at || chat.updated_at).toLocaleString()}
//               </div>
//               {isAdmin && (
//                 <div style={{ fontSize: '12px', color: '#666' }}>
//                   Subject: {chat.subject}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Messages Area */}
//       <div className="chat-main" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//         {currentChat ? (
//           <>
//             {/* Chat Header */}
//             <div className="chat-header" style={{ padding: '15px', borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h4>Chat: {currentChat}</h4>
//                 <button
//                   onClick={() => closeChat(currentChat)}
//                   style={{
//                     padding: '5px 10px',
//                     backgroundColor: '#dc3545',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Close Chat
//                 </button>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="messages-area" style={{ flex: 1, padding: '15px', overflowY: 'auto' }}>
//               {messages.map((message) => (
//                 <div
//                   key={message.messageId}
//                   className={`message ${message.senderType}`}
//                   style={{
//                     marginBottom: '15px',
//                     display: 'flex',
//                     justifyContent: message.senderId === userId ? 'flex-end' : 'flex-start'
//                   }}
//                 >
//                   <div
//                     style={{
//                       maxWidth: '70%',
//                       padding: '10px 15px',
//                       borderRadius: '18px',
//                       backgroundColor: message.senderId === userId ? '#007bff' : '#e9ecef',
//                       color: message.senderId === userId ? 'white' : 'black'
//                     }}
//                   >
//                     <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '5px' }}>
//                       {message.senderName} • {new Date(message.timestamp).toLocaleTimeString()}
//                     </div>
//                     <div>{message.content}</div>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message Input */}
//             <div className="message-input" style={{ padding: '15px', borderTop: '1px solid #ddd' }}>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                   placeholder="Type your message..."
//                   style={{
//                     flex: 1,
//                     padding: '10px',
//                     border: '1px solid #ddd',
//                     borderRadius: '20px',
//                     outline: 'none'
//                   }}
//                 />
//                 <button
//                   onClick={sendMessage}
//                   style={{
//                     padding: '10px 20px',
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '20px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="no-chat-selected" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupportChat;

// import { useState, useEffect } from "react";
// import { PiPaperPlaneRightDuotone } from "react-icons/pi";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	useGetMessagesQuery,
// 	useSendMessageMutation,
// 	useStartChatMutation,
// } from "../../redux/features/baseApi";
// import { addMessage, setCurrentChatId } from "../../redux/slice/chatSlice";
// import { HiOutlineChatAlt2 } from "react-icons/hi";

// export default function SupportChat() {
// 	const [newMessage, setNewMessage] = useState("");
// 	const [subject, setSubject] = useState("");
// 	const [messages, setMessages] = useState([]);
// 	const [isTyping, setIsTyping] = useState(false);

// 	const dispatch = useDispatch();

// 	const [startChat, { isLoading: isStartingChat, error: startChatError }] =
// 		useStartChatMutation();
// 	const [sendMessage] = useSendMessageMutation();

// 	const currentChatId = useSelector((state) => state.chatSlice.currentChatId);

// 	const {
// 		data: fetchedMessages,
// 		isLoading,
// 		error,
// 	} = useGetMessagesQuery(currentChatId, {
// 		skip: !currentChatId,
// 	});

// 	useEffect(() => {
// 		if (fetchedMessages) {
// 			const formattedMessages = fetchedMessages.messages.map(
// 				(message) => ({
// 					id: message.id,
// 					content: message.content,
// 					timestamp: new Date(message.timestamp),
// 					// isSent: message.sender.id === 123,
// 				})
// 			);
// 			setMessages(formattedMessages);
// 		}
// 	}, [fetchedMessages]);

// 	const handleStartChat = async () => {
// 		if (!subject.trim()) return;

// 		try {
// 			console.log("Starting chat with subject:", subject);
// 			const response = await startChat({ subject }).unwrap();
// 			const { chat } = response;
// 			console.log("Chat started successfully:", chat);
// 			dispatch(setCurrentChatId(chat.firebase_chat_id));
// 			setSubject("");
// 		} catch (error) {
// 			console.error("Error starting chat:", error);
// 		}
// 	};

// 	const handleSendMessage = async (e) => {
// 		e.preventDefault();
// 		if (!newMessage.trim()) return;

// 		if (!currentChatId) {
// 			handleStartChat(newMessage);
// 		} else {
// 			const message = {
// 				content: newMessage,
// 				type: "text",
// 			};

// 			try {
// 				const response = await sendMessage({
// 					chatId: currentChatId,
// 					message: message.content,
// 				}).unwrap();

// 				const newMessageData = {
// 					id: response.message.id,
// 					content: response.message.content,
// 					timestamp: new Date(response.message.timestamp),
// 					isSent: true,
// 				};
// 				dispatch(addMessage(newMessageData));
// 				setMessages((prevMessages) => [
// 					...prevMessages,
// 					newMessageData,
// 				]);
// 				setNewMessage("");
// 			} catch (error) {
// 				console.error("Error sending message:", error);
// 			}
// 		}
// 	};

// 	const formatTime = (date) =>
// 		date.toLocaleTimeString("en-US", {
// 			hour: "numeric",
// 			minute: "2-digit",
// 			hour12: true,
// 		});

// 	return (
// 		<div className="flex flex-col h-[60vh]  w-[400px] mx-auto bg-base-100 shadow-2xl rounded-xl overflow-hidden">
// 			<div className="navbar bg-gradient-to-r from-[#0B2A52]/90 to-[#0B2A52] text-base-100 shadow-md px-4">
// 				<div className="flex-1">
// 					<div className="flex items-center gap-3">
// 						<div className="avatar">
// 							<div className="w-10 h-10 rounded-full  bg-white/20"></div>
// 						</div>
// 						<div>
// 							<h2 className="font-bold text-lg dark:text-white">
// 								Assistant
// 							</h2>
// 							<p className="text-sm text-success">Online</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="flex-1 overflow-y-auto p-4 bg-base-200 dark:bg-white space-y-4 scroll-smooth">
// 				{isLoading ? (
// 					<div className="flex justify-center items-center h-full">
// 						<span>Loading...</span>
// 					</div>
// 				) : error ? (
// 					<div className="flex justify-center items-center h-full text-red-600">
// 						<span>Error loading messages. Please try again.</span>
// 					</div>
// 				) : !currentChatId ? (
// 					<div className="flex flex-col items-center justify-center h-full text-base-content/60">
// 						<div className="text-6xl mb-3 animate-bounce dark:text-black">
// 							<HiOutlineChatAlt2 />
// 						</div>
// 						<p className="text-center text-lg dark:text-gray-900 font-medium">
// 							Start the conversation!
// 						</p>

// 						<div className="w-full h-auto flex flex-col items-center justify-center py-10 gap-4">
// 							<input
// 								type="text"
// 								placeholder="Chat Subject"
// 								value={subject}
// 								onChange={(e) => setSubject(e.target.value)}
// 								className="py-3 w-full input input-bordered flex-1 rounded-md focus-white transition-all"
// 							/>

// 							<button
// 								onClick={handleStartChat}
// 								disabled={isStartingChat || !subject.trim()}
// 								className={`w-full rounded-md flex items-center justify-center btn bg-[#0b2a52] text-white cursor-pointer`}
// 							>
// 								Start
// 							</button>
// 						</div>
// 					</div>
// 				) : (
// 					messages.map((message, index) => (
// 						<div
// 							key={message.id}
// 							className={`chat ${message.isSent ? "chat-end" : "chat-start"} fade-in-up`}
// 							style={{ animationDelay: `${index * 100}ms` }}
// 						>
// 							{!message.isSent && (
// 								<div className="chat-image avatar">
// 									<div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary"></div>
// 								</div>
// 							)}
// 							<div
// 								className={`chat-bubble text-base ${
// 									message.isSent
// 										? "chat-bubble-primary"
// 										: "chat-bubble-accent"
// 								} shadow-md`}
// 							>
// 								{message.content}
// 							</div>
// 							<div className="chat-footer text-xs opacity-50 mt-1">
// 								{formatTime(message.timestamp)}
// 							</div>
// 						</div>
// 					))
// 				)}

// 				{isTyping && (
// 					<div className="chat chat-start animate-pulse">
// 						<div className="chat-image avatar">
// 							<div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary"></div>
// 						</div>
// 						<div className="chat-bubble chat-bubble-accent">
// 							<div className="flex space-x-1">
// 								<div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
// 								<div className="w-2 h-2 rounded-full bg-white animate-bounce delay-100"></div>
// 								<div className="w-2 h-2 rounded-full bg-white animate-bounce delay-200"></div>
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>

// 			{currentChatId && (
// 				<div className="p-4 bg-base-100 border-t border-base-300 dark:border-base-100">
// 					<form
// 						onSubmit={handleSendMessage}
// 						className="flex gap-3 items-center"
// 					>
// 						<input
// 							type="text"
// 							value={newMessage}
// 							onChange={(e) => setNewMessage(e.target.value)}
// 							placeholder={
// 								currentChatId
// 									? "Type a message..."
// 									: "Enter chat subject..."
// 							}
// 							className="input input-bordered flex-1 rounded-full focus-white transition-all"
// 						/>
// 						<button
// 							type="submit"
// 							disabled={isStartingChat || !newMessage.trim()}
// 							className={`btn btn-circle text-white cursor-pointer ${
// 								newMessage.trim() && !isStartingChat
// 									? " hover:text-white  hover:scale-105 shadow-lg "
// 									: "btn-disabled opacity-80"
// 							}`}
// 						>
// 							<PiPaperPlaneRightDuotone
// 								className="text-black dark:text-white "
// 								size={22}
// 							/>
// 						</button>
// 					</form>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
