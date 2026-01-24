const yoCheck = document.getElementById('hideYo');
const nothingCheck = document.getElementById('hideNothing');
const shuffleCheck = document.getElementById('hideShuffle');

chrome.storage.local.get(['hideYo', 'hideNothing', 'hideShuffle'], (res) => {
  yoCheck.checked = res.hideYo;
  nothingCheck.checked = res.hideNothing;
  shuffleCheck.checked = res.hideShuffle;
});

yoCheck.addEventListener('change', () => {
  chrome.storage.local.set({ hideYo: yoCheck.checked });
});

nothingCheck.addEventListener('change', () => {
  chrome.storage.local.set({ hideNothing: nothingCheck.checked });
});

shuffleCheck.addEventListener('change', () => {
  chrome.storage.local.set({ hideShuffle: shuffleCheck.checked });
});