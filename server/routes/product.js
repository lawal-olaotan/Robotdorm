const express = require('express');
const router = express.Router();
const bluebird = require('bluebird'); 
const {withBrowser,withPage} = require('../helpers/product'); 
const { saveData } = require('../controllers/product'); 



router.post("/searchScrapper", 
    async (req,res)=> {
        const data = req.body;
        try{
            await searchPage(data);
            res.status(200).send('data saved successfull');
        } catch (err){
            console.log(err.message);
            res.status(500).send("data not saved")
        }
    }
);


const searchPage = async(data) => {
    const urls = data.searchLink; 
    const keyword = data.keyWord 
    let searchProducts = [];
        await withBrowser(async(browser)=> {

            await bluebird.map(urls,async (url) => {

                await withPage (browser)(async (page) => {

                    await page.setRequestInterception(true);
                        // initializing request interceptor 
                    await page.on('request', request=> {
                        // if the page makes request to a image and stylesheet 
                        if(request.resourceType() === 'image' || request.resourceType() === 'stylesheet' || request.resourceType() === 'eventsource' || request.resourceType() === 'script' || request.resourceType() === 'font'){
                            request.abort()
                        }else{
                            request.continue()
                        }
                    })
                    await page.solveRecaptchas();

                    await page.goto(url);

                    if(await page.$('.-paxs.row._no-g._4cl-3cm-shs')){
                            let otherdata = await getProducts(page); 
                            searchProducts.push(otherdata); 
                    }else{
                            console.log('cannot load website')
                    }
                       
                })

            },{concurrency:6});  
        });

    let  searchedProducts  = Array.prototype.concat.apply([],searchProducts);
    let topProd = (searchedProducts.sort((a,b)=> b.customer - a.customer ))
    // .splice(0,30);
    // console.log(topProd);
    saveData(topProd,data._id,keyword);
    
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
                       let salesPrice;
                       
                       let sales = (customer * 15)
                       if(price !== ''){
                        let priceNum = price.split(' ');
                        if(priceNum.length > 2){
                            salesPrice = (parseInt(priceNum[1].replace(/,/g, '')) + parseInt(priceNum[4].replace(/,/g, '')))/2
                        }else{
                             salesPrice = parseInt(priceNum[1].replace(/,/g, ''))
                        }
                       }
                       
                       let revenue = (salesPrice*sales).toLocaleString();
                        let products = {
                            title : title,
                            img : img,
                            link:link,
                            price:price,
                            sales:sales,
                            revenue:'₦'+' '+revenue,
                            ratings:rating,
                            customer:customer,
                            mode:mode,
                            shipping: shipping
                        }
                        productArray.push(products)
        })

        let newProd = productArray.filter(item => item.customer !== 'no customer review')
        return newProd; 
    })

    return data; 
    
}; 


module.exports = router;
