class ChatAPI {
    listeners = [];
    count = 0;

    constructor() {
	setInterval(() => {
	    this.count++;
	    this.listeners.forEach(cb => cb({id: this.count, body: 'lmao'}))
	}, 1000);
    }

    subscribe(cb) {
	this.listeners.push(cb);
    }

    unsubscribe(cb) {
	this.listeners = this.listeners.filter(s => s !== cb);
    }
}

export default new ChatAPI();
