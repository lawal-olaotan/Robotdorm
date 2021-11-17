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
      case "visitJumia":
          console.log('message:',message);
          chrome.tabs.create({url:'https://www.jumia.com.ng'});
          sendResponse('website redirected');
          return true; 
        break;
        case"searchData":
        console.log('search data event hit in background', message.data);
        const storedData = getStorageItem('searchData');
        if (message.data.keyWord === storedData.keyWord){
            console.log('file exist');
            sendResponse('all good');
        }else{
          message.data._id = getStorageItem('user').user._id;
          setStorageItem(message.type,message.data);
          sendResponse('data succesffully recieved in background');
        }
        return true; 
        break;

        case"keywordSearch": 
        console.log('keyword event event hit background');

        // trigger loading animation using shadowdom in contentjs
        sendToContent('initateLoader','');

        const data = getStorageItem('searchData');

        // sscrapping data using puppeteer with node js endpoint
        allAjax('POST',data,'product/searchScrapper','',
          function(response){
              if(response)
              sendToContent('success',''); 
              console.log(response.data) 
        });

        sendResponse('data sent'); 
        return true; 
        break;

        case"FetchData": 
        console.log('fetch event event hit background');
        message.data.querydata = getStorageItem('searchData').keyWord;
        message.data.size = 10; 

        allAjax('GET',message.data,'product/getProducts','',
          function(response){
            const scrappeddata = response;
            // send requested data to context script
            sendToContent("displayData",scrappeddata);  
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

function sendToContent(msgtype,data){
  chrome.tabs.query({active:true,currentWindow: true},function(tabs){  
    // send request for the current tab 
    chrome.tabs.sendMessage(
        tabs[0].id,{type:msgtype,data:data },function (response){ 
      console.log(response);                  
    })
  })

}
