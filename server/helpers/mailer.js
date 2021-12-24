const nodemailer = require("nodemailer");
const handlebars = require('handlebars'); 
const {readHtmlFile} = require('./filereader'); 


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'robotdorm@gmail.com',
    pass: 'fctpynulycwdtbnm',
  },

})


exports.sendEmail = (useremail,username) => {

  readHtmlFile(__dirname +'/index.html', function(err,html){

    let template = handlebars.compile(html);

    let replacement = {
        username:username
    };

    let htmlToSend = template(replacement)

    transporter.sendMail({
        from:'"Robotdorm" <robotdorm@gmail.com>',
        to:useremail,
        subject:"Welcome to Robotdorm ",
        html: htmlToSend
    }).then((info) => {
        console.log(info);
    }).catch(console.error)
    
  
  })

};

exports.emailtransport = async() => { return transporter.verify().then(console.log('verified')).catch(console.error)};

