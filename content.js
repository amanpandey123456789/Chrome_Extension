const translateText = async (text, targetLang) => {
    const apiKey = 'AIzaSyBkD1ia1Mkzx0PfoLwZl8pxLUmNxkL5P7o';
    const url = 'https://translation.googleapis.com/language/translate/v2?key=${apiKey}';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, target: targetLang })
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
};

// Translate incoming message
const translateIncomingMessages = (targetLang) => {
    document.querySelectorAll('.copyable-text').forEach(async (msgElem) => {
        if (!msgElem.dataset.translated) {
            const originalText = msgElem.innerText;
            const translatedText = await translateText(originalText, targetLang);
            msgElem.innerText = translatedText;
            msgElem.dataset.translated = "true";
        }
    });
};

// Monitor for new messages
const observer = new MutationObserver(() => {
    chrome.storage.sync.get(['userLang'], (result) => {
        translateIncomingMessages(result.userLang);
    });
});

observer.observe(document.body, { childList: true, subtree: true });

// Intercept outgoing messages
document.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const inputField = document.querySelector('[contenteditable="true"]');
        const originalMessage = inputField.innerText;

        chrome.storage.sync.get(['recipientLang'], async (result) => {
            const translatedMessage = await translateText(originalMessage, result.recipientLang);
            inputField.innerText = translatedMessage;
        });
    }
});