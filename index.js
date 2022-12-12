const express = require("express");
const app = express(); 
const cors  = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const groupRoute = require("./routes/group.routes");
const friendRoute = require("./routes/friend.routes");
const requestFriend = require("./routes/resquestFriend.routes");
const messageGroup = require("./routes/messagesGroup.routes");
const socket = require("socket.io");

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoute);
app.use("/api/group", groupRoute);
app.use("/api/friend", friendRoute);
app.use("/api/requestfriend", requestFriend);
app.use("/api/messagegroup", messageGroup);
//mongoose connection
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    }).then(() => {
        console.log("DB Connection Successful!")
    }).catch((err) => console.log(err));

 const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
});


const io = socket(server,{
    cors: {
        origin: "https://chatloveu.netlify.app/",
        credentials: true,
    },
});
//store all online users inside this map
global.onlineUsers =  new Map();
 
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieved",data);
        }
    });

    
    socket.on("join-room", (room) => {
        console.log(room);
        socket.join(room);
    })

    socket.on("send-msg-group",(data)=>{
        //console.log(data);
        // var mess = {};
        // mess.message = {
        //     text : data.message
        // }
        // mess.group = data.to;
        // mess.sender = {
        //     username : data.username,
        //     avatarImage : data.avatarImage
        // }
        // mess.from = data.from;
        io.sockets.in(data.to).emit("msg-group-revieced", data);
    });
});
