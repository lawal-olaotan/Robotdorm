console.log('content script currently running');

let url = window.location.href;
console.log(url);


if(url.includes('https://www.jumia.com.ng/customer/order/index/')){
    
    let ordervalue = document.querySelector('._actv').textContent.split(' ')[2];
    console.log(ordervalue);
    let products = [];
    let realproducts = []
    let prevOrders = document.querySelectorAll('.col16.-pvs');

    for(i=1; i< prevOrders.length;i++){
        products.push(prevOrders[i].childNodes[0].childNodes);  
    }

    extractInfo(products);
    sendToBackground("products",products) 


}


function sendToBackground(eventName,eventData){
    chrome.runtime.sendMessage({type:eventName,data:eventData}, 
        function(response){
            console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
        })


}

function extractInfo(products){
    console.log(products);
    
}