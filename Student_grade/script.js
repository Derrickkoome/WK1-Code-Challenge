function getGradeInfo(marks) {
  if (marks > 79) return { letter: "A", class: "grade-a", range: "80-100" };
  if (marks >= 60) return { letter: "B", class: "grade-b", range: "60-79" };
  if (marks >= 49) return { letter: "C", class: "grade-c", range: "49-59" };
  if (marks >= 40) return { letter: "D", class: "grade-d", range: "40-49" };
  return { letter: "E", class: "grade-e", range: "0-39" };
}

function validateMarks(value) {
  const num = Number(value);
  if (value === "" || isNaN(num) || num < 0 || num > 100) {
    return false;
  }
  return true;
}

function showResult(marks) {
  const gradeInfo = getGradeInfo(marks);
  const result = document.getElementById('result');
  const gradeCircle = document.getElementById('gradeCircle');
  const gradeText = document.getElementById('gradeText');
  const gradeRange = document.getElementById('gradeRange');

  gradeCircle.textContent = gradeInfo.letter;
  gradeCircle.className = `grade-circle ${gradeInfo.class}`;
  gradeText.textContent = `Grade: ${gradeInfo.letter}`;
  gradeRange.textContent = `Range: ${gradeInfo.range}`;
  
  result.style.display = 'block';
}

function hideResult() {
  document.getElementById('result').style.display = 'none';
}

function showError(message) {
  const errorDiv = document.getElementById('error');
  const input = document.getElementById('marks');
  
  errorDiv.textContent = message;
  input.classList.add('error');
  hideResult();
}

function clearError() {
  const errorDiv = document.getElementById('error');
  const input = document.getElementById('marks');
  
  errorDiv.textContent = '';
  input.classList.remove('error');
}

document.getElementById('marks').addEventListener('input', function(e) {
  const value = e.target.value;
  
  clearError();
  
  if (value === '') {
    hideResult();
    return;
  }
  
  if (!validateMarks(value)) {
    showError('Please enter a valid mark between 0 and 100');
    return;
  }
  
  const marks = Number(value);
  showResult(marks);
});

document.getElementById('marks').addEventListener('keypress', function(e) {
  if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)) {
    return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
      (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
});
