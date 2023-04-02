const getStyles = ()=> {
    return `@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;500;600;1,300&display=swap');
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family: 'Poppins', sans-serif;
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
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size: 1.4rem;
        color: #307BD1; 
        text-decoration:none;
        font-weight: 500; 
    }
    .headerbtn{
        display:none;
        align-items:center;
        width:45%;
        background:#307BD1;
        justify-content:space-around;
        padding:.5rem;
        color:#fff;
        font-size:1rem;
        border-radius:6px;
        font-weight:500;
        text-decoration:none;
        border:none;
        margin-right:1rem; 
    }
    .wsicon{
        height:24px;
    }
    .detailsec{
        display:flex;
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
        border:1px solid #307BD1;
        border-radius:10px;
        text-align:center;
    }
    .sumtitle{
        margin-bottom:.6rem;
        font-size:.65rem; 
    }
    .sumvalue{
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
    }
    .headercell{
        display:table-cell;
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

    .producttitle{
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
        justify-content: space-between; 
        
    }
    .paginacontainer{
        display:flex;
        align-items:center;
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

    #loader{
        align-items:center;
        justify-content:center;
        display:flex;
    }

    .animcontainer{
        padding:2rem;
        width :200px;
        display:flex;
        align-items:center;
        justify-content:center;
    }

    .animImg{
        width: 100%; 
    }

    .animtextcontainer{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .animtext{
    font-weight:500;
    font-size: 1.5rem;
    text-align:center;
    }

    .imglogo{
        margin-right:.6rem; 
    }

    .buttoncontainer{
        width: 27%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .eventText{
        color:red;
        font-weight: 500;
    }

    @media screen and (min-width: 1024px) {

        .contentbody{
            width: 950px;
            height: 700px;
            background: white;
            top: 1pc;
            left: 2pc; 
        }

        .headerbtn{
            width:45%;
        }

        .imglogo{
            width:40px;
        }
        .detailsec{
            width:75%;
        }

        .summcontainer{
            padding:0.8rem;
            width:16%;
        }
        .sumvalue {
            font-size: .7rem;
        }

        .tableheadercon{
            font-weight:550; 
            font-size:10px;
        }
        .headercell{
            padding:3.5px;
        }

        .footercon{
            margin-top:1rem;
        }
        .paginacontainer{
            width:27%; 
        }

        

    }

    @media screen and (min-width: 1440px) {

        .contentbody{
            width: 1200px;
            height: 760px;
            background: white;
            top: 1pc;
            left: 7pc; 
        }

        .headerbtn{
            width:45%;
        }

        .detailsec{
            width:60%;
        }
        .summcontainer{
            padding:1rem;
            width:15%;
        }
        .sumvalue {
            font-size: .85rem;
        }

        .tableheadercon{
            font-weight:600; 
            font-size:12px;
        }

        .headercell{
            padding:6px;
        }

        .footercon{
            margin-top:.75rem;
        }
        .paginacontainer{
            width:20%; 
        }
       
    }

    @media screen and (min-width: 1920px) {
        .contentbody{
            top: 3pc;
            left: 22pc;
        }
       
    }



    `; 
}

