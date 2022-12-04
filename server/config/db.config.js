require('dotenv').config(); 

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
  } = process.env;
  

module.exports = {
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@extension.8cnx3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
};


 