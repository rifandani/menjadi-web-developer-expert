const WebsocketNotif = {
  sendNotification({ title, options }) {
    const isAvailable = this._checkAvailability();
    const isPermitted = this._checkPermission();

    if (!isAvailable) {
      console.info('Notification not supported in this browser');
      return;
    }

    if (!isPermitted) {
      console.info('User did not yet granted permission');
      this._requestPermission();
      return;
    }

    this._showNotification({ title, options });
  },

  _checkAvailability() {
    return Boolean('Notification' in window);
  },

  _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.error('Notification Denied');
    }

    if (status === 'default') {
      console.warn('Permission closed');
    }
  },

  async _showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  },
};

export default WebsocketNotif;
