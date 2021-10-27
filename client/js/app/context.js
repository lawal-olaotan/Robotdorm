console.log('content script currently running');

// current weppage location
let url = window.location.href;

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
  

// eventlisterners 
chrome.runtime.onMessage.addListener(

    function(msg,sender,response){
        switch(msg.type){

            case "success":
                response('go it');
                const dbData = {page:0}
                sendToBackground('FetchData',dbData);
            return true; 
            break;
            case "initateLoader":
                console.log('loader created')
                response('loader created')
            return true; 
            break; 

            case "displayData":
                console.log(msg.data); 
                injectShadow(msg.data);
                response('data recieved from bg');
                 
            return true; 
            break;

            default:
            console.log('no match found')
    
        }
})

// helper functions 
const injectShadow =(data)=> {

    console.log(data);

    let productData = data.data; 
    let root = document.createElement('div');
    const rootDiv = document.createElement('div');
    root.setAttribute('id','keyword');
    let shadow = rootDiv.attachShadow({mode:'open'});
    root.appendChild(rootDiv);

    // jumia dom 
    const parentEle = document.body
    const jumiaDiv = parentEle.querySelector('#jm'); 

    // inserting shadow dom into the jumia dom 
    parentEle.insertBefore(root,jumiaDiv); 

    // // applying style 
    const linkEle = document.createElement('style');
    linkEle.innerHTML= `
    *{
        margin:0;
        padding:0;
        box-sizing:border-box; 
    }
    .jumcontainer{
        z-index: 9999999999;
        position: fixed;
        width: 100%;
        height: 300%;
        top: 0;
        left: 0;
        right: 0;
        bottom:0;
        display:flex;
        opacity:1;  
    }
    .scrapbody{
        position:relative; 
        top:0; 
        right:0;
        bottom:0;
        left:0;
        width:100%;
        height:100%; 
        background-color:rgba(255, 0, 0, 0.31); 
    }
    .contentbody{
        position: relative;
        width: 1200px;
        height: 700px;
        background: white;
        top: 2pc;
        display: flex;
        left: 7pc;
        flex-direction:column; 
        padding:1.8rem;
    }
    .iconbox{
        position: absolute;
        top:1pc;
        right:1pc;
        height:24px;
        outline:none;
        border:none;
        background:transparent;
    }
    .icon{
        width: 100%;
        height: 100%;
    }
    .closebody{
        display:none;
    }
    .headercon{
        display:flex;
        width:100%;
        margin-top:1.5rem;
        margin-bottom:1.1rem;
        align-items:center;
        justify-content:space-between;
    }
    .logo{
        font-size: 1.4rem;
        color: #307BD1; 
        text-decoration:none;
        font-weight: 800; 
    }
    .headerbtn{
        display:flex;
        align-items:center;
        width:15%;
        background:#307BD1;
        justify-content:space-around;
        padding:.5rem;
        color:#fff;
        font-size:1rem;
        border-radius:18px;
        font-weight:600;
        text-decoration:none;
    }
    .wsicon{
        height:24px;
    }
    .detailsec{
        display:flex;
        width:60%;
        align-items:center;
        margin-bottom:1rem; 
        justify-content:space-between;
    }
    .keywordcontainer{
        display:flex;
        align-items:center;
        font-size:1rem;
        margin-bottom:1rem;
    }
    .keytitle{
        color:#307BD1;
        margin-right:8px;
        font-weight:600;
    }
    .keydata{
        color:#000;
        font-weight:700;
    }
    .summarysection{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:1.5rem;
    } 
    .summcontainer{
        padding:1rem;
        border:1px solid #307BD1;
        border-radius:10px;
        text-align:center;
        width:15%;
    }
    .sumtitle{
        margin-bottom:.6rem;
        font-size:.65rem; 
    }
    .sumvalue{
        font-size: .85rem;
        font-weight: 700;  
    }
    .tablecontainer{
        width:100%;
        display:table;
        border-top:.5px solid;
        border-left:.5px solid; 
        border-color: #D7DBDB;
    }
    .tableheadercon{
        display:table-row;
        font-weight:bold; 
        font-size:12px;
    }
    .headercell{
        display:table-cell;
        padding:6px;
        text-align:center;
        border-bottom:0.2px solid #D7DBDB;
        border-right: 0.2px solid #D7DBDB;
    }
    .tablebody{
        display:table-row-group;
    }

    .productImg{
        height:20px;
        margin-right:10px;
    }

    #producttitle{
        display:flex;
        align-items:center;
        text-decoration:none;
        color:#000;
    }
    #prodspace{
        width:400px;
    }
    .footercon{
        width:100%;
        display: flex; 
        align-items:center;
        margin-top:.75rem;
    }
    .paginacontainer{
        display:flex;
        align-items:center;
        width:20%;
        justify-content:space-between; 
    }
    .pagibtn{
        display:flex;
        align-items:center;
        text-decoration:none;
        background:center;
        width:22px;
        color:#000;
        justify-content:center;
        font-size:16.5px;
        border:0.5px solid #DCDCDC;
    }

    #currentpage{
        border:0.6px solid #307BD1;
        color:#307BD1;
    }
    .noactivebtn{

    }
    .fastbackicon{
        width:100%;
    }

`; 

    // creating container;
    const container = document.createElement('div');
    container.setAttribute('class','jumcontainer');

    const innerContainer = document.createElement('div');
    innerContainer.setAttribute('class','scrapbody');

    const infoBody = document.createElement('div');
    infoBody.setAttribute('class','contentbody'); 

    // information ready state 
    // close btn
    const iconbox = document.createElement('button');
    iconbox.setAttribute('class', 'iconbox');
    const icon = document.createElement('img');
    const imgattr = {
        "src": 'https://i.ibb.co/51Y7MYc/cancel.png',
        "alt": 'close button',
        "class": "icon", 
    }
    setAttr(icon, imgattr);
      // insert logo to icon box container
      iconbox.appendChild(icon); 


    // logo and source btn section starts here
    const headingContainer = document.createElement('div');
    headingContainer.setAttribute('class', 'headercon'); 
    // logo section start here
    const logo = document.createElement('a'); 
    const logoLink = document.createTextNode('Shoplly Chrome Extension')
    logo.append(logoLink); 
    const logoattr ={
        "href": "#",
        "class": "logo", 
    }
    setAttr(logo, logoattr);
    headingContainer.appendChild(logo)
    // header button section starts here
    const headerButton = document.createElement('a');
    headerButton.setAttribute('class', 'headerbtn'); 
    headerButton.setAttribute('href', '#');
     const wsLogo = document.createElement('img');
     const wsattr = {
        "src": 'https://i.ibb.co/SdsmzSK/whatsapp.png',
        "alt": 'whatsapp button',
        "class": "wsicon", 

     }
     setAttr(wsLogo, wsattr);
     headerButton.appendChild(wsLogo);

    //  button text 
     const headerText = document.createElement('span');
     const spantext = document.createTextNode('Source Product')
     headerText.appendChild(spantext);
     headerButton.appendChild(headerText);
     headingContainer.appendChild(headerButton)


    //  data
    const keytitle = productData[0].keyWord;

    const totalListed = document.querySelector('.-gy5.-phs').textContent.split(' ')[0]; 

    // keyword and total product listed section 
    const detailsec = document.createElement('div');
    detailsec.setAttribute('class', 'detailsec'); 

    // product keyword container
     const keywordcon = document.createElement('p');
     keywordcon.setAttribute('class','keywordcontainer')

     const keyTitle = document.createElement('span');
     keyTitle.setAttribute('class','keytitle');
     const keyText = document.createTextNode('Product Keyword :');
     keyTitle.appendChild(keyText); 
     keywordcon.appendChild(keyTitle);

     const keyData = document.createElement('span');
     keyData.setAttribute('class','keydata');
     const dataText = document.createTextNode(`${keytitle}`);
     keyData.appendChild(dataText); 
     keywordcon.appendChild(keyData);

    //  product listed section
    const listcontainer = document.createElement('p');
    listcontainer.setAttribute('class','keywordcontainer');
    let listTitle = document.createElement('span');
    listTitle.setAttribute('class','keytitle');
    let listText = document.createTextNode('Total Product Listed :'); 
    listTitle.appendChild(listText);
    listcontainer.appendChild(listTitle);

    let listData = document.createElement('span');
        listData.setAttribute('class','keydata');
    let listInfo = document.createTextNode(`${totalListed}`);
    listData.appendChild(listInfo); 
    listcontainer.appendChild(listData);
    detailsec.appendChild(keywordcon);
    detailsec.appendChild(listcontainer)


    // data summary section 
    const summData = getSummary(productData);
    let summarySection = document.createElement('div');
    summarySection.setAttribute('class', 'summarysection');

    for(const prop in summData){
        let summcontainer = document.createElement('div');
        summcontainer.setAttribute('class', 'summcontainer'); 

        let sumtitle = document.createElement('p');
        sumtitle.setAttribute('class', 'sumtitle');
        sumtitle.innerHTML = `${prop}`; 
        summcontainer.appendChild(sumtitle)

        let sumValue = document.createElement('p');
        sumValue.setAttribute('class', 'sumvalue');
        sumValue.innerHTML = `${summData[prop]}`; 
        summcontainer.appendChild(sumValue);
        summarySection.appendChild(summcontainer); 
    }

    // table section 
    let tableCon = document.createElement("div"); 
    tableCon.setAttribute("class", 'tablecontainer');

    // table header
    const headerData = ['Product Details', 'Price','Est. Sales','Est. Revenue','Ratings','Sellers Location','Shipping Mode']; 
    let tableHeaderCon = document.createElement("div");
    tableHeaderCon.setAttribute("class", 'tableheadercon');

    headerData.forEach( sindata => {
        let headerCell = document.createElement("div");
         headerCell.setAttribute("class", 'headercell')
         let headerText = document.createTextNode(`${sindata}`);
         headerCell.appendChild(headerText);
         tableHeaderCon.appendChild(headerCell);
         tableCon.appendChild(tableHeaderCon);
    })

    // table body 
    const tablebody = document.createElement("div");
    tablebody.setAttribute('class', 'tablebody');
    
    // table row
    productData.forEach(tabitem => {

        let bodyrow = document.createElement("div");
        bodyrow.setAttribute("class", 'tableheadercon');
        
        // product details cell
        let productDetails = document.createElement("div");
        productDetails.setAttribute('class','headercell');
        productDetails.setAttribute('id', 'prodspace')

        let prodinnercell = document.createElement("a");
        const innerattr = {
            "id":"producttitle",
            "href": `${tabitem.link}`,
            "target": '_blank'
        }
        setAttr(prodinnercell, innerattr);
        
        let productImg = document.createElement("img"); 
        productImg.setAttribute("src", `${tabitem.img}`)
        productImg.setAttribute("class",'productImg');
        prodinnercell.appendChild(productImg); 
        let productTitle = document.createElement("span");
        productTitle.innerHTML = shortenTitle(tabitem.title); 
        prodinnercell.appendChild(productTitle);

        productDetails.appendChild(prodinnercell)

        // price cell 
        let productprice = document.createElement("div");
        productprice.setAttribute('class', 'headercell'); 
        productprice.innerHTML = `${tabitem.price}`

        // sales cell 
        let sales = document.createElement("div");
        sales.setAttribute('class', 'headercell'); 
        sales.innerHTML = `${tabitem.sales}`;

        // revenue cell
        let revenue = document.createElement("div");
        revenue.setAttribute('class', 'headercell'); 
        revenue.innerHTML = `${tabitem.revenue}`;

        // ratings 
        let ratings = document.createElement("div");
        ratings.setAttribute('class', 'headercell'); 
        ratings.innerHTML = `${tabitem.ratings}`

        // mode of shipping 
        let mode = document.createElement("div");
        mode.setAttribute('class', 'headercell'); 
        mode.innerHTML = `${tabitem.mode}`

        // seller mode 
        let shipping = document.createElement("div");
        shipping.setAttribute('class', 'headercell'); 
        shipping.innerHTML = `${tabitem.shipping}`
        
        bodyrow.appendChild(productDetails); 
        bodyrow.appendChild(productprice); 
        bodyrow.appendChild(sales); 
        bodyrow.appendChild(revenue); 
        bodyrow.appendChild(ratings); 
        bodyrow.appendChild(mode); 
        bodyrow.appendChild(shipping); 

        tablebody.appendChild(bodyrow); 

    })

    tableCon.appendChild(tablebody);


    // footer section 
    const footercon = document.createElement("div"); 
    footercon.setAttribute("class", 'footercon'); 

    const paginationContainer = document.createElement("div");
    paginationContainer.setAttribute("class",'paginacontainer' );

    const paginationicons = [
        {
            src: 'https://i.ibb.co/68Q5FZ3/chevrons-left.png', 
            id:'fastprevbtn'
        }, 
        {
            src: 'https://i.ibb.co/ZJXZ5vx/chevron-left.png', 
            id:'prevbtn'
        },
        {
            src: 'https://i.ibb.co/C9c15J4/chevron-right.png', 
            id:'nextbtn'
        },
        {
            src: 'https://i.ibb.co/74DgytS/chevrons-right.png', 
            id:'fastnextbtn',
        },
    ]

    const pagenumber = data.currentPage;
    const totalPage = data.totalPage

    const iconlibrary = []

    paginationicons.forEach( i => {

        const fastbackcon = document.createElement("button");
        fastbackcon.setAttribute("id", `${i.id}`); 
        fastbackcon.setAttribute("class", 'pagibtn');

        const fastbackicon = document.createElement("img");
        fastbackicon.setAttribute("src", `${i.src}`); 
        fastbackicon.setAttribute("class", 'fastbackicon' );
        fastbackcon.appendChild(fastbackicon); 
        iconlibrary.push(fastbackcon); 
    })

   
    let pages = showPages(pagenumber,totalPage)
    pages.forEach( j => {
        const number = document.createElement("button")
        number.setAttribute("class", 'pagibtn');
        number.setAttribute("id", `${j}`);
        number.innerHTML = `${j}`
        iconlibrary.splice(2,0,number); 
        if(j === pagenumber){
            number.setAttribute("id",'currentpage');
        }
    });


    iconlibrary.forEach( l => {
         paginationContainer.appendChild(l); 
    }); 

    footercon.appendChild(paginationContainer);


    // container with major components
    infoBody.appendChild(iconbox);
    infoBody.appendChild(headingContainer);
    infoBody.appendChild(detailsec);
    infoBody.appendChild(summarySection); 
    infoBody.appendChild(tableCon); 
    infoBody.appendChild(footercon); 


    innerContainer.appendChild(infoBody);
    container.appendChild(innerContainer); 
    shadow.appendChild(linkEle);
    shadow.appendChild(container);

    // close container 
    iconbox.addEventListener('click', function (){
        container.classList.add('closebody');
    })

    paginationElements(paginationContainer,data); 
}

