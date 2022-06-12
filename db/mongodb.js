const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost/playground",
{useNewUrlParser:true},(errr)=>{
    if(errr){
        console.log(errr)
    }
    else{
        console.log("connected to mongodb")
    }
})

