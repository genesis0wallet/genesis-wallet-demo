const loading = document.getElementById("loading-screen");
const app = document.querySelector(".app");
const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");

window.addEventListener("load", () => {
  setTimeout(() => {
    loading.classList.add("hidden");
    app.classList.remove("hidden");
  }, 3000);
});

document.querySelectorAll(".token").forEach((t) => {
  t.addEventListener("click", () => {
    clickSound.play();
    openModal(t.dataset.token);
  });
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalBtns = document.getElementById("modal-buttons");
const closeModal = document.getElementById("close-modal");

closeModal.addEventListener("click", () => modal.classList.add("hidden"));

function openModal(symbol) {
  modal.classList.remove("hidden");
  modalTitle.textContent = `${symbol} Token`;
  modalBody.innerHTML = `<p>Balance: ${symbol === "SOL" ? "18.00" : symbol === "USDC" ? "4700.00" : "3250.00"} ${symbol}</p>`;
  modalBtns.innerHTML = `
    <button onclick="receive('${symbol}')">Receive</button>
    <button onclick="send('${symbol}')">Send</button>
    <button onclick="swap('${symbol}')">Swap</button>
  `;
}

function receive(symbol) {
  clickSound.play();
  modalBody.innerHTML = `
    <p>Receiving Address:</p>
    <code>7xR3Nf2Zg...Hq9pVx</code>
    <img src="https://api.qrserver.com/v1/create-qr-code/?data=solana:${symbol}-dummy&size=120x120" />
  `;
}

function send(symbol) {
  clickSound.play();
  modalBody.innerHTML = `
    <p>Send ${symbol}</p>
    <input type="text" placeholder="Recipient Address" />
    <input type="number" placeholder="Amount" />
    <button onclick="simulateTx()">Confirm Send</button>
  `;
}

function swap(symbol) {
  clickSound.play();
  modalBody.innerHTML = `
    <p>Swap ${symbol}</p>
    <input type="text" placeholder="From Token" />
    <input type="text" placeholder="To Token" />
    <input type="number" placeholder="Amount" />
    <button onclick="simulateTx()">Confirm Swap</button>
  `;
}

function simulateTx() {
  clickSound.play();
  modalBody.innerHTML = `<div class="bubble-flow"><span></span><span></span><span></span><span></span><span></span></div><p>T-Gen AI verifying transaction...</p>`;
  setTimeout(() => {
    successSound.play();
    modalBody.innerHTML = `<h3 style="color:cyan;">Transaction Successful ✅</h3>`;
  }, 2500);
}
