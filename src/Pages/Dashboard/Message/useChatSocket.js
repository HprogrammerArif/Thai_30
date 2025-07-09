import { useEffect, useRef } from "react";
import axios from "axios";
const BASE_WS = "ws://192.168.10.16:3333"; 

export default function useChatSocket({
  roomId,
  onMessageReceived,
  onSocketOpen,
}) {
  const socketRef = useRef(null);

  useEffect(() => {
  if (!roomId) return;

  const socket = new WebSocket(`${BASE_WS}/ws/chat/$1/`);
  socketRef.current = socket;

  socket.onopen = () => {
    console.log("WebSocket connected");
    onSocketOpen?.();
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessageReceived(data);
    } catch (e) {
      console.error("Invalid WebSocket message", e);
    }
  };

  socket.onerror = (err) => {
    console.error("Socket error:", err);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  return () => {
    socket.close();
  };
}, [roomId]);

  const sendMessage = (message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
}
