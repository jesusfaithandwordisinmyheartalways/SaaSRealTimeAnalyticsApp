







const httpsProtocol = window.location.protocol === 'https' ? 'wss' : 'ws';
 const httpsHostName =  window.location.hostname;

 let webSocketUrl = ''

 if(httpsHostName === 'localhost') {
    webSocketUrl = `${httpsProtocol}://localhost:3001`
 } else {
    webSocketUrl = `${httpsProtocol}://saasrealtimeanalyticsappserver.onrender.com`
 }




export const socket = new WebSocket(webSocketUrl)