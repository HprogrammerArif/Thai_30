import { useEffect, useRef } from "react";
import axios from "axios";

export default function useChatSocket({
  roomId,
  onMessageReceived,
  onSocketOpen,
}) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(`ws://192.168.20.201:1235/ws/chat/${roomId}/`);
    console.log({ socket });
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      onSocketOpen?.();
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);
      onMessageReceived(data);
    };

    socket.onerror = (err) => {
      console.error("Socket error:", err);
    };

    socket.onclose = () => {
      console.log("Socket closed");
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
