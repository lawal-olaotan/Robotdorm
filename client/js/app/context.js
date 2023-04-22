
$(document).ready(function() {

    // current weppage location
let url = window.location.href;
localStorage.removeItem('list');

// checking webpage and sending boolean response to popup js for view manipulation. 
const jumiaDomainExtensions = [
<<<<<<< HEAD
    'https://www.jumia.com.ng/',
    'https://www.jumia.dz/',
    'https://www.jumia.ma/',
    'https://www.jumia.com.eg/',
    'https://www.jumia.com.gh/',
    'https://www.jumia.ci/',
    'https://www.jumia.co.ke',
    'https://www.jumia.ma/',
    'https://www.jumia.sn/',
=======
    'https://www.jumia.com.ng',
    'https://www.jumia.ma',
    'https://www.jumia.com.eg',
    'https://www.jumia.com.gh/',
    'https://www.jumia.ci',
    'https://www.jumia.co.ke',
    'https://www.jumia.ma',
    'https://www.jumia.sn',
>>>>>>> a79b2fc31ba17fffc7b6fdcb36f77579a418f42f
    'https://www.zando.co.za/',
    'https://www.jumia.com.tn/',
    'https://www.jumia.ug/'
]

<<<<<<< HEAD
// checks if domain extension is contains a subString of the url
const checkUrlExtension = (domainUrl) => url.includes(domainUrl); 

if(!jumiaDomainExtensions.some(checkUrlExtension)){
    console.log(url);
=======
// TODO: I'm not sure this is right approach you can kindly review and let me know your thoughts
if(!jumiaDomainExtensions.includes(url)){
>>>>>>> a79b2fc31ba17fffc7b6fdcb36f77579a418f42f
    sendToPopup(false, 'mypage')
}else{
    sendToPopup(true, 'mypage'); 
    if(url.includes('?q=')){
        sendToPopup(true,'enable')
        const urlArray = []
        let searchLink = url;
        urlArray.push(searchLink);
<<<<<<< HEAD
for(let i =2; i <= 25; i++){   
=======
        for(let i =2; i <= 40; i++){
>>>>>>> a79b2fc31ba17fffc7b6fdcb36f77579a418f42f
            let searchlinks = `${url}&page=${[i]}#catalog-listing`;
            urlArray.push(searchlinks);
        }
        let queryData = document.querySelector('.brcbs.col16.-pvs').lastChild.innerHTML;
<<<<<<< HEAD
        const searchData = {searchLink : urlArray , keyWord : queryData};
=======

        // Price symbol was investigated across all website
        let PriceSymbol = document.querySelector(".-m.-upp.-fs14.-pvs").innerHTML; 
        let currency = PriceSymbol.split(' ')[1].replaceAll(/\().+?\)/, "");

        const searchData = {searchLink : urlArray , keyWord : queryData, currency:currency};
>>>>>>> a79b2fc31ba17fffc7b6fdcb36f77579a418f42f
        
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
                response('go for it');
                const dbData = {page:0}
                if(msg.data.data === 'data found'){
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


