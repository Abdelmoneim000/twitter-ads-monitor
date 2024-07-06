chrome.storage.sync.get(null, function(data) {
    if(data) {
        const { maxBudget, maxDailySpend, dailySpend, dryRun, monitoringStatus } = data;
        document.getElementById('maxBudget').value = maxBudget;
        document.getElementById('maxDailySpend').value = maxDailySpend;
        document.getElementById('maxDailySpend').value = maxDailySpend;
        document.getElementById('dryRun').checked = dryRun;
        document.getElementById('status').innerText = monitoringStatus;
        document.getElementById('toggleButton').innerText = monitoringStatus === 'Active' ? 'Deactivate' : 'Activate';
    }
});

document.getElementById('saveConfig').addEventListener('click', () => {
    const maxBudget = document.getElementById('maxBudget').value;
    const maxDailySpend = document.getElementById('maxDailySpend').value;
    const dryRun = document.getElementById('dryRun').checked;

    chrome.storage.sync.set({
      maxBudget: parseFloat(maxBudget),
      maxDailySpend: parseFloat(maxDailySpend),
      dryRun: dryRun
    }, () => {
      alert('Configuration saved!');
    });
  });

  document.getElementById('toggleButton').addEventListener('click', () => {
    const statusElement = document.getElementById('status');
    const currentStatus = statusElement.innerText;

    const newStatus = currentStatus === 'Inactive' ? 'Active' : 'Inactive';
    statusElement.innerText = newStatus;

    chrome.storage.sync.set({ monitoringStatus: newStatus });
});