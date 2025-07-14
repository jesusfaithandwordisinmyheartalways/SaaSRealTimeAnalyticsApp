


const isLocalhost = window.location.hostname === "localhost";
const protocol = window.location.protocol === "https:" ? "wss" : "ws";

const webSocketUrl = isLocalhost
  ? `${protocol}://localhost:3001`
  : `${protocol}://saasrealtimeanalyticsappserver.onrender.com`;


  
export const socket = new WebSocket(webSocketUrl);