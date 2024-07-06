# Twitter Ads Budget Incrementer

This Chrome extension automatically increments the budget for Twitter ad campaigns when specific conditions are met, ensuring continuous ad delivery without manual intervention. It's designed for marketers who need to maintain active campaigns without exceeding budget limits.

## Features

- **Automatic Budget Increment**: Increases the budget for campaigns that have exhausted their funds.
- **Customizable Settings**: Users can set a maximum budget per campaign, a maximum daily spend, and toggle a dry run mode.
- **Monitoring Status**: Easily toggle monitoring on and off directly from the extension popup.

## How It Works

1. **Monitoring**: The extension monitors the Twitter Ads page for campaigns marked as "Exhausted".
2. **Increment Logic**: When an exhausted campaign is detected, the extension calculates the new budget based on user-defined settings and increments it if within limits.
3. **Configuration**: Users can configure the maximum budget per campaign, daily spend limits, and enable a dry run mode for testing.

## Setup

1. Clone the repository to your local machine.
2. Load the extension into Chrome using the "Load unpacked" feature in the Extensions menu (ensure Developer Mode is enabled).
3. Open the extension popup and configure the maximum budget, daily spend, and dry run settings as needed.
4. Click "Start Monitoring" to activate the extension.

## Usage

- **Start/Stop Monitoring**: Click the "Start Monitoring" or "Stop Monitoring" button in the extension popup to toggle the monitoring status.
- **Configure Settings**: Set your desired maximum budget per campaign, daily spend, and dry run mode in the popup and click "Save Configuration".

## Notes

- The extension requires permissions to access `chrome.storage` for saving configurations and `document.evaluate` for DOM manipulation.
- Ensure the Twitter Ads page structure has not changed significantly, as this could affect the extension's functionality.

## Authors

- **[Abdel-Moneim Ibrahim](https://www.linkedin.com/in/abdel-moniem-ibrahim/)**: (Add your name and contributions here)

## Sponsor

- **[jjeremycai](https://twitter.com/jjeremycai)**: Sponsored the development of this extension.

Feel free to contribute to the project by submitting pull requests or reporting issues. Your feedback is highly appreciated!