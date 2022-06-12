const express=require("express")
const app=express()

const http=require("http")
const chatModel = require("./db/chat.model")
const server=http.createServer(app)
const io=require("socket.io")(server)
const {formatTime}=require("./db/times.ago.js")
require("./db/mongodb")

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/client/index.html")
})
let users=[]

const addUser=(data)=>{
    if(!users.some(user=>user.name===data.name)){
        users.push(data)
    }else{
        users.map(user=>{
            if(user.name===data.name){
                user.id=data.id
                user.status="online"
            }
        })
    }
}
const fetchUser=(name)=>{
    let receiver=null
    users.map(user=>{
        if(user.name==name){
            // return user
            // console.log(user)
            receiver=user
        }

    })
    return receiver
    // return users
}
const fetchSender=(id)=>{
    let receiver=null
    users.map(user=>{
        if(user.id==id){
            // return user
            // console.log(user)
            sender=user
        }

    })
    return sender
    // return users
}

const convertTime=(chats)=>{
    chats.map(chat=>{
        // console.log(chat)
        chat.timeAgo=formatTime(chat.timeStamp)
    })
    return chats
}

io.on("connection",(socket)=>{
    console.log("a user connected ")


    socket.emit("basic_emit","hello from server : Basic emit")

    socket.broadcast.emit("basic_broadcast","hello from server : Basic broadcast(someone has connected")

    socket.on("addUser",(data=>{
        data.id=socket.id
        data.status="online"
        addUser(data)
        // io.emit("addUser",data)
        // console.log(users)

        let onlineFriends=users.filter(user=>{
            return user.status=="online" 
        })
        
        io.emit("onlineFriend",onlineFriends)
    }))



    socket.on("sendMessage",(data)=>{
        console.log(data)
        const receiver=fetchUser(data.to.trim());
        const sender=fetchSender(socket.id)
        data.from=sender.name
        // console.log(receiver)
        // io.emit("receiveMessage",data)
        const chat=new chatModel({
            sender:data.from,
            receiver:data.to,
            message:data.message,
            timeStamp:new Date()
        })
        chat.save()
        chat.timeAgo=formatTime(chat.timeStamp)
        io.to(receiver.id).emit("receiveMessage",chat)
        
        // io.emit("sendMessage",data)
        io.to(socket.id).emit("sendMessage",chat)

        
      
    })
    socket.on("userChange",(user)=>{
        const receiver=fetchUser(user.name)
        const self=fetchSender(socket.id)
        chatModel.find({$or:[{sender:self.name,receiver:receiver.name},{sender:receiver.name,receiver:self.name}]},(err,chats)=>{
            if(err){
                console.log(err)
            }
            else{
                // console.log(chats)
                chats=convertTime(chats)
                io.to(socket.id).emit("receiveChats",chats)
            }
    })
    })
    socket.on("disconnect",()=>{
        console.log("a user disconnected")
        users.map(user=>{
            if(user.id===socket.id){
                user.status="offline"
            }
        })
        console.log(users)
    })

})
server.listen(4100,(err)=>{
    if(err) console.log(err)
    console.log("Server is running on : ",4100)
})