chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === 'activate extension') 
         sendResponse('OK')
  }
) 
  

