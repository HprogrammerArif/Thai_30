import { useEffect, useRef, useState } from "react";

const SOCKET_BASE_URL = "ws://192.168.10.16:3333/ws/chat";

export const useChatSocket = (roomId, onMessage) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  

  useEffect(() => {
    if (!roomId) return;

    if (typeof roomId !== "string" && typeof roomId !== "number") {
      console.error("❌ Invalid roomId for WebSocket:", roomId);
    }

    const ws = new WebSocket(
      `ws://192.168.10.16:3333/ws/chat/${roomId?.id || roomId}/`
    );

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    ws.onclose = () => {
      console.warn("🔌 WebSocket disconnected");
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch (err) {
        console.error("Error parsing WebSocket message", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("⚠️ WebSocket not open");
    }

//     const socketConnection = useMemo(() => {
//   return useChatSocket(roomId, onReceiveMessage);
// }, [roomId]);
  };

  return { sendMessage, isConnected };
};

// // hooks/useChatSocket.js
// import { useEffect, useRef } from "react";

// export const useChatSocket = ({ roomId, onMessage }) => {
//   const socketRef = useRef(null);

//   useEffect(() => {
//     if (!roomId) return;

//     const ws = new WebSocket(`ws://192.168.10.16:3333/ws/chat/${roomId}/`);
//     socketRef.current = ws;

//     ws.onopen = () => {
//       console.log("✅ WebSocket connected");
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("📩 Message received:", data);
//       onMessage?.(data); // Trigger callback
//     };

//     ws.onerror = (error) => {
//       console.error("❌ WebSocket error:", error);
//     };

//     ws.onclose = () => {
//       console.log("🔌 WebSocket disconnected");
//     };

//     return () => {
//       ws.close();
//     };
//   }, [roomId]);

//   const sendMessage = (msg) => {
//     if (socketRef.current?.readyState === WebSocket.OPEN) {
//       socketRef.current.send(JSON.stringify(msg));
//     } else {
//       console.warn("⚠️ WebSocket not open");
//     }
//   };

//   return { sendMessage };
// };
