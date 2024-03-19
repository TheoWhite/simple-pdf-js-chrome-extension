// content.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Check if the message contains the highlighted text
    if (request.message) {
      // Get the selected text
      sendBackgroundMessage(request.message);
      sendBackgroundMessage(request.message.url);
      //renderAndHighlightPdf(request.message.highlightedText,request.message.pdfUR);
      getNumberofPages(request.message.url);
    }
  });
  

  //Send a message from content to background
  function sendBackgroundMessage(backgroundmsg)
  {
    chrome.runtime.sendMessage({message: backgroundmsg}, function (response) {
        console.log(response);
    });
  }

  // Function to extract PDF URL from the current URL
  function extractPdfUrl(url) {
    // Implement your logic to extract the PDF URL from the current URL
    // This is a placeholder example, you need to adjust it according to your actual URL structure
    if (url.includes(".pdf")) {
      return url;
    } else {
      return null; // Return null if PDF URL is not found
    }
  }

  function getNumberofPages(pdfUrl)
  {
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
        sendBackgroundMessage("No. of pages: " + pdf.numPages);
    }).catch(function(error) {
        sendBackgroundMessage("Error loading :" + error);
    });

  }

  function renderAndHighlightPdf(pdfUrl, selectedText) {
    sendBackgroundMessage("trying to render....");
    // Use PDF.js to fetch and render the PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
      // Loop through each page of the PDF
      for (let i = 1; i <= pdf.numPages; i++) {
        // Get the text content of the page
        pdf.getPage(i).then(function(page) {
          page.getTextContent().then(function(textContent) {
            // Loop through each text item on the page
            textContent.items.forEach(function(textItem) {
              // Check if the text item contains the selected text
              if (textItem.str.includes(selectedText)) {
                // Highlight the text item
                // You'll need to implement your highlighting logic here
                sendBackgroundMessage("Highlight here with" + selectedText + " on page: " + pdf.getPage(i));
              }
            });
          });
        });
      }
    }).catch(function(error) {
        sendBackgroundMessage("Error loading :" + error);
    });
  }
  