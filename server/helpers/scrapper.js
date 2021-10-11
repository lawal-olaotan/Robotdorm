const bluebird = require('bluebird'); 
const {withBrowser,withPage} = require('../helpers/product'); 


exports.searchPage = async(data) => {
    const urls = data.searchLink; 
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
    let topProd = searchedProducts.sort((a,b)=> b.customer - a.customer );
    return topProd; 
};


const getProducts = async(page) => {
    const data = await page.evaluate(()=> {
        const products = document.querySelectorAll('article.prd._fb.col.c-prd');
        const productArray = []; 
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
                            rating = 0
                            customer = 0
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
                       
                       let sales = (customer * 11)
                       if(price !== ''){
                        let priceNum = price.split(' ');
                        if(priceNum.length > 2){
                            salesPrice = (parseInt(priceNum[1].replace(/,/g, '')) + parseInt(priceNum[4].replace(/,/g, '')))/2
                        }else{
                             salesPrice = parseInt(priceNum[1].replace(/,/g, ''))
                        }
                       }

                       let revenueNum = (salesPrice*sales); 
                       let revenue = revenueNum.toLocaleString();
                        let products = {
                            title : title,
                            img : img,
                            link:link,
                            price:price,
                            sales:sales,
                            revenue:'₦'+' '+revenue,
                            revenueNum:revenueNum,
                            salesPrice:salesPrice,
                            ratings:rating,
                            customer:customer,
                            mode:mode,
                            shipping:shipping
                        }
                        productArray.push(products)
        });

        let newProd = productArray.filter(item => item.customer !== 0);
        const valueSet = new Set(); 
        const noDup = newProd.filter( (obj) => {
            const dupValue = valueSet.has(obj.title); 
            valueSet.add(obj.title); 
            return !dupValue; 
        }); 
        return noDup; 
    })

    return data; 
    
}; 



