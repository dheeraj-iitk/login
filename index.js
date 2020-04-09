const connection=require("./model");
var express =require('express');
var path =require('path');
var bodyParser =require('body-parser');
const app=express();
app.use(bodyParser.json());

var mongoose=require("mongoose");
app.use(bodyParser.urlencoded({extended:true}));


const LoginModel=mongoose.model("login");

var signup= new LoginModel;

app.set("view engine","jade");
app.set('views',path.join(__dirname,"./views/layout"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",function(req,res){
    res.render("index",{title:"LOGIN"});
   });

app.post("/signup",function(req,res){
    LoginModel.find({Email:req.body.Email,Password:req.body.Password})
    .then((data)=>{ 
        if(data.toString().length!=0)
        res.render("yellow",{message : "account already exist"});
       else { signup.Email=req.body.Email;
        signup.Password=req.body.Password;
        signup.Id=Math.random();
        signup.save(function(err,docs){
            if(!err){
                res.render("success",{message : "YOU ARE SIGNED IN!!!!"});
            }
            else{
                res.render("alert");
            }
        });}
       
     })
    .catch((err)=>{
      console.log(err);
    })
   });  
   
   app.post('/view_account',function(req,res){
    LoginModel.find({Email:req.body.Email,Password:req.body.Password},function(err,data){
        if(data){
            if(data.toString().length!=0)
            res.send(data.toString()); 
            else 
            res.render("yellow",{message : "Account doenst exist"});
        }
            else{
                console.log(err);
            }
    })
});


app.post('/delete_account',function(req,res){
    LoginModel.find({Email:req.body.Email,Password:req.body.Password})
    .then((data)=>{
        if(data.toString()!=0){
       LoginModel.remove({Email:req.body.Email,Password:req.body.Password},function(err){
           if(!err){
               res.send("account deleted successfully");
           }
           else {res.render("alert");}
       });

    }
    else{
        res.render("yellow",{message : "account doesnt exist"}); 
    }
     })
    .catch((err)=>{
      console.log(err);
    })
    
}); 

app.post("/update_account",function(req,res){
    LoginModel.update({Id:req.body.Id,Email:req.body.Email},{$set:{Email:req.body.Email,Password:req.body.Password}},{multi:true})
    .then((docs)=>{
      if(docs) {
          if(docs.n==0)  {res.render("yellow",{message : "no account exist"}); res.render("no account exist");}
           else {res.render("success",{message : "ACCOUNT UPDATED SUCCESSFULLY"});}
      } else {
        res.render("alert");
      }
   }).catch((err)=>{
      reject(err);
  })
});

app.get("/list",function(req,res){
    LoginModel.find(function(err,docs){
        if(!err){
            
            res.render("list",{"list" : docs});
        }
        else{
            res.render("alert");
        }
    });

});





app.listen("3000",function(err){
    console.log("server started");
    });
