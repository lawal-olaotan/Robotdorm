console.log('content script currently running');

let url = window.location.href;

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
            sendToPopup(true,'enable')
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


chrome.runtime.onMessage.addListener(function(msg,sender,response){

    if(msg.type === 'displayData'){
        console.log(msg.data);
        response('data recieved from bg');
        injectShadow(); 
    }
})





const injectShadow =()=> {

    let root = document.createElement('div');
    const rootDiv = document.createElement('div');
    root.setAttribute('id','keyword');
    let shadow = rootDiv.attachShadow({mode:'open'});
    root.appendChild(rootDiv);


    // jumia dom 
    const parentEle = document.body
    const jumiaDiv = parentEle.querySelector('#jm')

    // inserting shadow dom into the jumia dom 
    parentEle.insertBefore(root,jumiaDiv); 

    // // applying style 
    const linkEle = document.createElement('style');
    linkEle.innerHTML= `
    .jumcontainer{
        z-index: 9999999999;
        position: fixed;
        width: 100%;
        height: 300%;
        top: 0;
        left: 0;
        right: 0;
        bottom:0;
        background-color:rgba(255, 0, 0, 0.31); 
    }
    
    
    `; 


    // creating container;
    const container = document.createElement('div');
    
    container.setAttribute('class','jumcontainer')

    shadow.appendChild(linkEle);
    shadow.appendChild(container);





}


