const express = require('express');
const router = express.Router();
const { saveData,getData } = require('../controllers/product'); 


router.post("/searchScrapper",saveData);

router.get("/getProducts/:queryData",getData)

module.exports = router;
