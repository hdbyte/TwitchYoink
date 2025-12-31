chrome.runtime.onInstalled.addListener(() => {
  const defaults = {
    hideYo: true,
    hideNothing: false
  };

  chrome.storage.local.get(Object.keys(defaults), (result) => {
    // Check if keys are missing
    if (Object.keys(result).length < Object.keys(defaults).length) {
      chrome.storage.local.set(defaults, () => {
        console.log("Default settings have been applied.");
      });
    }
  });
});