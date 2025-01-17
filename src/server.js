import http from "http";
import SocketIO from "socket.io";
import express from 'express';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); 
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);
    console.log(socket.id);
    console.log(socket.rooms);    
    socket.join(roomName);//채팅룸에 접속    
    console.log(socket.rooms);
    done();
    }
  );
});

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);

