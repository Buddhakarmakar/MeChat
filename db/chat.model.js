const mongoose=require("mongoose")

const chatSchema=new mongoose.Schema({
    sender:{
        type:String,
    },
    receiver:{
        type:String,
    }
    ,
    message:{
        type:String,
    },
    timeStamp:{
        type:Date,
    },
    timeAgo:{
        type:String,
    }
})
module.exports=mongoose.model("Chat",chatSchema)
