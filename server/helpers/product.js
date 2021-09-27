const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const {args} = require('../helpers/browsersargs'); 


puppeteer.use(StealthPlugin()); 

puppeteer.use(
    RecaptchaPlugin({
    provider: { id:'2captcha',token:process.env.API_KEY},
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
); 

exports.withBrowser = async ( fn )=> {

    const browser = await puppeteer.launch({headless:true});
    try{
        return await fn(browser)
    }finally{
        await browser.close(); 
    }
}



exports.withPage = (browser) => async (fn) => {
    const page = await browser.newPage();
    
    try{
        return await fn(page);
    } finally{
        await page.close()
    }
}


