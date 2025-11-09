document.addEventListener("DOMContentLoaded", () => {
  const langEl = document.getElementById("lang");
  const convertTimeEl = document.getElementById("convertTime");
  const usePersianDigitsEl = document.getElementById("usePersianDigits");
  const status = document.getElementById("status");

  chrome.storage.sync.get(
    {
      language: "da-AF",
      convertTimeElements: true,
      usePersianDigits: true,
    },
    (prefs) => {
      langEl.value = prefs.language || "da-AF";
      convertTimeEl.checked = prefs.convertTimeElements !== false;
      usePersianDigitsEl.checked = prefs.usePersianDigits !== false;
    }
  );

  document.getElementById("save").addEventListener("click", () => {
    const language = langEl.value;
    const convertTimeElements = convertTimeEl.checked;
    const usePersianDigits = usePersianDigitsEl.checked;
    chrome.storage.sync.set(
      { language, convertTimeElements, usePersianDigits },
      () => {
        status.textContent = "Saved ✓";
        setTimeout(() => (status.textContent = ""), 1500);
      }
    );
  });
});
