const MIN_DURATION = 500;
document.getElementById('add-button').addEventListener('click', addToast);
document.getElementById('clear-button').addEventListener('click', clearToasts);

function addToast() {
  const message = document.getElementById('message-content').value;
  const isCancelable = document.getElementById('cancelable').checked;
  const type = document.querySelector('input[name="type"]:checked').value;

  const toast = createToast(message, isCancelable, type);
  document.getElementById('toasts').prepend(toast);

  setTimeout(() => toast.remove(), getDuration());
}

function createToast(message, isCancelable, type) {
  console.log('click');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add(`${type}-toast`);

  const paragraph = document.createElement('p');
  paragraph.classList.add('message');
  paragraph.textContent =
    message.length > 0 ? message : getDefaultMessage(type);

  toast.appendChild(paragraph);

  if (isCancelable) {
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.textContent = 'X';
    cancelButton.addEventListener('click', () => toast.remove());
    toast.appendChild(cancelButton);
  }

  return toast;
}

function getDefaultMessage(type) {
  return type === 'error' ? 'Error...' : 'Success!';
}

function getDuration() {
  const duration = parseInt(document.getElementById('duration').value);
  if (isNaN(duration) || duration < MIN_DURATION) {
    return MIN_DURATION;
  }
  return duration;
}

function clearToasts() {
  document.getElementById('toasts').innerHTML = '';
}
