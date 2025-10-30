const app = document.querySelector(".app");
const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");
const loadingOverlay = document.getElementById("loading-overlay");
const settingsBtn = document.getElementById("settings-btn");
const settingsTemplate = document.getElementById("settings-template");
const profileBtn = document.getElementById("profile-btn");
const profileMenu = document.getElementById("profile-menu");
const closeProfileBtn = document.getElementById("close-profile");

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
    }, 900);
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
  modalBody.innerHTML = `<p>Preparing secure ${modalTitle.textContent.replace(" Token", "")} transfer...</p>`;
  modalBtns.innerHTML = "";
  showLoading();
  setTimeout(() => {
    hideLoading();
    playSound(successSound);
    modalBody.innerHTML = `<h3 style="color:cyan;">Transaction Successful ✅</h3>`;
  }, 2500);
}
