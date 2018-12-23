function noop() {}

class Channel {
  socket = null;
  channel = null;
  queue = [];
  subscriptions = [];

  constructor(socket) {
    this.socket = socket;
  }

  join(name, { onSuccess = noop, onError = noop } = {}) {
    this.channel = this.socket.channel(`room:${name}`, {});
    this.channel
      .join()
      .receive('ok', payload => {
        onSuccess(payload);

        this.queue.forEach(action => action());
        this.queue = [];
      })
      .receive('error', onError);
  }

  subscribe(event, callback) {
    const action = () => {
      const ref = this.channel.on(event, callback);
      this.subscriptions.push(ref);
    };

    if (this.channel) {
      action();
    } else {
      this.queue.push(action);
    }
  }

  push(event, payload) {
    const action = () => {
      this.channel.push(event, payload);
    };

    if (this.channel) {
      action();
    } else {
      this.queue.push(action);
    }
  }
}

export default Channel;
