// Load saved settings
function loadSettings() {
  chrome.storage.local.get(['language', 'usePersianDigits'], result => {
    document.getElementById('language').value = result.language || 'dari';
    document.getElementById('usePersianDigits').checked = result.usePersianDigits !== false;
  });
}

// Save settings
function saveSettings() {
  const language = document.getElementById('language').value;
  const usePersianDigits = document.getElementById('usePersianDigits').checked;
  
  chrome.storage.local.set({ language, usePersianDigits }, () => {
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
