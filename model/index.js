const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/login_credentials", { useNewUrlParser: true },function(error){
    if(!error){
        console.log("conncted to database");
    }
        else console.log("error connecting to database");
    
});

const Course=require("./loginschema");