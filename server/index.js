const express = require ('express'), 
    morgan = require ('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require ('cors');
    const user = require("./routes/user");

    

    require('dotenv').config(); 

    const app = express(); 

    mongoose
            .connect(process.env.DEV_DB, {useUnifiedTopology: true ,useCreateIndex:true,useFindAndModify:false,useNewUrlParser: true})
            .then(()=> console.log("DB Connected"))
            .catch(err=> {
                console.log(err)
            })

    app.use(morgan('dev'));
    app.use(bodyParser.json({limit:'200mb',extended:true}));
    app.use(bodyParser.urlencoded({limit:'200mb', extended:true}));

    app.use(cors({ origin:"*" }));

    app.use("/user", user);


    app.post('/save-product',(req,res)=> {
        console.log(res.body)
        res.send('all good')
    })


    const port = process.env.PORT || 8000;
    
    app.listen(port, ()=> {
        console.log(`server listening at port ${port}`)
    })
