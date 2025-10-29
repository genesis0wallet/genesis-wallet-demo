// Screen transitions
window.addEventListener("DOMContentLoaded", () => {
  const scan = document.getElementById("scan-screen");
  const dash = document.getElementById("dashboard");
  const aiPanel = document.getElementById("ai-panel");
  const aiBtn = document.getElementById("aiBtn");
  const backBtn = document.getElementById("backBtn");

  // Simulate scanning
  setTimeout(() => {
    scan.classList.remove("active");
    dash.classList.add("active");
  }, 3500);

  // Open AI panel
  aiBtn.addEventListener("click", () => {
    dash.classList.remove("active");
    aiPanel.classList.add("active");
  });

  // Back to dashboard
  backBtn.addEventListener("click", () => {
    aiPanel.classList.remove("active");
    dash.classList.add("active");
  });
});
