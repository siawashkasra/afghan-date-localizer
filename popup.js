// Load saved settings
function loadSettings() {
  chrome.storage.local.get(['language'], result => {
    document.getElementById('language').value = result.language || 'dari';
  });
}

// Save settings
function saveSettings() {
  const language = document.getElementById('language').value;
  
  chrome.storage.local.set({ language }, () => {
    const status = document.getElementById('status');
    status.style.display = 'block';
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  document.getElementById('save').addEventListener('click', saveSettings);
});
