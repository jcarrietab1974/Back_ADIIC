const mongoose = require("mongoose");

const conectarDB = async () => {

    try{
       const connection = await mongoose.connect(
        //"mongodb+srv://RichardPardo:9737854@cluster0.w5ubywx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        "mongodb+srv://jcarrietab:Jc7rie4tab@cluster0.uxoyy2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
            UseNewUrlParser: true,
            useUnifiedTopology: true,
        });
           const url =`${connection.connection.host}:${connection.connection.port}`;
           console.log(`MongoDB conectado en :${url}`);
       
    }catch(error){
      console.log(`error:${error.message}`);
      process.exit(1);
    }
};
module.exports = conectarDB;