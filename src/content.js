let hiddenCount = 0;
let settings = { hideYo: true, hideNothing: true };

// Sync settings from storage
const updateSettings = () => {
  chrome.storage.local.get(['hideYo', 'hideNothing'], (res) => {
    settings.hideYo = res.hideYo !== false;
    settings.hideNothing = !!res.hideNothing;
  });
};

const hideMessages = () => {
  const containers = document.querySelectorAll('.seventv-chat-message-container');

  containers.forEach((container) => {
    // Skip if already hidden or tagged
    if (container.style.display === 'none' || container.dataset.yoHidden === 'true') return;

    const messageBody = container.querySelector('.seventv-user-message');
    if (messageBody) {
      const textToken = messageBody.querySelector('.text-token');
      // Get the text inside .text-token or the body itself
      const content = (textToken || messageBody).textContent.trim().toLowerCase();
      
      let shouldHide = false;

      // Check for 'yo'
      if (settings.hideYo && content === 'yo') {
        shouldHide = true;
      }

      // Check for literal 'nothing'
      if (settings.hideNothing && content === 'nothing') {
        shouldHide = true;
      }

      if (shouldHide) {
        container.style.display = 'none';
        container.dataset.yoHidden = 'true';
        hiddenCount++;
        console.log(`Hidden "${content}". Total hidden: ${hiddenCount}`);
      }
    }
  });
};

chrome.storage.onChanged.addListener(updateSettings);
updateSettings();

const observer = new MutationObserver(() => hideMessages());
observer.observe(document.body, { childList: true, subtree: true });