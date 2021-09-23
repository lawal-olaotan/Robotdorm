console.log('content script currently running');

let url = window.location.href;
console.log(url);

            if(!url.includes('https://www.jumia.com.ng/')){
                console.log('not on jumia');
                console.log(url);

                sendToPopup(false, 'mypage')

            }else{

                sendToPopup(true, 'mypage')

                    if(url.includes('https://www.jumia.com.ng/customer/order/index/')){

                        let products = [];
                        let prevOrders = document.querySelectorAll('.col16.-pvs');
                    
                        for(i=1; i< prevOrders.length;i++){
                            products.push(prevOrders[i].childNodes[0].childNodes[0].children[1].children[1].innerHTML);
                        }
                    
                        const backgroundData = {link:url , product:products};
                        sendToBackground("products",backgroundData);
                }
                    
                if(url.includes('?q=')){
                    const urlArray = []
                    let searchLink = url;
                    urlArray.push(searchLink);
                    for(let i =2; i <= 50; i++){
                    let searchlinks = `${url}&page=${[i]}#catalog-listing`;
                        urlArray.push(searchlinks);
                    }
        
                    let queryData = document.querySelector('.brcbs.col16.-pvs').lastChild.innerHTML;
                    const searchData = {searchLink : urlArray , keyWord : queryData};
                    sendToBackground('searchData',searchData);
                    sendToPopup(true,'enable')
                }else{
                    sendToPopup(false,'enable');
                }
            }


            


function sendToBackground(eventName,eventData){
        chrome.runtime.sendMessage({type:eventName,data:eventData}, 
        function(response){
            console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
        })
}

function sendToPopup(message,title){
    chrome.runtime.onMessage.addListener((msg,sender,response)=> {
        if((msg.from === 'popup') && (msg.subject === title)){
            console.log('message recieved from popup ')
            response(message);
        }
    })
}

