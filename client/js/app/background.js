console.log('background script running');



chrome.runtime.onMessage.addListener(

  function(message,sender,sendResponse){

    // switch statement used to find cases based on the user current state
    switch (message.type){

      case "login":
          console.log('login logic ran with FormData ', message.data)
          return true;
          break;
          
      case "signup": 
          console.log('signup logic ran with formData',message.data)
          return true;
          break;

      default:
          console.log('no match found')
    }
});
