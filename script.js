const app = document.querySelector(".app");
const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");
const loadingOverlay = document.getElementById("loading-overlay");
const settingsBtn = document.getElementById("settings-btn");
const settingsTemplate = document.getElementById("settings-template");
const profileBtn = document.getElementById("profile-btn");
const profileMenu = document.getElementById("profile-menu");
const closeProfileBtn = document.getElementById("close-profile");

const tokenBalances = {
  SOL: { amount: 18.0, fiatUSD: 4700.0 },
  USDC: { amount: 4700.0, fiatUSD: 4700.0 },
  RAY: { amount: 3250.0, fiatUSD: 6000.55 },
};

const formatCurrency = (value) =>
  Number.isFinite(value)
    ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "$0.00";

const sanitizeNumber = (value) => {
  if (!value || value === "." || value === "-") return 0;
  return Number.parseFloat(value);
};

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

document.querySelectorAll(".pill-btn").forEach((button) => {
  button.addEventListener("click", () => {
    playSound(clickSound);
    const action = button.dataset.action;
    const defaultToken = "SOL";
    openModal(defaultToken);
    if (action === "receive") {
      receive(defaultToken);
    }
    if (action === "send") {
      send(defaultToken);
    }
    if (action === "swap") {
      swap(defaultToken);
    }
  });
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalBtns = document.getElementById("modal-buttons");

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

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    hideModal();
  }
});

const showLoading = () => {
  if (!loadingOverlay) return;
  loadingOverlay.classList.remove("hidden");
  requestAnimationFrame(() => loadingOverlay.classList.add("active"));
};

const hideLoading = () => {
  if (!loadingOverlay) return;
  loadingOverlay.classList.remove("active");
  const finalize = () => {
    if (!loadingOverlay.classList.contains("active")) {
      loadingOverlay.classList.add("hidden");
    }
  };
  loadingOverlay.addEventListener("transitionend", finalize, { once: true });
  setTimeout(finalize, 400);
};

function openModal(symbol) {
  const info = tokenBalances[symbol] || { amount: 0, fiatUSD: 0 };
  modalTitle.textContent = `${symbol} Token`;
  modalBody.innerHTML = `
    <div class="token-preview">
      <div>
        <p class="token-preview__label">Available Balance</p>
        <h3 class="token-preview__value">${info.amount.toLocaleString()} ${symbol}</h3>
        <p class="token-preview__fiat">${formatCurrency(info.fiatUSD)}</p>
      </div>
      <p class="token-preview__hint">Choose an action below to continue.</p>
    </div>
  `;
  modalBtns.innerHTML = `
    <button onclick="receive('${symbol}')">Receive</button>
    <button onclick="send('${symbol}')">Send</button>
    <button onclick="swap('${symbol}')">Swap</button>
  `;
  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("show"));
}

const openSettings = () => {
  if (!settingsTemplate) return;
  const fragment = settingsTemplate.content.cloneNode(true);
  modalTitle.textContent = "T-Gen AI Protection";
  modalBody.innerHTML = "";
  modalBody.appendChild(fragment);
  modalBtns.innerHTML = "";
  const saveBtn = modalBody.querySelector("#save-settings-btn");
  const feedback = modalBody.querySelector(".settings-feedback");
  if (feedback) {
    feedback.classList.add("hidden");
  }
  saveBtn?.addEventListener("click", () => {
    playSound(successSound);
    if (feedback) {
      feedback.textContent = "Settings saved.";
      feedback.classList.remove("hidden");
    }
    setTimeout(() => {
      hideModal();
    }, 2000);
  });
  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("show"));
};

if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    playSound(clickSound);
    openSettings();
  });
}

const openProfileMenu = () => {
  if (!profileMenu) return;
  profileMenu.classList.remove("hidden");
  profileBtn?.classList.add("active");
  requestAnimationFrame(() => profileMenu.classList.add("show"));
};

const closeProfileMenu = () => {
  if (!profileMenu) return;
  profileMenu.classList.remove("show");
  profileBtn?.classList.remove("active");
  const finalize = (event) => {
    if (!profileMenu.classList.contains("show") && (!event || event.target === profileMenu)) {
      profileMenu.classList.add("hidden");
    }
  };
  profileMenu.addEventListener("transitionend", finalize, { once: true });
  setTimeout(finalize, 420);
};

const toggleProfileMenu = () => {
  if (!profileMenu) return;
  if (profileMenu.classList.contains("show")) {
    closeProfileMenu();
  } else {
    openProfileMenu();
  }
};

