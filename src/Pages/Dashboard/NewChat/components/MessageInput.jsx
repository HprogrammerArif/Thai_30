
import { useState, useRef } from "react";
import { Send, X, Image } from "lucide-react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const MessageInput = ({ roomId, senderId, receiverId, onSend }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Invalid image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

   const payload = {
  message: text.trim(),
  sender: senderId,
  receiver: receiverId,
};

    onSend(payload);
    setText("");
    handleRemoveImage();
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-5 h-5 bg-base-300 rounded-full flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered rounded-lg input-sm sm:input-md w-full"
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex btn btn-circle text-zinc-400"
        >
          <Image size={20} />
        </button>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;









// import { useRef, useState } from "react";
// import { Image, Send, X } from "lucide-react";
// import toast from "react-hot-toast";
// import { useChatSocket } from "../hooks/useChatSocket";
// import { v4 as uuidv4 } from "uuid"; // or use nanoid if preferred

// const MessageInput = ({ roomId, senderId, receiverId, onReceiveMessage }) => {
//   const [text, setText] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const fileInputRef = useRef(null);

//   const { sendMessage, isConnected } = useChatSocket(
//     roomId,
//     onReceiveMessage,
//     // Optionally pass token here
//   );

//   const handleImageChange = (e) => {
//     const file = e.target?.files?.[0];
//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("Please select a valid image file.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => setImagePreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const handleRemoveImage = () => {
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSendMessage = (e) => {
//   e.preventDefault();
//   if (!text.trim() && !imagePreview) return;

//   if (!isConnected) {
//     toast.error("WebSocket is not connected. Please wait...");
//     return;
//   }

//   // const payload = {
//   //   message: text.trim(),
//   //   sender: senderId,
//   //   receiver: receiverId,
//   //   image: imagePreview || null,
//   // };

//  const payload = {
//   id: uuidv4(),
//   content: text.trim(), // instead of "message"
//   sender: senderId,
//   receiver: receiverId,
//   image: imagePreview || null,
//   timestamp: new Date().toISOString(),
// };


//   // 👇 Optimistically add the message locally
//   onReceiveMessage?.({
//     ...payload,
//     timestamp: new Date().toISOString(), // optional, for ordering
//     isLocal: true, // you can use this flag to style it differently
//   });

  

//   sendMessage(payload); // 👈 actual WebSocket send
//   setText("");
//   handleRemoveImage();
// };

//   return (
//     <div className="p-4 w-full">
//       {imagePreview && (
//         <div className="mb-3 flex items-center gap-2">
//           <div className="relative">
//             <img
//               src={imagePreview}
//               alt="Selected preview"
//               className="w-20 h-20 object-cover rounded-lg border"
//             />
//             <button
//               type="button"
//               onClick={handleRemoveImage}
//               className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
//               aria-label="Remove image"
//             >
//               <X className="size-3" />
//             </button>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <div className="flex-1 flex gap-2">
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type a message..."
//             className="w-full input input-bordered rounded-lg input-sm sm:input-md"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//             className="hidden"
//           />

//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className={`hidden sm:flex btn btn-circle ${
//               imagePreview ? "text-emerald-500" : "text-zinc-400"
//             }`}
//             aria-label="Attach image"
//           >
//             <Image size={20} />
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-sm btn-circle"
//           disabled={!text.trim() && !imagePreview}
//           aria-label="Send message"
//         >
//           <Send size={22} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;









// // import { useRef, useState } from "react";
// // import { Image, Send, X } from "lucide-react";
// // import toast from "react-hot-toast";
// // import { useChatSocket } from "../hooks/useChatSocket";

// // const MessageInput = ({ roomId, senderId, receiverId, onReceiveMessage }) => {
// //   const [text, setText] = useState("");
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const fileInputRef = useRef(null);

// //   // const { sendMessage, isConnected } = useChatSocket(roomId, onReceiveMessage);
// //   const { sendMessage, isConnected } = useChatSocket(roomId, onReceiveMessage, 
// //     // token
// //   );

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file?.type.startsWith("image/")) {
// //       toast.error("Please select a valid image file");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleRemoveImage = () => {
// //     setImagePreview(null);
// //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   };

// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //     if (!text.trim() && !imagePreview) return;

// //     if (!isConnected) {
// //       toast.error("WebSocket is not connected. Please wait...");
// //       return;
// //     }

// //     // const payload = {
// //     //   message: text.trim(),
// //     //   sender: senderId,
// //     //   receiver: receiverId,
// //     //   image: imagePreview || null,
// //     // };

// //     const payload = {
// //   message: text.trim(),
// //   sender: senderId,
// //   receiver: receiverId,
// //   image: imagePreview || null,
// //   // token, // 🟡 include token explicitly if your server expects it here
// // };

// // console.log({ payload });
// //     sendMessage(payload);
// //     setText("");
// //     handleRemoveImage();
// //   };

// //   return (
// //     <div className="p-4 w-full">
// //       {imagePreview && (
// //         <div className="mb-3 flex items-center gap-2">
// //           <div className="relative">
// //             <img
// //               src={imagePreview}
// //               alt="Preview"
// //               className="w-20 h-20 object-cover rounded-lg border"
// //             />
// //             <button
// //               type="button"
// //               onClick={handleRemoveImage}
// //               className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
// //               aria-label="Remove image"
// //             >
// //               <X className="size-3" />
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
// //         <div className="flex-1 flex gap-2">
// //           <input
// //             type="text"
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             placeholder="Type a message..."
// //             className="w-full input input-bordered rounded-lg input-sm sm:input-md"
// //           />

// //           <input
// //             type="file"
// //             accept="image/*"
// //             ref={fileInputRef}
// //             onChange={handleImageChange}
// //             className="hidden"
// //           />

// //           <button
// //             type="button"
// //             onClick={() => fileInputRef.current?.click()}
// //             className={`hidden sm:flex btn btn-circle ${
// //               imagePreview ? "text-emerald-500" : "text-zinc-400"
// //             }`}
// //             aria-label="Attach image"
// //           >
// //             <Image size={20} />
// //           </button>
// //         </div>

// //         <button
// //           type="submit"
// //           className="btn btn-sm btn-circle"
// //           disabled={!text.trim() && !imagePreview}
// //           aria-label="Send message"
// //         >
// //           <Send size={22} />
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default MessageInput;





// // import { useRef, useState } from "react";
// // import { Image, Send, X } from "lucide-react";
// // import toast from "react-hot-toast";
// // import { useChatSocket } from "../hooks/useChatSocket";

// // const MessageInput = ({ roomId, senderId, receiverId, onReceiveMessage }) => {
// //   const [text, setText] = useState("");
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const fileInputRef = useRef(null);

// //   const { sendMessage } = useChatSocket({
// //     roomId,
// //     onMessage: onReceiveMessage,
// //   });

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file?.type?.startsWith("image/")) {
// //       toast.error("Please select an image file");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const removeImage = () => {
// //     setImagePreview(null);
// //     fileInputRef.current.value = "";
// //   };

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!text.trim() && !imagePreview) return;

