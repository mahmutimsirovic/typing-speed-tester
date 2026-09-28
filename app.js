const sentences = [
  "JavaScript makes websites interactive.",
  "Typing speed is measured in words per minute.",
  "Practice coding every day to improve skills."
];

let startTime, currentSentence;

function startTest() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  document.getElementById('sentence').textContent = currentSentence;
  const input = document.getElementById('input');
  input.value = "";
  input.disabled = false;
  input.focus();
  document.getElementById('stats').textContent = "";
  startTime = new Date();
  document.getElementById('stopBtn').disabled = false;
  document.getElementById('restartBtn').disabled = true;
}

function stopTest() {
  const input = document.getElementById('input');
  input.disabled = true;
  document.getElementById('stopBtn').disabled = true;
  document.getElementById('restartBtn').disabled = false;

  const typed = input.value;
  const elapsed = (new Date() - startTime) / 1000; // seconds
  const wordsTyped = typed.trim().split(/\s+/).filter(w => w).length;
  const wpm = Math.round((wordsTyped / elapsed) * 60);

  const accuracy = calculateAccuracy(typed, currentSentence);

  document.getElementById('stats').textContent =
    `Final Results → Speed: ${wpm} WPM | Accuracy: ${accuracy}% | Time: ${elapsed.toFixed(1)}s`;
}

function restartTest() {
  document.getElementById('sentence').textContent = "";
  document.getElementById('input').value = "";
  document.getElementById('stats').textContent = "";
  document.getElementById('input').disabled = true;
  document.getElementById('stopBtn').disabled = true;
  document.getElementById('restartBtn').disabled = true;
}

document.getElementById('input').addEventListener('input', function() {
  const typed = this.value;
  const elapsed = (new Date() - startTime) / 1000; // seconds
  const wordsTyped = typed.trim().split(/\s+/).filter(w => w).length;
  const wpm = Math.round((wordsTyped / elapsed) * 60);

  const accuracy = calculateAccuracy(typed, currentSentence);

  document.getElementById('stats').textContent =
    `Live → Speed: ${wpm} WPM | Accuracy: ${accuracy}%`;

  if (typed.trim() === currentSentence.trim()) {
    stopTest();
    document.getElementById('stats').textContent += " ✅ Finished!";
  }
});

function calculateAccuracy(typed, target) {
  const typedWords = typed.trim().split(/\s+/).filter(w => w);
  const targetWords = target.trim().split(/\s+/);

  let correct = 0;
  typedWords.forEach(word => {
    if (targetWords.includes(word)) correct++;
  });

  return Math.round((correct / targetWords.length) * 100);
}
