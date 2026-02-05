let hiddenCount = 0;
let settings = { hideYo: true, hideNothing: true, hideShuffle: true };

const api = typeof browser !== "undefined" ? browser : chrome;

const updateSettings = () => {
  api.storage.local.get(['hideYo', 'hideNothing', 'hideShuffle'], (res) => {
    if (res.hideYo !== undefined) settings.hideYo = res.hideYo;
    if (res.hideNothing !== undefined) settings.hideNothing = res.hideNothing;
    if (res.hideShuffle !== undefined) settings.hideShuffle = res.hideShuffle;
  });
};

const hideMessages = () => {
  // 7TV Extension Chat Messages
  const messages = document.querySelectorAll('.seventv-message:not([data-yo-checked])');

  messages.forEach((msg) => {
    msg.dataset.yoChecked = 'true';

    const messageBody = msg.querySelector('.seventv-chat-message-body');
    if (!messageBody) return;

    const content = messageBody.textContent.replace(/\u034F/g, '').trim().toLowerCase();
    const nothingEmote = messageBody.querySelector('img[alt="nothing"]');
    const yoEmote = messageBody.querySelector('img[alt="YO" i]');

    let shouldHide = false;
    if (settings.hideYo && (content === 'yo' || yoEmote)) shouldHide = true;
    if (settings.hideNothing && (content === 'nothing' || nothingEmote)) shouldHide = true;
    if (settings.hideShuffle && content === 'shuffle') shouldHide = true;

    if (shouldHide) {
      hiddenCount++;
      msg.style.display = 'none';
      msg.dataset.yoHidden = 'true';
    }
  });

  // Native Twitch Chat Messages
  const messages2 = document.querySelectorAll('.chat-line__message:not([data-yo-checked])');

  messages2.forEach((msg) => {
    msg.dataset.yoChecked = 'true';

    const messageBody = msg.querySelector('span[data-a-target="chat-message-text"]');
    if (!messageBody) return;

    const content = messageBody.textContent.trim().toLowerCase();

    let shouldHide = false;
    if (settings.hideYo && content === 'yo') shouldHide = true;
    if (settings.hideNothing && content === 'nothing') shouldHide = true;
    if (settings.hideShuffle && content === 'shuffle') shouldHide = true;
    if (shouldHide) {
      hiddenCount++;
      msg.style.display = 'none';
      msg.dataset.yoHidden = 'true';
    }
  });
};

api.storage.onChanged.addListener(() => updateSettings());
updateSettings();

const observer = new MutationObserver(() => hideMessages());
observer.observe(document.body, { childList: true, subtree: true });