const injectShadow =(data)=> {
    localStorage.removeItem('list');
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
    linkEle.innerHTML= getStyles(); 

    // creating container;
    const container = document.createElement('div');
    container.setAttribute('class','jumcontainer');

    const innerContainer = document.createElement('div');
    innerContainer.setAttribute('class','scrapbody');

    // 
    if ((typeof data) === 'object'){

        let productData = data.data;

        let summarydata;
        let listStatus; 

        if(data.currentPage === 1){
            summarydata = getSummary(data.summaryData);
            listStatus = data.list; 
            localStorage.setItem('ListStatus', data.list) 
        }else{
            summarydata = JSON.parse(window.localStorage.getItem('summaryData'))
            listStatus = (JSON.parse(window.localStorage.getItem('ListStatus')) === true); 
        }


        const infoBody = document.createElement('div');
        infoBody.setAttribute('class','contentbody'); 
        infoBody.setAttribute('id', 'content');

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

            const imglogo = document.createElement('img');

            const imglogoattr = {
                class:"imglogo",
                src: "https://i.ibb.co/3zr5pP7/logochr.png",
                alt:"img-logo"
            }

            setAttr(imglogo, imglogoattr);

            const logoLink = document.createTextNode('Jumia Keyword Tool');

            logo.append(imglogo)
            logo.append(logoLink);

            const logoattr ={
                "href": "https://www.robotdorm.com/",
                "class": "logo", 
            }

            setAttr(logo, logoattr);
            
            // header button section starts here

            const headButtonContainer = document.createElement('div');
            headButtonContainer.setAttribute("class", 'buttoncontainer'); 

            const headerButton = buttonCreation("https://i.ibb.co/Schg1wK/list.png",'Save to List')
            const ViewListBtn = buttonCreation("https://i.ibb.co/1RrJg1p/shopping-bag.png", 'View List')

           if(listStatus === true){
                ViewListBtn.style.display = 'flex'; 
           }

            headButtonContainer.appendChild(headerButton); 
            headButtonContainer.appendChild(ViewListBtn); 

            headingContainer.appendChild(logo)
            headingContainer.appendChild(headButtonContainer)

            //  data
            const keytitle = summarydata.keyWord;
            localStorage.setItem('Keyword', keytitle); 

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

            // data summary section , plug data here 
            const summData = summarydata;

            let summarySection = document.createElement('div');
            summarySection.setAttribute('class', 'summarysection');
            for(const prop in summData){
                let summcontainer = document.createElement('div');
                summcontainer.setAttribute('class', 'summcontainer'); 

                // split on capital letters;
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

            // create inputbtn array 
            let inputbutton = []
            
            // table row
            productData.forEach(tabitem => {

                let productName = tabitem.title; 

                let bodyrow = document.createElement("div");
                bodyrow.setAttribute("class", 'tableheadercon');

                let selectprodContainer = document.createElement("div");
                selectprodContainer.setAttribute('class','headercell');

                let selectprodInput = document.createElement("input"); 
                let inputAttr ={
                    type:"checkbox",
                    value: `${productName}`,
                    name : `${productName}`
                }
                setAttr(selectprodInput, inputAttr);

                inputbutton.push(selectprodInput);

                let selectLabel = document.createElement("label"); 
                selectLabel.setAttribute('for',`${productName}`)

                selectprodContainer.appendChild(selectprodInput)
                selectprodContainer.appendChild(selectLabel)
                
                // product details cell
                let productDetails = document.createElement("div");
                productDetails.setAttribute('class','headercell');
                productDetails.setAttribute('id', 'prodspace')

                let prodinnercell = document.createElement("a");
                const innerattr = {
                    "class":"producttitle",
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
                productprice.innerHTML = `${tabitem.price}`; 

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
                bodyrow.appendChild(selectprodContainer); 

                tablebody.appendChild(bodyrow);
                
                itemSelection(inputbutton,productData,headerButton); 

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

            let instText = document.createElement("span");
            instText.setAttribute("class","eventText"); 

            footercon.appendChild(paginationContainer);
            footercon.appendChild(instText); 

            // container with major components
            infoBody.appendChild(iconbox);
            infoBody.appendChild(headingContainer);
            infoBody.appendChild(detailsec);
            infoBody.appendChild(summarySection); 
            infoBody.appendChild(tableCon); 
            infoBody.appendChild(footercon);
            

            // close container 
            iconbox.addEventListener('click', function (){
                clearLoader(); 
            })

            headerButton.addEventListener('click', function(){
                let listData = JSON.parse(localStorage.getItem("list"));
                chrome.runtime.sendMessage({type:'saveList',data:listData}, 
                    function(response){
                        if(response.stats === "recieved"){
                            instText.innerHTML = 'Proceed to your list to source products'
                            localStorage.removeItem('list');
                            headerButton.style.display = 'none'; 
                            ViewListBtn.style.display = 'flex';

                            const inputBtns = infoBody.querySelectorAll("input[type='checkbox']")
                            inputBtns.forEach(inputBtn => {
                                inputBtn.style.display="none"
                            } )
                        }

                    })
            })

            ViewListBtn.addEventListener("click", function(){
                sendToBackground("OpenList",''); 
            })

            paginationElements(paginationContainer,data,root);
            innerContainer.appendChild(infoBody);
    }else{
        const infoLoader = document.createElement('div');
        infoLoader.setAttribute('class','contentbody');
        infoLoader.setAttribute('id', 'loader');

        // the animation container
        const animContainer = document.createElement('div'); 
        animContainer.setAttribute('class', 'animcontainer');

        let  animImg = document.createElement('img');
        animImg.setAttribute('class', 'animImg');

    
        let animTextContainer = document.createElement('div');
        animTextContainer.setAttribute('class','animtextcontainer');

        let animText = document.createElement('span'); 
        animText.setAttribute('class', 'animtext'); 
        
    //    let img = 'https://i.ibb.co/6yH667P/animation-500-kw770vne.gif'
        let img; 
        let text
        if(data === 'error'){
            img = 'https://i.ibb.co/CVHJ4BZ/38213-error.gif';
            text = 'Kindly refresh your browser'; 

        }else{
            img = 'https://i.ibb.co/DCdtrPB/9629-loading.gif'
            text = 'Processing data ...';
        }
       
        animImg.setAttribute('src', img);
        animText.textContent = text; 

        animContainer.appendChild(animImg); 
        animTextContainer.appendChild(animText);
        infoLoader.appendChild(animContainer); 
        infoLoader.appendChild(animTextContainer); 
        innerContainer.appendChild(infoLoader);
    }
        shadow.appendChild(linkEle);
        shadow.appendChild(container);
        container.appendChild(innerContainer); 

}

function setAttr(elem, attrs){
    for(let key in attrs){
        elem.setAttribute(key,attrs[key])
    }
}

const getSummary = (data)=> {
    
    let summaryData; 

    let {_id,postedBy,__v,createdAt, ...rest} = data;

    if(__v !== undefined){
        summaryData = rest
    }else{
        let {_id,postedBy,createdAt, ...postData} = data 
        summaryData = postData
    }
    window.localStorage.setItem('summaryData',JSON.stringify(summaryData)); 
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

// change algorithm 
const showPages = (pagenumber,totalPage) => {
    let pagenum = []

    if(pagenumber === totalPage && totalPage > 3){
        pagenum = [pagenumber,(pagenumber -1),(pagenumber-2) ];
    }else if((totalPage-pagenumber) === 1 && totalPage > 2){
        pagenum = [totalPage , pagenumber, (pagenumber - 1)]
    }else if(totalPage < 3 && totalPage !== 1){
        pagenum = [totalPage, totalPage -1]
        $("#fastprevbtn").prop('disable',true)
        $("#prevbtn").prop('disable',true)
    }else if(totalPage === 1 && pagenumber === 1){
        pagenum = [totalPage]
        $("#fastnextbtn").prop('disable',true)
        $("#nextbtn").prop('disable',true)
        $("#fastprevbtn").prop('disable',true)
        $("#prevbtn").prop('disable',true)
    }else{
        pagenum = [(pagenumber+2),(pagenumber +1), pagenumber];
    }
    return pagenum; 
}

const paginationElements = (ele,data,page) => {
    
    let pagiEles = ele.childNodes;

    for(b=0; b < pagiEles.length; b++){
        if(pagiEles[b].getAttribute("id") === 'nextbtn'){
            paginationEvent(pagiEles[b],data.currentPage,page)
        } else if(pagiEles[b].getAttribute("id") === 'fastprevbtn'){
            if(data.currentPage > 1){
                paginationEvent(pagiEles[b],0,page)
            }
        }else if(pagiEles[b].getAttribute("id") === 'prevbtn'){
            if(data.currentPage > 1){
                paginationEvent(pagiEles[b],(data.currentPage-2),page)
            }
        }else if(pagiEles[b].getAttribute("id") === 'currentpage'){
            paginationEvent(pagiEles[b],data.currentPage-1,page)
        }else if( pagiEles[b].getAttribute("id") === (data.currentPage+1).toString()){
            paginationEvent(pagiEles[b],data.currentPage,page)
        }else if( pagiEles[b].getAttribute("id") === (data.currentPage+2).toString()){
            paginationEvent(pagiEles[b],data.currentPage+1,page)
        }else if( pagiEles[b].getAttribute("id") === 'fastnextbtn'){
            paginationEvent(pagiEles[b],data.totalPage-1,page)
        }
    }
}; 

const paginationEvent = (channel,data,page) => {
    
    channel.addEventListener('click', function (){
        const evData = {page:data}
            page.remove();
            
        // will check data exist here and if not will allow background to send data
                let PaginateStore = getKeyData(data)
                
                if(PaginateStore.length === 0 ){
                    sendToBackground('FetchData',evData);
                    injectShadow('loader');
                }else{
                    injectShadow(PaginateStore[0]);
                }

           
    })
}

const getKeyData = (pageNum) => {
    let storeKey = window.sessionStorage.getItem('myStore');
    if(storeKey === null){
        sendToBackground('FetchData',evData); 
    }else{
        const keyData = JSON.parse(storeKey);
        const calcPage = pageNum + 1;
        const filtStore = keyData.filter(key => key.currentPage === calcPage);
        return filtStore; 
    }
    
    // if data exists inject to shadow dom 

}

const clearLoader = () => {

    const loadEle = document.querySelectorAll("#keyword"); 
        for (let dom of loadEle){
            dom.remove(); 
        } 
}

const itemSelection = (eles,data,saveBtn) => {
    let selectedListed = JSON.parse(localStorage.getItem("list")|| "[]" ); 
    eles.forEach(ele => {       
        ele.addEventListener('change', function(){

                let selproduct = ele.value; 
               
                saveBtn.style.display = 'flex'; 

                if(!ele.checked && selectedListed.length > 0){
                    selectedListed = selectedListed.filter(item => item.title !== selproduct);
                    SaveToLocal('list', selectedListed)
                }else{
                    let result = data.find(({title}) => title === selproduct )
                    selectedListed.push(result); 
                    SaveToLocal('list', selectedListed)
                }
            
                if(selectedListed.length === 0){
                    saveBtn.style.display = 'none';
                    localStorage.removeItem('list');
                }

        })
            
    })


    
}

const SaveToLocal= (dataname, data)=> {
    localStorage.setItem(dataname,JSON.stringify(data)); 
}

const buttonCreation = (imgfile,btnText)=> {

    let BtnCreated = document.createElement('button');
     BtnCreated.setAttribute('class', 'headerbtn'); 
            let imgCreated= document.createElement('img');
            let wsattr = {
                "src":imgfile ,
                "alt": 'listicon',
                "class": "wsicon",
            }
            setAttr(imgCreated, wsattr);

            let headerText = document.createElement('span');
            headerText.textContent = btnText; 

            BtnCreated.appendChild(imgCreated);
            BtnCreated.appendChild(headerText);

        return BtnCreated; 
}

const getkeyDate = (data) => {
    let storeKey = window.sessionStorage.getItem('myStore');
    if( storeKey === null ){
        let myArr = [data]
        window.sessionStorage.setItem('myStore',JSON.stringify(myArr));
            
    }else{
        let keyBus = JSON.parse(storeKey);
        keyBus.push(data); 
        window.sessionStorage.setItem('myStore',JSON.stringify(keyBus));
    }

}

