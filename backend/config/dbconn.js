const mongoose = require('mongoose');

const connectDatabase = ()=> {
    mongoose.set('strictQuery', false);
   return mongoose.connect(process.env.DB_URI);
}
module.exports =  connectDatabase;