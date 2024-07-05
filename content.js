// content.js

// Function to play sound
function playSound() {
    let audio = new Audio(chrome.runtime.getURL('alert.mp3'));
    audio.play();
}

// Function to check for the word "Exhausted"
function checkForExhausted() {
    if (document.body.innerText.includes("Products")) {
        playSound();
        console.log("Exhausted");
        chrome.runtime.sendMessage({ action: "incrementBids" });
    }
}

setInterval(checkForExhausted, 2000);

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            checkForExhausted();
        }
    });
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Initial check in case the word "Exhausted" is already present
checkForExhausted();
