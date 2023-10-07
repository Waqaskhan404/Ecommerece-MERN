const app=require("./app");

const dotenv=require("dotenv");
const connectDatabase=require("./config/dataBase")

// Handling Uncaught exceptions 

process.on("uncaughtException",err=>{
    console.log(`Error :${err}`);
    console.log("Shutting down the server due to Unhandled Promise Rejections");
    process.exit(1);
})



// config file

dotenv.config({path:"Backend/config/config.env"});

// Connection of Database 
connectDatabase();




const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  http://localhost:${process.env.PORT} `)
});


// Unhandled Promise Rejections
process.on("unhandledRejection",err=>{
    console.log(`Error :${err}`);
    console.log("Shutting down the server due to Unhandled Promise Rejections");

    server.close();
    process.exit(1);
})