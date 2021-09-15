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



// router endpoint 
router.post("/orderhistory",
    async (req,res)=> {  
        const {link,product} = req.body;
        try{
            await login(product)
            // res.status(200).send('data successfull');
        } catch (err){
            console.log(err.message);
            res.status(500).send("couldn't get url and products")
        }
    }
);






const login = async (product) => {
    let stats;
    const browser = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',defaultViewport:null,slowMo:10,headless:false})
    const page = await browser.newPage();

    await page.goto('https://www.jumia.com.ng/customer/account/login/?return=%2F', {
        waitUntil:'networkidle0'
    });

    if(await page.$('#authForm')){
        await page.type('#fi-email','olaotan104@gmail.com')
        await page.type('#fi-password','Queens1995');
        await page.click('#authForm > button');

        if(await page.$$('#rc-imageselect')){
            console.log('solve me');
            await page.solveRecaptchas();
        }

        if(await page.$$('#cf-wrapper')){
            console.log('sec captha')
            await page.solveRecaptchas();
        }

        // await page.waitForNavigation({waitUntil:'load'});

        stats = await page.$eval('#jm > header > section > div > div.col.-df.-j-bet.-m.-phn.-i-ctr > div:nth-child(1) > label', content => content.textContent); 
        if(stats !== 'Account'){
            await scrape(product,browser)
        } 
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
            // await page.waitFor(3000);

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
saveData(conProducts);
};



module.exports = router;
