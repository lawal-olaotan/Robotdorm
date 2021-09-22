const puppeteer = require('puppeteer-extra');


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


