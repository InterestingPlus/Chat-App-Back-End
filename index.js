const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");
const socket = require("socket.io");

const hostname = "0.0.0.0";

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/mssges", messagesRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DataBase Connected Successfully");
  })
  .catch((err) => {
    console.log(err.massage);
  });

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const server = app.listen(process.env.PORT, hostname, () => {
  console.log(`✅Server Started on https://localhost:${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: "https://mern-stack-chat-app-jatin.netlify.app/",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
