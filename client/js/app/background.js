console.log('background script running');

let dev = true;
let domain = dev ? "http://localhost:8000/" : 'https://yapaextension.com/'



chrome.runtime.onMessage.addListener(

  function(message,sender,sendResponse){
    // switch statement used to find cases based on the user current state
    switch (message.type){

      case "onPopupInit":
        console.log('onPopupInit login ran')
        sendResponse(getStorageItem('user'));
        return true;
        break;
      case "login":
          console.log('login logic ran with FormData ', message.data)
          let userInfo = message.data; 
          userInfo.username = message.data.email.split('@')[0];
          allAjax('POST',userInfo,'user/login','', function(response){
            sendResponse(response);
            setStorageItem('user',response)
            console.log('response from the server', response);
           
          }); 

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
      case "initiateHistory":
          console.log('message:',message);
          chrome.tabs.create({url:'https://www.jumia.com.ng/customer/order/index/'});
          return true; 
        break;
      case "visitJumia":
          console.log('message:',message);
          chrome.tabs.create({url:'https://www.jumia.com.ng'});
          sendResponse('website redirected');
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
          autoData._id = getStorageItem('user').user._id;
          
          allAjax('POST',autoData,'product/orderhistory',token,
            function(response){
            console.log('response from the server',response)
          });
          sendResponse('all good');
          return true;
          break;
        case"searchData":
        console.log('search data event hit in background', message.data);
        const storedData = getStorageItem('searchData');
        if (message.data.keyWord === storedData.keyWord){
            console.log('file exist');
        }else{
          message.data._id = getStorageItem('user').user._id;
          setStorageItem(message.type,message.data);
          sendResponse('data succesffully recieved in background');
        }
        
        return true; 
        break;
        case"keywordSearch": 
        console.log('keyword event event hit background');
        const data = getStorageItem('searchData');
        allAjax('POST',data,'product/searchScrapper','',
            function(response){
              if(response.status === 500){
                sendResponse('no data')
              }else{
                sendResponse('recieved')
                console.log('response from the server',response)
              }
          });
        return true; 
        break;
        case"FetchData": 
        console.log('fetch event event hit background');
        let queryData = getStorageItem('searchData').keyWord;
    
        allAjax('GET','',`product/getProducts/${queryData}`,'',
          function(response){
            const scrappeddata = response;
            chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
              chrome.tabs.sendMessage(tabs[0].id,{type:"displayData",data:scrappeddata},function(response){
                console.log(response);
              })
            })
          });

          
          
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
    window.localStorage.setItem(varName,JSON.stringify(data))
}

function getStorageItem(varName){
  return JSON.parse(localStorage.getItem(varName))
}
