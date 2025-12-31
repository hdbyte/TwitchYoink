const yoCheck = document.getElementById('hideYo');
const nothingCheck = document.getElementById('hideNothing');

chrome.storage.local.get(['hideYo', 'hideNothing'], (res) => {
  yoCheck.checked = res.hideYo;
  nothingCheck.checked = res.hideNothing;
});

yoCheck.addEventListener('change', () => {
  chrome.storage.local.set({ hideYo: yoCheck.checked });
});

nothingCheck.addEventListener('change', () => {
  chrome.storage.local.set({ hideNothing: nothingCheck.checked });
});