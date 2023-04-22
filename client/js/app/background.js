let dev = true;
let serverDomain = 'https://robotdorm.online/';
let webAppUrl =  'https://www.robotdorm.com/';

// message exhange between popupJs and context.Js
chrome.runtime.onMessage.addListener(
 function(message,sender,sendResponse){

    // switch statement used to find cases based on the keywordId current state
    switch (message.type){

      case "onPopupInit":
        getStorageItem('keywordId').then((data)=> {
            sendResponse(data);
  
        });
        return true;
        break;
      case "login":
        chrome.tabs.update({url:webAppUrl+'Login'});
        sendResponse('redirected'); 
          return true;
          break; 
      case "visitJumia":
          // TODO:Redirect to robotdorm landingpage for marketplaces
          chrome.tabs.update({url:'https://www.jumia.com.ng'});
          sendResponse('website redirected');
          return true; 
        break;
      case"searchData":
        getStorageItem('keywordId').then(data => {
         message.data._id = data.keywordId;
          setStorageItem('searchData', message.data);
          sendResponse('data succesffully recieved in background');
        })
      return true; 
      break;
      case"keywordSearch": 
      console.log('keyword event event hit background');
      // trigger loading animation using shadowdom in contentjs
      sendToContent('initateLoader','');
      getStorageItem('searchData').then(data =>{
      postData('POST', data.searchData,'product/searchScrapper').then(response => {
         if(response.status === 500){
          sendToContent('error', ''); 
        }else {
          sendToContent('success',response); 
          sendResponse('data sent'); 
        }
      });
       
       }); 
      
      return true; 
      break;
      case"FetchData": 
          console.log('fetch event event hit background');
           getStorageItem('searchData').then(data => {
            let query = message.data
            query.querydata = data.searchData.keyWord
            query._id = data.searchData._id
            const queryUrl = serverDomain + 'product/getProducts'
              fetch(`${queryUrl}?page=${query.page}&size=${10}&querydata=${query.querydata}&_id=${query._id}`).then(res => res.json()).then(data => {
                sendToContent("displayData",data);
              })
           });
      return true;
      break;
      case"saveList": 
       getStorageItem('keywordId').then(data => {
        let listData = message.data
        listData.postedBy = data.keywordId;
        postData('POST',{list:listData},'product/list')
          .then(res => {
              if(res.data !== undefined){
                let listres = {stats : 'recieved'}
                sendResponse(listres);
              }
            
          })
       });
          
          
          
      return true;
      break;
      case"OpenList": 
          chrome.tabs.update({url:webAppUrl+'Dashboard/Lists'});
        return true;
        break;
      default:
          console.log('no match found')
    }
});

// message from robotdorm website
chrome.runtime.onMessageExternal.addListener(
    function(message,sender,sendResponse){
    if(message.type === 'browser'){
      const userId = message.data;
      setStorageItem('keywordId', userId);
      sendResponse('');
    }
  }
)


async function postData(type,data,path){
  const response = await fetch(serverDomain+path,{
    method:type,
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
    },
    mode: 'cors',
  });
  const res = await response.json(); 
  return res;
}

async function setStorageItem(varName,data){
    chrome.storage.local.set({[varName]:data}).then(()=> {
      console.log('saved')
    })
}

async function getStorageItem (varName){
    const result = await chrome.storage.local.get([varName]).then(data => {
      return data
    })
    return result;
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



