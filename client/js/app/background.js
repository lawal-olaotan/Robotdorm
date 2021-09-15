console.log('background script running');

let dev = true;
let domain = dev ? "http://localhost:8000/" : 'https://yapaextension.com/'



chrome.runtime.onMessage.addListener(

  function(message,sender,sendResponse){
    // switch statement used to find cases based on the user current state
    switch (message.type){
      case "login":
          console.log('login logic ran with FormData ', message.data)
          let userInfo = message.data; 
          userInfo.username = message.data.email.split('@')[0];
          allAjax('POST',userInfo,'user/login','', function(response){
            sendResponse(response);
            setStorageItem('user',response)
            console.log('response from the server', response);
           
          })
          return true;
          break; 
      case "signup": 
          console.log('signup logic ran with formData',message.data)
          let userCreds = message.data;
          userCreds.username = message.data.email.split('@')[0];
          allAjax('POST',userCreds,'user/signup','',function(response){
            sendResponse(response)
            console.log('response from the server',response)
          })
          return true;
          break;
      case"products":
          console.log('purchaseYears event was hit in background',message.data);
          let orderDetails = []
          for(let i=0; i < message.data.product.length; i++){
            let value = message.data.product[i]
            if(value.includes(' ')){
              orderDetails.unshift(value.split(' ')[1]);
            }
          }
          let uniqueDetails =[... new Set(orderDetails)];
          console.log(uniqueDetails);
          setStorageItem(message.type,uniqueDetails);
  

          let autoData = message.data
          autoData.product = uniqueDetails;

          allAjax('POST',autoData,'product/orderhistory','',function(response){
            sendResponse(response)
            console.log('response from the server',response)
          });

          sendResponse('all good');
          return true;
          break;
      default:
          console.log('no match found')
    }
});



function allAjax(type,data,path,token,callback){
  $.ajax({
    url:domain+path,
    type:type,
    data:data,
    headers:{
      token:token
    },
    success: function(response){
      callback(response)
    },
    error: function(response){
      callback(response);
    }

  });
}

function setStorageItem(varName,data){
  if(varName!= 'searchPageData'){
    window.localStorage.setItem(varName,JSON.stringify(data))
  }

}

function getStorageItem(varName){
  return JSON.parse(localstorage.getItem(varName))
}
