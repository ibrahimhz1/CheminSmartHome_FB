const app = require('./app');
const dotenv = require('dotenv');

// Handling Uncaught Exception -- Eg: error occur due to calling undefined variables,functions, etc 
process.on("uncaughtException", (err)=> {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Uncaught Exception`);
    process.exit(1);
});

// dotenv config
dotenv.config({path: "backend/config/config.env"});

const connectDatabase = require('./config/dbconn');

let server = null;

// Database Connection
// Then Server Listens otherwise throws error
connectDatabase().then(()=>{
    server = app.listen(process.env.PORT, ()=> {
        console.log(`Server listening on http://localhost:${process.env.PORT || port}`);
    })
}).catch(err=>{
    console.log(err);
});



// Unhandled Promise Rejection Error Handling -- Eg: Invalid Credentials: such as (Invalid DB connection String), etc... 
process.on("unhandledRejection", (err)=> {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`)
    if(server){
        server.close(()=> {
            process.exit(1)
        })
    }
});