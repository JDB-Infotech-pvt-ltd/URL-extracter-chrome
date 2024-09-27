chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchUrl') {
      sendResponse({ url: window.location.href });
    }
  });