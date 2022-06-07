const input = document.getElementById('inputField');
const log = document.getElementById('log');

input.oninput = debounce(updateValue, 3000);

function updateValue() {
  log.textContent = input.value;
  console.log(input.value);
}

//HOF
function debounce(callback, delay, immediate = false) {
  let timerID;

  return function (...args) {
    clearTimeout(timerID);

    const shouldCallImmediately = timerID === null && immediate;
    if (shouldCallImmediately) {
      callback.apply(this, args);
    }

    timerID = setTimeout(() => {
      if (!shouldCallImmediately) {
        callback.apply(this, args);
      }
      timerID = null;
    }, delay);
  };
}
