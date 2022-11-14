require('dotenv').config(); 

const {
    DB_PORT,
    DB_HOST, 
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
  } = process.env;
  

module.exports = {
  url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
};


 