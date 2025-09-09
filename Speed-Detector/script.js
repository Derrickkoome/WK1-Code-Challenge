// Calculate demerit points based on speed
function calculateDemeritPoints(speed) {
  const speedLimit = 70;

  // If speed is within limit
  if (speed < speedLimit) {
    return {
      status: 'ok',
      message: 'Ok',
      points: 0,
      class: 'status-ok',
      icon: '✓'
    };
  }

  // Calculate excess speed and points
  const excessSpeed = speed - speedLimit;
  const points = Math.floor(excessSpeed / 5);

  // If points exceed suspension threshold
  if (points > 12) {
    return {
      status: 'suspended',
      message: 'License suspended',
      points: points,
      class: 'status-suspended',
      icon: '✗'
    };
  }

  // If over limit but not suspended
  return {
    status: 'warning',
    message: `Points: ${points}`,
    points: points,
    class: 'status-warning',
    icon: '⚠'
  };
}

// Validate speed input (0–300)
function validateSpeed(value) {
  const num = Number(value);
  return !(value === "" || isNaN(num) || num < 0 || num > 300);
}

// Show result on screen
function showResult(speed) {
  const result = calculateDemeritPoints(speed);
  const resultDiv = document.getElementById('result');
  const statusCircle = document.getElementById('statusCircle');
  const resultText = document.getElementById('resultText');
  const speedInfo = document.getElementById('speedInfo');

  // Update UI with result
  statusCircle.textContent = result.icon;
  statusCircle.className = `status-circle ${result.class}`;
  resultText.textContent = result.message;

  // Display details based on status
  if (result.status === 'ok') {
    speedInfo.textContent = `Your speed of ${speed} km/h is within the limit`;
  } else if (result.status === 'suspended') {
    speedInfo.textContent = `Speed: ${speed} km/h | Points: ${result.points} | License suspended!`;
  } else {
    speedInfo.textContent = `Speed: ${speed} km/h | Excess: ${speed - 70} km/h`;
  }

  resultDiv.style.display = 'block';
}

// Hide result section
function hideResult() {
  document.getElementById('result').style.display = 'none';
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('error');
  const input = document.getElementById('speed');

  errorDiv.textContent = message;
  input.classList.add('error');
  hideResult();
}

// Clear error message
function clearError() {
  const errorDiv = document.getElementById('error');
  const input = document.getElementById('speed');

  errorDiv.textContent = '';
  input.classList.remove('error');
}

// Handle button click
document.getElementById('calculateBtn').addEventListener('click', function () {
  const input = document.getElementById('speed');
  const value = input.value;

  clearError();

  // Empty input check
  if (value === '') {
    showError('Please enter your speed');
    hideResult();
    return;
  }

  // Invalid input check
  if (!validateSpeed(value)) {
    showError('Please enter a valid speed between 0 and 300 km/h');
    return;
  }

  // Valid input → show result
  const speed = Number(value);
  showResult(speed);
});

// Clear error & result on input change
document.getElementById('speed').addEventListener('input', function () {
  clearError();
  hideResult();
});

// Prevent invalid key presses
document.getElementById('speed').addEventListener('keypress', function (e) {
  if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 || // Special keys
      (e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true)) { // Ctrl+X
    return;
  }
  // Only allow numbers
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
      (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
});
