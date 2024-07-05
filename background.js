// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "incrementBids") {
        incrementBids();
    }
});

function incrementBids() {
    // Logic to find the ad group and increment bids by $0.01
    // This will depend on the structure of your ad dashboard
    console.log("Incrementing bids by $0.01");
}
