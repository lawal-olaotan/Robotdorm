console.log('background script running');

let dev = true;
// let domain = 'https://fierce-dawn-36286.herokuapp.com/'
let domain = 'http://localhost:8000/'
let myurl = 'http://localhost:3000/' || 'https://robotdorm.com/';



chrome.runtime.onMessage.addListener(

  function(message,sender,sendResponse){

    // switch statement used to find cases based on the user current state
    switch (message.type){

      case "onPopupInit":
        const usermine = getStorageItem('user');
        sendResponse(usermine);
        return true;
        break;
      case "login":
        chrome.tabs.create({url:myurl+'Login'});
        sendResponse('redirected'); 
        // send message to your browser and get response to be stored in local storage
        

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
          message.data._id = getStorageItem('user').user._id;
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
              }else{
                sendToContent('success',''); 
              } 
              console.log(response.data) 
        });

        sendResponse('data sent'); 
        return true; 
        break;

        case"FetchData": 
            console.log('fetch event event hit background');
            message.data.querydata = getStorageItem('searchData').keyWord;
            message.data.size = 10;
            message.data._id = getStorageItem('user').user._id;

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
                  stats : 'recieved',
                  data : getStorageItem('user').token,
                  id: getStorageItem('user').user._id,
                }
                sendResponse(listres);
                console.log(response);
            });
        return true;
        break;
        case"OpenList": 
          chrome.tabs.create({url:myurl+'List'});
        return true;
        break;
        case"browser": 
          console.log(message.data);
          
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
