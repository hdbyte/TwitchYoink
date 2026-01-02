let hiddenCount = 0;
let settings = { hideYo: true, hideNothing: true };

const api = typeof browser !== "undefined" ? browser : chrome;

const updateSettings = () => {
  api.storage.local.get(['hideYo', 'hideNothing'], (res) => {
    if (res.hideYo !== undefined) settings.hideYo = res.hideYo;
    if (res.hideNothing !== undefined) settings.hideNothing = res.hideNothing;
  });
};

const hideMessages = () => {
  // Twitch/7TV chat messages
  const containers = document.querySelectorAll('.seventv-chat-message-container');

  containers.forEach((container) => {
    if (container.style.display === 'none' || container.dataset.yoHidden === 'true') return;

    const messageBody = container.querySelector('.seventv-chat-message-body');
    if (messageBody) {
      const textToken = messageBody.querySelector('.text-token');
      const content = (textToken || messageBody).textContent.trim().toLowerCase();
      
      let shouldHide = false;

      // Logic for 'yo'
      if (settings.hideYo && content === 'yo') {
        shouldHide = true;
      }

      // Logic for 'nothing' text or the 7TV emote for 'nothing'
      const nothingEmote = messageBody.querySelector('img[alt="nothing"]');
      if (settings.hideNothing) {
        if (content === 'nothing' || nothingEmote) {
          shouldHide = true;
        }
      }

      if (shouldHide) {
        container.style.display = 'none';
        container.dataset.yoHidden = 'true';
        hiddenCount++;
      }
    }
  });
};

api.storage.onChanged.addListener(() => updateSettings());
updateSettings();

const observer = new MutationObserver(() => hideMessages());
observer.observe(document.body, { childList: true, subtree: true });