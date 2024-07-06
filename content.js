// content.js

// Function to play sound
function playSound() {
    let audio = new Audio(chrome.runtime.getURL('alert.mp3'));
    audio.play();
}

// Function to check for the word "Exhausted" and get the corresponding row
function checkForExhausted() {
    const rows = document.querySelectorAll('tr'); // Adjust the selector as needed for your table rows
    rows.forEach(row => {
        if (row.innerText.includes("Exhausted")) {

            secondTD = row.querySelectorAll('td')[1]; // Adjust the selector as needed for your
            if(secondTD) {
                secondTD.querySelectorAll('div')[1].querySelectorAll('a')[0].click();
                console.log(secondTD);

                chrome.runtime.sendMessage({ action: "watchForFormPage" });
            }
            chrome.runtime.sendMessage({ action: "incrementBids", rowIndex: Array.from(rows).indexOf(row) });
        }
    });
}

// Function to get an element by its XPath
function getElementByXPath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function checkForForm() {
    const check = {
        Save: document.body.innerText.includes("Save"),
        Next: document.body.innerText.includes("Next"),
        Exit: document.body.innerText.includes("Exit")
    }

    if (check.Save && check.Next && check.Exit) {
        console.log(document.body.innerText.match(/Save/g || /Next/g || /Exit/g));
        let element = getElementByXPath("/html/body/div[2]/div/main/div/div/div/div/section/div/div[2]/div/div[5]/fieldset/div/div/div[2]/input");
        let newValue = parseFloat(element.value) + 0.01;
        element.value = newValue.toFixed(2); // Ensure the value has two decimal places
        console.log(element.value);
    }    
    else {
        console.log("watchForFormPage message not sent");
    }
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            checkForExhausted();
            checkForForm();
        }
    });
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Initial check in case the word "Exhausted" is already present
checkForExhausted();
checkForForm();
