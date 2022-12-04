
$(document).ready(function() {

    // current weppage location
let url = window.location.href;
localStorage.removeItem('list');

// checking webpage and sending boolean response to popup js for view manipulation. 
if(!url.includes('https://www.jumia.com.ng/')){
    console.log('not on jumia');
    sendToPopup(false, 'mypage')
}else{
    sendToPopup(true, 'mypage'); 
    if(url.includes('?q=')){
        sendToPopup(true,'enable')
        const urlArray = []
        let searchLink = url;
        urlArray.push(searchLink);
        for(let i =2; i <= 40; i++){
            let searchlinks = `${url}&page=${[i]}#catalog-listing`;
            urlArray.push(searchlinks);
        }
        let queryData = document.querySelector('.brcbs.col16.-pvs').lastChild.innerHTML;
        const searchData = {searchLink : urlArray , keyWord : queryData};
        
        const PrevKey = localStorage.getItem('Keyword');
        
        if(PrevKey !== queryData ){
            window.sessionStorage.clear()
        }; 
        sendToBackground('searchData',searchData);   
    }else{
        sendToPopup(false,'enable');
        sendToBackground('search',''); 
    }
}


})

    
// eventlisterners 
chrome.runtime.onMessage.addListener(

    function(msg,sender,response){
        switch(msg.type){
            case "success":
                response('go it');
                const dbData = {page:0}
                if((typeof msg.data) === 'string'){
                    sendToBackground('FetchData',dbData);
                }else{
                    clearLoader()
                    let postData = msg.data; 
                    postData.page= 0; 
                    getkeyDate(postData)
                    injectShadow(postData);

                }
            return true; 
            break;
            case "initateLoader":
                injectShadow('loader');
                response('loader created')
                return true; 
            break; 
            case "displayData":
                getkeyDate(msg.data)
                clearLoader()
                injectShadow(msg.data);
                response('data displayed');
            return true; 
            break;
            case 'error': 
            clearLoader()
            injectShadow('error');
            default:
            console.log('no match found')
    
        }
})


