const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const saveData = require('../controllers/product'); 



const apiKey = '4601b5f10c47ad8454b4f94a654d3784'


puppeteer.use(StealthPlugin())

puppeteer.use(
    RecaptchaPlugin({
      provider: { id:'2captcha',token:apiKey},
      visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
); 


// controllers 
let id; 


// router endpoint 
router.post("/orderhistory",
    async (req,res)=> {  
        const {_id,link,product} = req.body;
        id = _id;
        console.log(id);
        try{
            await login(product)
            res.status(200).send('data saved successfull');
        } catch (err){
            console.log(err.message);
            res.status(500).send("couldn't get url and products")
        }
    }
);

router.post("/searchScrapper", 
    async (req,res)=> {
        const data = req.body;
        try{
            console.time('scrapping');
            await searchPage(data);
            res.status(200).send('data saved successfull');
            console.timeEnd('scrapping');
        } catch (err){
            console.log(err.message);
            res.status(500).send("couldn't get url and products")
        }
    }
); 


const searchPage = async(data) => {

    const browser = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true})
    const [page] = await browser.pages();
    let searchProducts = []

    try {

        await page.goto(data.searchLink, {
            waitUntil:'networkidle0'
        });
    
        await page.solveRecaptchas();
        
        if(await page.$('.-pvs.col12')){
            let firstpage = await getProducts(page); 
            console.log(firstpage.length);
            searchProducts.push(firstpage);
            console.log('first page scrapped');
        }else{
            console.log('cannot load website')
        }

    }catch(err){
        if (err instanceof puppeteer.errors.TimeoutError){
            console.log(puppeteer.errors);
        }
    }

   
    for(let i =2; i <= 50; i++){
        try{

            let searchlinks = `${data.searchLink}&page=${[i]}#catalog-listing`;
            await page.goto(searchlinks);

            if(await page.$('.-pvs.col12')){
                let otherdata = await getProducts(page); 
                searchProducts.push(otherdata); 
            }else{
                console.log('cannot load website')
            }
    
            
        }
        catch(err){
            if (err instanceof puppeteer.errors.TimeoutError){
                console.log(puppeteer.errors);
            }
        }
    }

    await browser.close();
    let  searchedProducts  = Array.prototype.concat.apply([],searchProducts);
    console.log(searchedProducts.length);
}


const getProducts = async(page) => {

    const data = await page.evaluate(()=> {

        const products = document.querySelectorAll('article.prd._fb.col.c-prd');
        const productArray = []

        products.forEach(product => {

                        const container = product.childNodes[0]
                        const link = container.href
                        const title = container.querySelector('.name').innerHTML;
                        const img = container.childNodes[0].childNodes[0].dataset.src
                        const productInfo = container.childNodes[1];
                       
                        const price = productInfo.querySelector('.prc').innerHTML;
                        
                        const modeEle = productInfo.querySelector('.tag._glb._sm');
                        let mode; 
                        if(modeEle === null){
                            mode = 'Local Shipper'
                        }else{
                            mode = modeEle.innerHTML;
                        }
                        const ratingEle = productInfo.querySelector('.rev');
                        let rating;
                        let customer;

                        if(ratingEle === null ){
                            rating = 'no rating';
                            customer = 'no customer review'
                        }else{
                            rating = parseFloat(ratingEle.childNodes[0].innerText.split(' ')[0]);
                            let customerArry = ratingEle.textContent.split(' ')[3].split('');
                            customerArry.shift()
                            customer = parseInt(customerArry.join('').replace(/\D/g,''));
                            
                        }
                                                                                                                                         
                        let shipping;
                       if(productInfo.querySelector('.shipp') !== null){
                            shipping = 'Jumia Express'
                       }else{
                           shipping = 'Local Inventory'
                       }
                     
                        
                        let products = {
                            title : title,
                            img : img,
                            link:link,
                            price:price,
                            ratings:rating,
                            customer:customer,
                            mode:mode,
                            shipping: shipping
                        }
                        productArray.push(products)
        })

        return productArray

    })

    return data; 
    
}; 


const login = async (product) => {
    const browser = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',defaultViewport:null,slowMo:10,headless:false})
    const page = await browser.newPage();

    await page.goto('https://www.jumia.com.ng/customer/account/login/?return=%2F', {
        waitUntil:'networkidle0'
    });

    if(await page.$('#authForm')){

        await page.type('#fi-email','olaotan104@gmail.com')
        await page.type('#fi-password','Queens1995');
        await page.click('#authForm > button');

        await page.waitForNavigation({waitUntil:'load',timeout:0});

        if(await page.$$('#cf-wrapper')){
            console.log('sec captha')
            await page.solveRecaptchas();
        }
    
    
        if(await page.$$('#rc-imageselect')){
            console.log('solve me');
            await page.solveRecaptchas();
        }

       


    }

    

        let stats = await page.$eval('#jm > header > section > div > div.col.-df.-j-bet.-m.-phn.-i-ctr > div:nth-child(1) > label', content => content.textContent);
        console.log(stats);

        if(stats !== 'Account'){
            await page.waitFor(3000);
            await scrape(product,browser)
        } 

     
}

// automation with puppeteer
async function scrape (product,browser){

    const [page] = await browser.pages(); 
    let results = [];
    
    for(let i =0; i < product.length;i++){

        try {
            const url = (`https://www.jumia.com.ng/customer/order/detail/${product[i]}/`);
            await page.goto(url);

            let data = await page.evaluate(()=> {

                let items = document.querySelectorAll('article.-pvs');
                let presults = []
            
                 items.forEach((item)=> {

                    const container = item.childNodes[0].childNodes[0];
                    const headers =  container.childNodes[0].childNodes[0].childNodes[0].innerHTML;
        
                    if (headers === 'Delivered'){
                        const deliveryDate =  container.childNodes[0].childNodes[1].textContent.split(' ')[1];
                        const contentBox = container.childNodes[1];
                        const imgUrl = contentBox.childNodes[0].childNodes[0].dataset.src;
                        const title = contentBox.childNodes[1].childNodes[0].innerHTML;
                        const qty = contentBox.childNodes[1].childNodes[1].childNodes[0].textContent.split(' ')[1];
                        const price = contentBox.childNodes[1].childNodes[2].childNodes[0].innerHTML
                    
                         let object = {

                            title : title,
                            image: imgUrl,
                            qty: qty,
                            price: price,
                            deliveryDate : deliveryDate,
                        }

                         presults.push(object)

                    }

                })

                return presults;
            });

            results.push(data);
            
        }
         catch(err){
                 if (err instanceof puppeteer.errors.TimeoutError){
                     console.log(puppeteer.errors);
                 }
        }
    }

    await browser.close();
    let  conProducts = Array.prototype.concat.apply([],results);
    saveData(conProducts,id);
};



module.exports = router;
