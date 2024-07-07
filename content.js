// Function to get an element by its XPath
function getElementByXPath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Function to check for the word "Exhausted" and get the corresponding row
function checkForExhausted() {

    const rows = document.querySelectorAll('tr'); // Adjust the selector as needed for your table rows
    rows.forEach(row => {
        if (row.innerText.includes("Exhausted")) {
            const secondTD = row.querySelectorAll('td')[1]; // Adjust the selector as needed for your table
            if (secondTD) {
                secondTD.querySelectorAll('div')[1].querySelectorAll('a')[0].click();
                chrome.runtime.sendMessage({ action: "watchForFormPage" });
            }
            chrome.runtime.sendMessage({ action: "incrementBids", rowIndex: Array.from(rows).indexOf(row) });
        }
    });
}

// Function to remove the compaign ID after saving
function removeCampaignId() {
    const close = getElementByXPath("/html/body/div[2]/div/div[1]/div/div[1]/div/div[2]/div[1]/span[2]/button/span");
    if(close) {
        close.click();
    }
}

// Function to check for the form and update the budget
function checkForForm(maxBudget, maxDailySpend, dailySpend, dryRun) {
    const check = {
        Save: document.body.innerText.includes("Save"),
        Next: document.body.innerText.includes("Next"),
        Exit: document.body.innerText.includes("Exit")
    };

    if (check.Save && check.Next && check.Exit) {
        let element = getElementByXPath("/html/body/div[2]/div/main/div/div/div/div/section/div/div[2]/div/div[5]/fieldset/div/div/div[2]/input");
        
        // Get saved configuration settings
            let newValue = JSON.stringify(parseFloat(element.value) + 0.01);
            console.log(element.value, newValue);

            // Check if the new daily spend exceeds the max daily spend
            if (dailySpend + 0.01 > maxDailySpend) {
                console.log("Max daily spend exceeded. Cannot increment further.");
                return;
            }

            if (newValue <= maxBudget) {
                element.dispatchEvent(new Event('input', { bubbles: true })); // Trigger any attached event listeners

                // Update daily spend
                chrome.storage.sync.set({ dailySpend: dailySpend + 0.01 });
                chrome.storage.sync.get(null, function(data) {console.log(data)});
                getElementByXPath("/html/body/div[2]/div/main/div/div/div/div/section/div/div[2]/div/div[5]/fieldset/div/div/div[2]/input").value = newValue;

                // Click the "Save" button
                const buttons = document.querySelectorAll('button.Button');
                buttons.forEach(button => {
                    const span = button.querySelector('span.Button-label');
                    if (span && span.innerText === 'Save') {
                        button.click();
                    }
                });
            }
    }
}

// Initialize daily spend tracker
chrome.storage.sync.get(null, function(data) {
    if(data.monitoringStatus === 'Active') {
        const { maxBudget, maxDailySpend, dailySpend, dryRun } = data;
        const today = new Date().toISOString().slice(0, 10);
        if (data.lastUpdated !== today) {
            chrome.storage.sync.set({ dailySpend: 0, lastUpdated: today });
        }

        // Create a MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    checkForExhausted();
                    checkForForm(maxBudget, maxDailySpend, dailySpend, dryRun);
                    removeCampaignId();
                }
            });
        });

        // Start observing the body for changes
        observer.observe(document.body, { childList: true, subtree: true });
        setInterval(() => {
            checkForExhausted()
        }, 2000);

        // Initial check in case the word "Exhausted" is already present
        checkForExhausted();
        checkForForm(maxBudget, maxDailySpend, dailySpend, dryRun);
        removeCampaignId();

    } else {
        chrome.storage.sync.set({ dailySpend: 0 });
    }
});