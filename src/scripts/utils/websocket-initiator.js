import WebsocketNotif from './websocket-notif';

let socket = null;

const WebSocketInitiator = {
  init(url) {
    socket = new WebSocket(url);
    console.log('ws connected to => ', socket.url);

    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('websocket onmessage handler => ', message);

    const reviewData = JSON.parse(message.data);

    WebsocketNotif.sendNotification({
      title: reviewData.name,
      options: {
        body: reviewData.review,
        icon: 'icons/192x192.png',
        image: 'https://i.ibb.co/nBh3jrM/roompy-android-web.png',
        vibrate: [200, 100, 200],
      },
    });
  },
};

const sendDataToWebsocket = (reviewData) => {
  const data = JSON.stringify(reviewData);

  socket.send(data);
};

export { WebSocketInitiator, sendDataToWebsocket };