profileBtn?.addEventListener("click", () => {
  playSound(clickSound);
  toggleProfileMenu();
});

closeProfileBtn?.addEventListener("click", () => {
  playSound(clickSound);
  closeProfileMenu();
});

profileMenu?.addEventListener("click", (event) => {
  if (event.target.classList.contains("profile-backdrop")) {
    closeProfileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && profileMenu?.classList.contains("show")) {
    closeProfileMenu();
  }
});

const profileItems = Array.from(document.querySelectorAll(".profile-item"));

profileItems.forEach((item) => {
  item.addEventListener("click", () => {
    playSound(clickSound);
    profileItems.forEach((entry) => entry.classList.remove("active"));
    item.classList.add("active");
    const avatar = item.querySelector(".avatar");
    if (avatar && profileBtn) {
      const initial = avatar.textContent.trim().charAt(0) || "G";
      const placeholder = profileBtn.querySelector(".profile-initial");
      if (placeholder) {
        placeholder.textContent = initial;
      }
    }
    setTimeout(closeProfileMenu, 220);
  });
});

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
  const info = tokenBalances[symbol] || { amount: 0, fiatUSD: 0 };
  const price = info.amount ? info.fiatUSD / info.amount : 0;
  modalBody.innerHTML = `
    <div class="flow-card send-flow">
      <section class="flow-section">
        <label class="flow-label">To</label>
        <div class="flow-recipient">
          <div>
            <p class="flow-recipient__name">Main Acc ${symbol}</p>
            <p class="flow-recipient__address">9bgP...CjDt</p>
          </div>
          <button class="flow-pill">Address Book</button>
        </div>
      </section>

      <section class="flow-amount">
        <p class="flow-label">Enter Amount</p>
        <div class="flow-amount-display">
          <input class="flow-amount-input" type="text" inputmode="decimal" pattern="[0-9.]*" data-flow-input="amount" value="0" />
          <span class="flow-asset">${symbol}</span>
        </div>
        <p class="flow-fiat" data-flow-fiat>~$0.00</p>
      </section>

      <div class="flow-availability">
        <div>
          <p class="flow-availability__label">Available to send</p>
          <p class="flow-availability__value">${info.amount.toLocaleString()} ${symbol}</p>
        </div>
        <button class="flow-pill" data-flow-max>Max</button>
      </div>

      <button class="flow-primary" onclick="simulateTx()">Send Now</button>
    </div>
  `;
  modalBtns.innerHTML = "";
  initializeFlowControls({ container: modalBody, price, balance: info.amount });
}

function swap(symbol) {
  playSound(clickSound);
  const payToken = symbol;
  const receiveToken = symbol === "USDC" ? "SOL" : "USDC";

  const renderSwap = ({ paySym, receiveSym }) => {
    const payInfo = tokenBalances[paySym] || { amount: 0, fiatUSD: 0 };
    const receiveInfo = tokenBalances[receiveSym] || { amount: 0, fiatUSD: 0 };
    const payPrice = payInfo.amount ? payInfo.fiatUSD / payInfo.amount : 0;
    const receivePrice = receiveInfo.amount ? receiveInfo.fiatUSD / receiveInfo.amount : 0;

    modalBody.innerHTML = `
      <div class="flow-card swap-flow">
        <section class="swap-panel">
          <p class="flow-label">You Pay</p>
          <div class="swap-token">
            <span class="swap-token__chip">${paySym}</span>
            <span class="swap-balance">${payInfo.amount.toLocaleString()} ${paySym}</span>
          </div>
          <div class="flow-amount-display">
            <input class="flow-amount-input" type="text" inputmode="decimal" pattern="[0-9.]*" data-flow-input="pay" value="0" />
            <span class="flow-asset">${paySym}</span>
          </div>
          <p class="flow-fiat" data-flow-fiat>~$0.00</p>
        </section>

        <button class="swap-toggle" data-flow-swap aria-label="Switch tokens">&#8645;</button>

        <section class="swap-panel">
          <p class="flow-label">You Receive</p>
          <div class="swap-token">
            <span class="swap-token__chip alt">${receiveSym}</span>
            <span class="swap-balance" data-flow-receive-balance>${receiveInfo.amount ? receiveInfo.amount.toLocaleString() : "0"} ${receiveSym}</span>
          </div>
          <div class="flow-amount-display">
            <input class="flow-amount-input" type="text" inputmode="decimal" pattern="[0-9.]*" data-flow-input="receive" value="0" readonly />
            <span class="flow-asset">${receiveSym}</span>
          </div>
        </section>

        <div class="flow-shortcuts">
          <button data-flow-percent="0.25">25%</button>
          <button data-flow-percent="0.5">50%</button>
          <button data-flow-percent="1">Max</button>
        </div>

        <button class="flow-primary" onclick="simulateTx()">Swap Now</button>
      </div>
    `;
    modalBtns.innerHTML = "";

    initializeFlowControls({
      container: modalBody,
      price: payPrice,
      balance: payInfo.amount,
      receivePrice,
      receiveInput: true,
      onSwap: () => renderSwap({ paySym: receiveSym, receiveSym: paySym })
    });
  };

  renderSwap({ paySym: payToken, receiveSym: receiveToken });
}

