var regex = /^https?:\/\/(?:[^./?#]+\.)?yuanshen\.site/;

function sendCommand(command) {
  return function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      if (!regex.test(activeTab.url)) {
        return;
      }
      chrome.tabs.sendMessage(activeTab.id, { text: command }, function (message) {
        
      });
    });
  };
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("exportData").addEventListener("click", sendCommand("exportData"));
  document.getElementById("importData").addEventListener("click", sendCommand("importData"));
  document.getElementById("clearData").addEventListener("click", sendCommand("clearData"));
});