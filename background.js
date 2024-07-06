// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "incrementBids") {
        console.log("hello")
    } else if (request.action === "watchForFormPage") {
        console.log("watchForFormPage message received");
    }
});

function incrementBids() {
    // Logic to find the ad group and increment bids by $0.01
    // This will depend on the structure of your ad dashboard
    console.log("Incrementing bids by $0.01");
}

// background.js
