const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer'); 



// controllers 


// router endpoint 
router.post("/orderhistory", (req,res)=> {

      const {link,product} = req.body;
      scrape (link ,product);
      
})


// automation with puppeteer
let scrape = async (link ,product)=> {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const baseUrl = link
    for(let i =0; i < product.length;i++){
        try {
            await page.goto(`https://www.jumia.com.ng/customer/order/detail/${product[i]}/ `);
            await page.setViewport({width: 1000, height: 500})
            
        
             }
             catch(err){}
    }

    browser.close()
    // return result;
}


module.exports = router;
