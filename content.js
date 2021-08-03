function saveFile(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const a = document.createElement("a");
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
    }
}

function importData(sendResponse) {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
        var file = e.target.files[0];

        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = readerEvent => {
            var content = readerEvent.target.result;
            var importData = JSON.parse(content);
            for (var i = 0; i < importData.Data_KYJG.length; i++) {
                localStorage.setItem(importData.Data_KYJG[i], 1);
            }
            document.location.reload();
        }
    }

    input.click();
}

function exportData(sendResponse) {
    var exportData = [];
    for (var i = 0; i < localStorage.length; i++) {
        var keyItem = localStorage.key(i);
        var val = localStorage.getItem(keyItem);
        if (val == 1) exportData.push(keyItem);
    }
    saveFile(new Blob([JSON.stringify({ Data_KYJG: exportData, date: Date.now() })], { type: "application/octet-stream" }), "exportData-" + new Date().toISOString().substring(0, 10) + ".json");
}

function clearData(sendResponse) {
    localStorage.clear();
    document.location.reload();
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === "exportData") {
        exportData();
    } else if (msg.text === "importData") {
        importData();
    } else if (msg.text === "clearData") {
        clearData();
    }
    sendResponse("done");
});