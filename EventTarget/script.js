class EventTarget {
  constructor() {
    this.listeners = {};
  }
  addEventListener(name, callback) {
    if (!this.listeners.hasOwnProperty(name)) {
      this.listeners[name] = new Set([callback]);
    } else {
      this.listeners[name].add(callback);
    }
  }

  removeEventListener(name) {
    this.listeners[name].clear();
  }

  dispatchEvent(name) {
    this.listeners[name]?.forEach((callback) => {
      callback();
    });
  }
}

const target = new EventTarget();

target.addEventListener('click', () => {
  alert('Hello!');
});
target.addEventListener('doubleclick', () => {
  alert('Good morning!');
});
target.dispatchEvent('click');
target.dispatchEvent('doubleclick');

target.removeEventListener('doubleclick', () => {
  alert('Good morning!');
});
target.removeEventListener('doubleclick', () => {
  alert('Good morning!');
});

console.log(target.listeners);
