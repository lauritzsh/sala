import socket from './socket';

class RoomChannel {
  channel = null;
  subRefs = {};

  join(name, { onSuccess, onError }) {
    socket.onError(onError);

    this.channel = socket.channel(`room:${name}`, {});
    this.channel
      .join()
      .receive('ok', onSuccess)
      .receive('error', onError);

    return this;
  }

  onMessage(cb) {
    return this.setupSub('message', cb);
  }

  onUserJoin(cb) {
    return this.setupSub('userJoin', cb);
  }

  onUserLeave(cb) {
    return this.setupSub('userLeave', cb);
  }

  onUserTyping(cb) {
    return this.setupSub('userTyping', cb);
  }

  pushMessage(body) {
    this.channel.push('message', { body });

    return this;
  }

  pushIsTyping(isTyping) {
    this.channel.push('isTyping', { isTyping });

    return this;
  }

  unsubscribe() {
    this.channel.leave();
    this.channel = null;
  }

  setupSub(event, cb) {
    const eventRef = event + 'Ref';

    if (this[eventRef]) {
      this.channel.off(event, this[eventRef]);
    }

    this[eventRef] = this.channel.on(event, cb);

    return this;
  }
}

export default new RoomChannel();