function initializeFlowControls({ container, price, balance, receivePrice, receiveInput, onSwap }) {
  const closeBtn = container.querySelector("[data-flow-close]");
  closeBtn?.addEventListener("click", hideModal);
  const nextBtn = container.querySelector("[data-flow-next]");
  nextBtn?.addEventListener("click", () => playSound(clickSound));
  const swapBtn = container.querySelector("[data-flow-swap]");
  swapBtn?.addEventListener("click", () => {
    playSound(clickSound);
    onSwap?.();
  });

  const amountInput =
    container.querySelector('[data-flow-input="amount"]') || container.querySelector('[data-flow-input="pay"]');
  const receiveInputField = receiveInput ? container.querySelector('[data-flow-input="receive"]') : null;
  const fiatDisplay = container.querySelector("[data-flow-fiat]");

  const updateFiat = () => {
    if (!fiatDisplay || !amountInput) return;
    const value = sanitizeNumber(amountInput.value);
    const estimated = value * (price || 0);
    fiatDisplay.textContent = `~${formatCurrency(estimated)}`;
  };

  const updateReceive = () => {
    if (!receiveInputField || !amountInput) return;
    const value = sanitizeNumber(amountInput.value);
    const receiveValue = receivePrice ? (value * (price || 0)) / receivePrice : 0;
    receiveInputField.value = receiveValue ? receiveValue.toFixed(4).replace(/\.?0+$/, "") : "0";
  };

  const normalizeInput = () => {
    if (!amountInput) return;
    let input = amountInput.value.replace(/[^\d.]/g, "");
    if (input.startsWith(".")) {
      input = `0${input}`;
    }
    const parts = input.split(".");
    if (parts.length > 2) {
      input = `${parts.shift()}.${parts.join("")}`;
    }
    if (input === "") input = "0";
    if (input.length > 18) {
      input = input.slice(0, 18);
    }
    amountInput.value = input.replace(/^0+(?!\.)/, "") || "0";
    updateFiat();
    updateReceive();
  };

  amountInput?.addEventListener("input", normalizeInput);
  amountInput?.addEventListener("blur", () => {
    if (!amountInput) return;
    if (amountInput.value === "" || amountInput.value === ".") {
      amountInput.value = "0";
      updateFiat();
      updateReceive();
    }
  });

  const maxBtn = container.querySelector("[data-flow-max]");
  maxBtn?.addEventListener("click", () => {
    if (!amountInput) return;
    playSound(clickSound);
    const maxValue = balance || 0;
    amountInput.value = maxValue ? maxValue.toString() : "0";
    normalizeInput();
  });

  container.querySelectorAll("[data-flow-percent]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!amountInput) return;
      const ratio = Number(btn.dataset.flowPercent);
      if (!Number.isFinite(ratio)) return;
      playSound(clickSound);
      const value = (balance || 0) * ratio;
      amountInput.value = value ? value.toFixed(4).replace(/\.?0+$/, "") : "0";
      normalizeInput();
    });
  });

  updateFiat();
  updateReceive();
}

function simulateTx() {
  playSound(clickSound);
  modalBody.innerHTML = `<p>Preparing secure ${modalTitle.textContent.replace(" Token", "")} transfer...</p>`;
  modalBtns.innerHTML = "";
  showLoading();
  setTimeout(() => {
    hideLoading();
    playSound(successSound);
    modalBody.innerHTML = `<h3 style="color:cyan;">Transaction Successful ✅</h3>`;
    setTimeout(() => {
      hideModal();
    }, 2000);
  }, 2500);
}
