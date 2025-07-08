import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../redux/features/chat/chatApi";
import { setTyping } from "../../redux/features/chat/chatSlice";

const Message = ({ roomId = 1, onClose }) => {
 const dispatch = useDispatch();
 
  const { typing } = useSelector((state) => state.chat);
  const { data: messages = [], isLoading, isError } = useGetMessagesQuery(roomId);
  const [sendMessage] = useSendMessageMutation();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://192.168.20.201:1235/ws/chat/${roomId}/`);
    socket.onopen = () => console.log("WebSocket connected");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.typing) {
        dispatch(setTyping(true));
        setTimeout(() => dispatch(setTyping(false)), 2000);
      }
    };

    setWs(socket);
    return () => socket.close();
  }, [roomId, dispatch]);

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (ws?.readyState === 1) {
      ws.send(JSON.stringify({ typing: true }));
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const message = {
      roomId,
      text: input,
      sender: "You",
      timestamp: new Date().toISOString(),
      avatar: "https://via.placeholder.com/24",
    };

    ws?.send(JSON.stringify(message));
    await sendMessage(message);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 w-80 max-h-[80vh] shadow-xl rounded-xl overflow-hidden border border-gray-200 bg-white z-50">
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
        <span>Chat with Zee</span>
        <button onClick={onClose}>×</button>
      </div>

      <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
        {isLoading && <div className="text-center text-gray-500">Loading...</div>}
        {isError && <div className="text-center text-red-500">Failed to load</div>}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-end gap-2">
              {msg.sender !== "You" && (
                <img src={msg.avatar} className="w-6 h-6 rounded-full" />
              )}
              <div>
                <div className={`px-3 py-1 rounded-lg ${msg.sender === "You" ? "bg-blue-100" : "bg-gray-100"}`}>
                  {msg.text}
                </div>
                <div className="text-[10px] text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {typing && <div className="text-xs text-gray-400">Zee is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border px-3 py-1 text-sm rounded"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
