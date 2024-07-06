// formPage.js

// Function to click the "Save" button
function clickSaveButton() {
    const buttons = document.querySelectorAll('button.Button');
    buttons.forEach(button => {
        const span = button.querySelector('span.Button-label');
        if (span && span.innerText === 'Save') {
            button.click();
        }
    });
}

// Create a MutationObserver to wait for the form to load
const formObserver = new MutationObserver((mutations, observer) => {
    clickSaveButton();
    observer.disconnect(); // Stop observing after the button is clicked
});

// Start observing the body for changes
formObserver.observe(document.body, { childList: true, subtree: true });

// Initial check in case the "Save" button is already present
clickSaveButton();
