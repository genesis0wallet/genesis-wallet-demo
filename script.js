// === BUBBLE GENERATOR ===
function createBubbles(containerId, count = 25) {
  const container = document.getElementById(containerId);
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.classList.add('bubble');
    b.style.left = Math.random() * 100 + '%';
    b.style.animationDuration = 3 + Math.random() * 4 + 's';
    b.style.animationDelay = Math.random() * 2 + 's';
    b.style.width = b.style.height = 4 + Math.random() * 6 + 'px';
    container.appendChild(b);
  }
}
createBubbles('bubbleLoad');

// === INITIAL SCAN ===
setTimeout(() => {
  document.getElementById('scan-screen').classList.remove('active');
}, 3000);

// === AI FLOW ANIMATION ===
const nodes = document.querySelectorAll('.node');
const aiFlow = document.getElementById('aiFlow');
const flowText = document.getElementById('flowText');

function simulateFlow(action) {
  aiFlow.classList.add('active');
  flowText.textContent = 'Initializing Secure Path...';
  createBubbles('bubbleFlow', 15);

  let i = 0;
  const steps = [
    'User Node',
    'Wallet Interface',
    'Genesis Engine',
    'T-Gen AI Layer',
    'Solana Network'
  ];

  const interval = setInterval(() => {
    if (i < nodes.length) {
      nodes[i].classList.add('active');
      flowText.textContent = `${action} → ${steps[i]}`;
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        aiFlow.classList.remove('active');
        nodes.forEach(n => n.classList.remove('active'));
        document.getElementById('bubbleFlow').innerHTML = '';
      }, 2000);
    }
  }, 600);
}

document.getElementById('receiveBtn').onclick = () => simulateFlow('Establishing Secure Node Link');
document.getElementById('sendBtn').onclick = () => simulateFlow('Validating Route through T-Gen AI Mesh');
document.getElementById('swapBtn').onclick = () => simulateFlow('Initiating Adaptive Exchange Protocol');
