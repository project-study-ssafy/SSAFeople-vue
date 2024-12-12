// server.js
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({
  port: 8081,
  // server: 'wss://example.com/websocket'
});

console.log("WebSocket 서버가 8081 포트에서 시작되었습니다.");

wss.on("connection", function connection(ws) {
  console.log("새로운 클라이언트 연결됨");

  // 테스트용 메시지 자동 전송
  setInterval(() => {
    const testMessage = {
      id: Date.now(),
      userName: "테스트 유저",
      content: "테스트 메시지",
      time: new Date().toLocaleTimeString(),
    };
    ws.send(JSON.stringify(testMessage));
  }, 3000); // 3초마다 메시지 전송

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
});
