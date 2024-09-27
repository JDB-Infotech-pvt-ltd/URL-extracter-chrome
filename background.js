chrome.action.onClicked.addListener(async (tab) => {
  console.log('Extension icon clicked');
  try {
    // Inject the content script programmatically
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js'],
    });
    
    // Send message to content script
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'fetchUrl' });
    console.log('URL fetched:', response ? response.url : 'No response');
    
    if (response && response.url) {
      const res = await fetch('http://localhost:3000/fetchcertificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: response.url }),
      });
      const data = await res.json();
      console.log('Certificate data saved:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
