const mongoose = require("mongoose"); 

const connect = () => {
   mongoose.connect("mongodb://localhost:27017/board").catch((err)=>{
       console.error(err);
   }); 
};

module.exports = connect; 
