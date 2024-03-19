  // Create context menu items for highlighting, summarizing, and bookmarking
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "highlight",
      title: "Highlight",
      contexts: ["selection"]
    });
    
  });
  
  // Handle context menu item clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "highlight") {
        chrome.tabs.query({active:true,currentWindow:true}, function (tabs){
            let highlightedText = info.selectionText
            let pageURL = tabs[0].url;
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    
                    message: { highlightedText: highlightedText, url: pageURL } });
        })
    }
  });

  //Listen for the openPopup call from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request)
    {
        console.log(request);
    }
  });
  
  