const express = require ('express'), 
    morgan = require ('morgan'),
    bodyParser = require('body-parser'),
    cors = require ('cors');

    require('dotenv').config(); 

    const app = express(); 

    app.use(morgan('dev'));
    app.use(bodyParser.json({limit:'200mb',extended:true}));
    app.use(bodyParser.urlencoded({limit:'200mb', extended:true}));

    app.use(cors({ origin:"*" })); 


    const port = process.env.PORT || 8000;
    
    app.listen(port, ()=> {
        console.log(`server listening at port ${port}`)
    })
