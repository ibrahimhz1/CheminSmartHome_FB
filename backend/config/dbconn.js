const mongoose = require('mongoose');

const connectDatabase = ()=> {
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://127.0.0.1:27017/Chemin')
    .then((data)=>{
        console.log(`mongodb connected to server : ${data.connection.host}`);
    });
}
module.exports =  connectDatabase;