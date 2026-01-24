const api = typeof browser !== "undefined" ? browser : chrome;

api.runtime.onInstalled.addListener(() => {
  const defaults = {
    hideYo: true,
    hideNothing: false,
    hideShuffle: true
  };

  api.storage.local.get(Object.keys(defaults), (result) => {
    const missingKeys = Object.keys(defaults).filter(key => !(key in result));
    
    if (missingKeys.length > 0) {
      const toSet = {};
      missingKeys.forEach(key => toSet[key] = defaults[key]);
      
      api.storage.local.set(toSet, () => {
        console.log("Missing default settings have been applied.");
      });
    }
  });
});