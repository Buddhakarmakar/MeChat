const socket = io();

  socket.on("basic_emit",(msg)=>{
      console.log(msg);
  })
  socket.on("basic_broadcast",(msg)=>{
      console.log(msg);
  })

  socket.emit("addUser",{
      name:"Jhon",

  })