function setAttr(elem, attrs){
    for(let key in attrs){
        elem.setAttribute(key,attrs[key])
    }
}

const getSummary = (data)=> {

    let totalRev = 0;
    let totalSales = 0;
    let totalPrice = 0;
    let totalrating=0;

    for(let i=0; i < data.length; i++){
        totalRev += data[i].revenueNum; 
        totalSales += data[i].sales; 
        totalPrice += data[i].salesPrice; 
        totalrating += data[i].ratings; 
    }

    let totalfig = totalRev.toLocaleString();
    let avgRev = parseInt((totalRev/data.length).toFixed()).toLocaleString();
    let avgPrice = parseFloat((totalPrice/data.length).toFixed()).toLocaleString();
    let avgRatings = (totalrating/data.length).toFixed(1)
    let totalsell = totalSales.toLocaleString()


    const summaryData= {
        "Est. Total Revenue" :'₦'+' '+totalfig, 
        "Est. Total Units sold" : totalsell,
        "Est. Average Revenue" : '₦'+' '+avgRev,
        "Average Price":'₦'+' '+avgPrice,
        "Average Rating": avgRatings
    }
    
    return summaryData; 

}

const shortenTitle = (title) => {

    let wordcount = 50; 

    if(title.length <= wordcount){
        return title 
    }
    return title.slice(0,wordcount) + '...'; 
}

function sendToBackground(eventName,eventData){
    chrome.runtime.sendMessage({type:eventName,data:eventData}, 
    function(response){
        console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
    })
}

function sendToPopup(message,title){
chrome.runtime.onMessage.addListener((msg,sender,response)=> {
    if(msg.type === title){
        console.log('message recieved from popup ')
        response(message);
    }
})
}

const showPages = (pagenumber,totalPage) => {
    let pagenum = []
    if(pagenumber === totalPage){
        pagenum = [pagenumber,(pagenumber -1),(pagenumber-2) ];
    }else if((totalPage -pagenumber) === 1){
        pagenum = [totalPage , pagenumber, (pagenumber - 1)]
    }else{
        pagenum = [(pagenumber+2),(pagenumber +1), pagenumber];
    }
    return pagenum; 
}

const paginationElements = (ele,data) => {
    let pagiEles = ele.childNodes
    
    for(b=0; b < pagiEles.length; b++){

        if(pagiEles[b].getAttribute("id") === 'nextbtn'){
            paginationEvent(pagiEles[b],data.currentPage)
        }
    }
}

const paginationEvent = (channel,data) => {
    channel.addEventListener('click', function (){
        const evData = {page:data}
        sendToBackground('FetchData',evData);   
    })

}



