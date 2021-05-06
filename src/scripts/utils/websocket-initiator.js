import WebsocketNotif from './websocket-notif';

const WebSocketInitiator = {
  init(url) {
    const ws = new WebSocket(url);
    console.log('ws connected to ', ws.url);

    ws.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('websocket onmessage handler => ', message.data);

    WebsocketNotif.sendNotification({
      title: 'Welcome to Resto',
      options: {
        body: 'Our restaurants offer more than just great food',
        icon: 'icons/192x192.png',
        image: 'https://i.ibb.co/nBh3jrM/roompy-android-web.png',
        vibrate: [200, 100, 200],
      },
    });
  },
};

export default WebSocketInitiator;
