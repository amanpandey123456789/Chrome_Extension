document.getElementById('saveSettings').addEventListener('click', () => {
    const userLang = document.getElementById('userLang').value;
    const recipientLang = document.getElementById('recipientLang').value;

    chrome.storage.sync.set({
        userLang: userLang,
        recipientLang: recipientLang
    }, () => {
        alert('Language preferences saved!');
    });
});