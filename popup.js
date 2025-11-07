document.getElementById("start").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const interval = parseInt(document.getElementById("interval").value, 10);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: startClicker,
    args: [interval]
  });
});

document.getElementById("stop").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: stopClicker
  });
});

function startClicker(interval) {
  stopClicker(); // clear old one if exists
  window.autoClickerInterval = setInterval(() => {
    const el = document.querySelector(":hover");
    if (el) {
      el.click();
      console.log("Clicked element:", el);
    }
  }, interval);
  console.log("Auto clicker started with interval:", interval);
}

function stopClicker() {
  if (window.autoClickerInterval) {
    clearInterval(window.autoClickerInterval);
    window.autoClickerInterval = null;
    console.log("Auto clicker stopped.");
  }
}
