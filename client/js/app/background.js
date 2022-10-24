

let dev = true;

let domain = 'http://localhost:8000/'
// let myurl =  'http://localhost:3000/';
let myurl =  'https://www.robotdorm.com/';



chrome.runtime.onMessage.addListener(

  function(message,sender,sendResponse){

    // switch statement used to find cases based on the keyword_id current state
    switch (message.type){

      case "onPopupInit":
        const usermine = localStorage.getItem('keyword_id');
        sendResponse(usermine);
        return true;
        break;
      case "login":
        chrome.tabs.create({url:myurl+'Login'});
        sendResponse('redirected'); 
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
          // use jquery to store data
          message.data._id = localStorage.getItem('keyword_id');
          setStorageItem(message.type,message.data);
          sendResponse('data succesffully recieved in background');
        return true; 
        break;
        case"keywordSearch": 
        console.log('keyword event event hit background');

        // trigger loading animation using shadowdom in contentjs
        sendToContent('initateLoader','');
        
        const data = getStorageItem('searchData'); 

        // scrapping data using puppeteer with node js endpoint
        allAjax('POST',data,'product/searchScrapper','',
          function(response){
              if(response.status === 500){
                sendToContent('error', ''); 
              }else {
                sendToContent('success',response); 
              }
        });

        sendResponse('data sent'); 
        return true; 
        break;
        case"FetchData": 
            console.log('fetch event event hit background');
            message.data.querydata = getStorageItem('searchData').keyWord;
            message.data.size = 10;
            message.data._id = localStorage.getItem('keyword_id');
            allAjax('GET',message.data,'product/getProducts','',
              function(response){
                const scrappeddata = response;
                // send requested data to context script
                sendToContent("displayData",scrappeddata);  
            });
        return true;
        break;
        case"saveList": 
            let listData = {
                datapic: message.data
            } 
            allAjax('POST',listData,'product/list','',
              function(response){
                let listres = {
                  stats : 'recieved',}
                sendResponse(listres);
                console.log(response);
            });
        return true;
        break;
        case"OpenList": 
          chrome.tabs.create({url:myurl+'List'});
        return true;
        break;
      default:
          console.log('no match found')
    }
});

chrome.runtime.onMessageExternal.addListener(
  function(message,sender,sendResponse){

    if(sender.url === 'https://www.robotdorm.com/Login'){

      if(message.type === 'browser'){
        const user_id = message.data;
        localStorage.setItem('keyword_id', user_id);
      }
    }

    
  }
)


function allAjax(type,data,path,token,callback){
  $.ajax({
    url:domain+path,
    type:type,
    data:data,
    headers:{
      token:token,
      contentType: "application/json",
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
