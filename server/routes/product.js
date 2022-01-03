const express = require('express');
const authList = require("../middleware/auth");
const router = express.Router();
const { saveData,getData,saveList } = require('../controllers/product'); 


router.post("/searchScrapper",saveData);
router.get("/getProducts",getData);
router.post("/list",saveList);
// router.post("/getList",authList,getLists)

module.exports = router;
