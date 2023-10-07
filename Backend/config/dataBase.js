const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndexes: true, No longer supported 
    })
    .then((data) => {
      console.log(`MongoDb Connected with server: ${data.connection.host}`);
    })
    // Don't need to write catch because we handle it in Unhandled Promise Rejection in server.js
    // If we remove the catch from here it is now unhandled if we use catch it is automatically handled
    // .catch((err) => {
    //   console.log(err);
    // });
};

module.exports = connectDatabase;
