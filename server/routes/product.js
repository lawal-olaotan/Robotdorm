const express = require('express');
const router = express.Router();
const { saveData,getData,saveList } = require('../controllers/product'); 


router.post("/searchScrapper",saveData);
router.get("/getProducts",getData);
router.post("/list",saveList)

module.exports = router;
