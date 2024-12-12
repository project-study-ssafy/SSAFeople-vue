// services/websocket.js
export function initializeWebSocket() {
  const ws = new WebSocket("ws://localhost:8081/");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  return ws;
}
