const express = require ('express'), 
    morgan = require ('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require ('cors');
    const product = require("./routes/product")


    
    require('dotenv').config(); 
    const app = express(); 
    const db = require('./config/db.config')

    mongoose
            .connect(db.url, {useUnifiedTopology: true ,useCreateIndex:true,useFindAndModify:false,useNewUrlParser: true})
            .then(()=> console.log("DB Connected"))
            .catch(err=> {
                console.log(err)
            })

    app.use(morgan('dev'));
    app.use(bodyParser.json({limit:'200mb',extended:true}));
    app.use(bodyParser.urlencoded({limit:'200mb', extended:true}));

    app.use(cors({origin:"*"}));

    app.use("/product", product);


    
    const port = process.env.NODE_DOCKER_PORT || 8000;

    
    app.listen(port,()=> {
        console.log(`server listening at port ${port}`)
    })
