const mongoose=require("mongoose");
var loginSchema=new mongoose.Schema({
    Email:{
        type:String,
        required:"Required"
    },
    Password:{
        type:String,
        required:"required"
    },
    Id:{
        type:String,
        required:"Required"
    }
});
mongoose.model("login",loginSchema);