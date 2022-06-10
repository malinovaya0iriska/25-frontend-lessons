const INTERVAL_MS = 100 / 60;

let timerID;
let lastTimerStartTime = 0;
let millisecPassedBeforeLastStart = 0;

const timer = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;

  lastTimerStartTime = Date.now();

  timerID = setInterval(updateTimer, INTERVAL_MS); // requestAnimationFrame(updateTimer);
}

function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  millisecPassedBeforeLastStart += Date.now() - lastTimerStartTime;

  clearInterval(timerID); // cancelAnimationFrame(timerID);
}

function resetTimer() {
  resetButton.disabled = true;
  timer.textContent = '00:00:000';

  millisecPassedBeforeLastStart = 0;
}

function updateTimer() {
  const millisecPassed =
    Date.now() - lastTimerStartTime + millisecPassedBeforeLastStart;
  const secondsPassed = millisecPassed / 1000;
  const minutesPassed = secondsPassed / 60;

  const millisText = formatNumber(millisecPassed % 1000, 3);
  const secondsText = formatNumber(Math.floor(secondsPassed) % 60, 2);
  const minutesText = formatNumber(Math.floor(minutesPassed));

  timer.textContent = `${minutesText}:${secondsText}:${millisText}`;

  //  timerID = requestAnimationFrame(updateTimer);
}

function formatNumber(number, desiredDigitsNumber) {
  const stringNumber = String(number);

  if (stringNumber.length > desiredDigitsNumber) {
    return stringNumber.slice(0, desiredDigitsNumber);
  }

  return stringNumber.padStart(desiredDigitsNumber, '0');
}
