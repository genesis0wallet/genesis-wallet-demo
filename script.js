const app = document.querySelector(".app");
const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");

const playSound = (audio) => {
  if (!audio) return;
  try {
    audio.currentTime = 0;
    const played = audio.play();
    if (played && typeof played.then === "function") {
      played.catch(() => {});
    }
  } catch (_) {}
};

window.addEventListener("load", () => {
  app.classList.remove("hidden");
});

document.querySelectorAll(".token").forEach((t) => {
  t.addEventListener("click", () => {
    playSound(clickSound);
    openModal(t.dataset.token);
  });
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalBtns = document.getElementById("modal-buttons");
const closeModalBtn = document.getElementById("close-modal");

const hideModal = () => {
  if (modal.classList.contains("hidden")) return;
  playSound(clickSound);
  modal.classList.remove("show");
  const finishHide = (event) => {
    if (event.target === modal && event.propertyName === "opacity" && !modal.classList.contains("show")) {
      modal.classList.add("hidden");
    }
  };
  modal.addEventListener("transitionend", finishHide, { once: true });
  setTimeout(() => {
    if (!modal.classList.contains("show")) {
      modal.classList.add("hidden");
    }
  }, 450);
};

closeModalBtn.addEventListener("click", hideModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

function openModal(symbol) {
  modalTitle.textContent = `${symbol} Token`;
  modalBody.innerHTML = `<p>Balance: ${symbol === "SOL" ? "18.00" : symbol === "USDC" ? "4700.00" : "3250.00"} ${symbol}</p>`;
  modalBtns.innerHTML = `
    <button onclick="receive('${symbol}')">Receive</button>
    <button onclick="send('${symbol}')">Send</button>
    <button onclick="swap('${symbol}')">Swap</button>
  `;
  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("show"));
}

function receive(symbol) {
  playSound(clickSound);
  modalBody.innerHTML = `
    <p>Receiving Address:</p>
    <code>7xR3Nf2Zg...Hq9pVx</code>
    <img src="https://api.qrserver.com/v1/create-qr-code/?data=solana:${symbol}-dummy&size=120x120" />
  `;
}

function send(symbol) {
  playSound(clickSound);
  modalBody.innerHTML = `
    <p>Send ${symbol}</p>
    <input type="text" placeholder="Recipient Address" />
    <input type="number" placeholder="Amount" />
    <button onclick="simulateTx()">Confirm Send</button>
  `;
}

function swap(symbol) {
  playSound(clickSound);
  modalBody.innerHTML = `
    <p>Swap ${symbol}</p>
    <input type="text" placeholder="From Token" />
    <input type="text" placeholder="To Token" />
    <input type="number" placeholder="Amount" />
    <button onclick="simulateTx()">Confirm Swap</button>
  `;
}

function simulateTx() {
  playSound(clickSound);
  modalBody.innerHTML = `<div class="bubble-flow"><span></span><span></span><span></span><span></span><span></span></div><p>T-Gen AI verifying transaction...</p>`;
  setTimeout(() => {
    playSound(successSound);
    modalBody.innerHTML = `<h3 style="color:cyan;">Transaction Successful ✅</h3>`;
  }, 2500);
}