// //     const message = {
// //       message: text.trim(),
// //       sender: senderId,
// //       receiver: receiverId,
// //       image: imagePreview || null,
// //     };

// //     sendMessage(message);
// //     setText("");
// //     setImagePreview(null);
// //     fileInputRef.current.value = "";
// //   };

// //   return (
// //     <div className="p-4 w-full">
// //       {imagePreview && (
// //         <div className="mb-3 flex items-center gap-2">
// //           <div className="relative">
// //             <img
// //               src={imagePreview}
// //               alt="Preview"
// //               className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
// //             />
// //             <button
// //               onClick={removeImage}
// //               className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
// //               flex items-center justify-center"
// //               type="button"
// //             >
// //               <X className="size-3" />
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
// //         <div className="flex-1 flex gap-2">
// //           <input
// //             type="text"
// //             className="w-full input input-bordered rounded-lg input-sm sm:input-md"
// //             placeholder="Type a message..."
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //           />
// //           <input
// //             type="file"
// //             accept="image/*"
// //             className="hidden"
// //             ref={fileInputRef}
// //             onChange={handleImageChange}
// //           />
// //           <button
// //             type="button"
// //             className={`hidden sm:flex btn btn-circle
// //                      ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
// //             onClick={() => fileInputRef.current?.click()}
// //           >
// //             <Image size={20} />
// //           </button>
// //         </div>
// //         <button
// //           type="submit"
// //           className="btn btn-sm btn-circle"
// //           disabled={!text.trim() && !imagePreview}
// //         >
// //           <Send size={22} />
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default MessageInput;




















// // import { useRef, useState } from "react";
// // // import { useChatStore } from "../store/useChatStore";
// // import { Image, Send, X } from "lucide-react";
// // import toast from "react-hot-toast";

// // const MessageInput = () => {
// //   const [text, setText] = useState("");
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const fileInputRef = useRef(null);
// //   // const { sendMessage } = useChatStore();

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file.type.startsWith("image/")) {
// //       toast.error("Please select an image file");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const removeImage = () => {
// //     setImagePreview(null);
// //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   };

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();}

// //   // const handleSendMessage = async (e) => {
// //   //   e.preventDefault();
// //   //   if (!text.trim() && !imagePreview) return;

// //   //   try {
// //   //     await sendMessage({
// //   //       text: text.trim(),
// //   //       image: imagePreview,
// //   //     });

// //   //     // Clear form
// //   //     setText("");
// //   //     setImagePreview(null);
// //   //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   //   } catch (error) {
// //   //     console.error("Failed to send message:", error);
// //   //   }
// //   // };

// //   return (
// //     <div className="p-4 w-full">
// //       {imagePreview && (
// //         <div className="mb-3 flex items-center gap-2">
// //           <div className="relative">
// //             <img
// //               src={imagePreview}
// //               alt="Preview"
// //               className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
// //             />
// //             <button
// //               onClick={removeImage}
// //               className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
// //               flex items-center justify-center"
// //               type="button"
// //             >
// //               <X className="size-3" />
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
// //         <div className="flex-1 flex gap-2">
// //           <input
// //             type="text"
// //             className="w-full input input-bordered rounded-lg input-sm sm:input-md"
// //             placeholder="Type a message..."
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //           />
// //           <input
// //             type="file"
// //             accept="image/*"
// //             className="hidden"
// //             ref={fileInputRef}
// //             onChange={handleImageChange}
// //           />

// //           <button
// //             type="button"
// //             className={`hidden sm:flex btn btn-circle
// //                      ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
// //             onClick={() => fileInputRef.current?.click()}
// //           >
// //             <Image size={20} />
// //           </button>
// //         </div>
// //         <button
// //           type="submit"
// //           className="btn btn-sm btn-circle"
// //           disabled={!text.trim() && !imagePreview}
// //         >
// //           <Send size={22} />
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };
// // export default MessageInput;
