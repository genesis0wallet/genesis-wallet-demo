const receiveBtn = document.getElementById('receiveBtn');
const sendBtn = document.getElementById('sendBtn');
const simulation = document.getElementById('simulation');
const aiBar = document.getElementById('aiBar');

function aiFlow(statusHTML, color) {
  aiBar.style.animation = 'aiScan 0.8s linear infinite';
  simulation.style.color = color;
  simulation.innerHTML = "🔍 Detecting transaction...";

  setTimeout(() => { simulation.innerHTML = "⚙️ Analyzing data packets..."; }, 800);
  setTimeout(() => { simulation.innerHTML = "🧠 Verifying signature via T-Gen AI..."; }, 1600);
  setTimeout(() => { simulation.innerHTML = statusHTML; aiBar.style.animation = ''; }, 2500);
}

receiveBtn.addEventListener('click', () => {
  aiFlow("✅ 2.0 SOL received successfully.<br><small>(AI confirmed via neural defense mesh)</small>", "#00ff99");
});

sendBtn.addEventListener('click', () => {
  aiFlow("✅ 1.2 SOL sent successfully.<br><small>(AI validated & secured by inference relay)</small>", "#ff66cc");
});
