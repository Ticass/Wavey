const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require('body-parser');
const server = http.createServer(app);
app.use(bodyParser.json());
const io = require("socket.io")(server, {
  });


  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("Disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });


  app.post('/notify', (req, res) => {
    const message = req.body.message;
    console.log(message);
    io.emit(message);
    res.sendStatus(200);
  });

  server.listen(3001, () => {
    console.log("SERVER STARTED");
  });

