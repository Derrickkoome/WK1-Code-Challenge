function calculateDemeritPoints(speed) {
  const speedLimit = 70;

  if (speed < speedLimit) {
    return {
      status: 'ok',
      message: 'Ok',
      points: 0,
      class: 'status-ok',
      icon: '✓'
    };
  }

  const excessSpeed = speed - speedLimit;
  const points = Math.floor(excessSpeed / 5);

  if (points > 12) {
    return {
      status: 'suspended',
      message: 'License suspended',
      points: points,
      class: 'status-suspended',
      icon: '✗'
    };
  }

  return {
    status: 'warning',
    message: `Points: ${points}`,
    points: points,
    class: 'status-warning',
    icon: '⚠'
  };
}

function validateSpeed(value) {
  const num = Number(value);
  return !(value === "" || isNaN(num) || num < 0 || num > 300);
}

function showResult(speed) {
  const result = calculateDemeritPoints(speed);
  const resultDiv = document.getElementById('result');
  const statusCircle = document.getElementById('statusCircle');
  const resultText = document.getElementById('resultText');
  const speedInfo = document.getElementById('speedInfo');

  statusCircle.textContent = result.icon;
  statusCircle.className = `status-circle ${result.class}`;
  resultText.textContent = result.message;

  if (result.status === 'ok') {
    speedInfo.textContent = `Your speed of ${speed} km/h is within the limit`;
  } else if (result.status === 'suspended') {
    speedInfo.textContent = `Speed: ${speed} km/h | Points: ${result.points} | License suspended!`;
  } else {
    speedInfo.textContent = `Speed: ${speed} km/h | Excess: ${speed - 70} km/h`;
  }

  resultDiv.style.display = 'block';
}

function hideResult() {
  document.getElementById('result').style.display = 'none';
}

function showError(message) {
  const errorDiv = document.getElementById('error');
  const input = document.getElementById('speed');

  errorDiv.textContent = message;
  input.classList.add('error');
  hideResult();
}

function clearError() {
  const errorDiv = document.getElementById('error');
  const input = document.getElementById('speed');

  errorDiv.textContent = '';
  input.classList.remove('error');
}

document.getElementById('calculateBtn').addEventListener('click', function () {
  const input = document.getElementById('speed');
  const value = input.value;

  clearError();

  if (value === '') {
    showError('Please enter your speed');
    hideResult();
    return;
  }

  if (!validateSpeed(value)) {
    showError('Please enter a valid speed between 0 and 300 km/h');
    return;
  }

  const speed = Number(value);
  showResult(speed);
});

document.getElementById('speed').addEventListener('input', function () {
  clearError();
  hideResult();
});

document.getElementById('speed').addEventListener('keypress', function (e) {
  if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)) {
    return;
  }
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
      (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
});
