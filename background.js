chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ userLang: 'en', recipientLang: 'es' }, () => {
        console.log('Default languages set to English (user) and Spanish (recipient).');
    });
});