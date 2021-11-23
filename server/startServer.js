import { Request, Response } from 'express';
import http from 'http';
const express = require('express');
const cors = require('cors');
const router = require('./router.ts');

const bootServer = (port) => {
  const app = express();
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })
  const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(userRouter)
  app.use(tripRouter)
  
  io.on("connection", (socket) => {
    socket.emit("me", socket.id)
    console.log(socket.id)
  
    socket.on("disconnect", () => {
      socket.broadcast.emit("callended")
    })
  
    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("calluser", { signal: signalData, from, name })
    })
  
    socket.on("ansercall", (data) => {
      io.to(data.to).emit("callaccepted", data.signal)
    })
  })
  
    .get('/', (_, res) => {
      res.status(200).send('Hello, stranger!');
    })
    .get('*', (_, res) => {
      res.status(404).send('Sorry, not found 😞');
    });

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });

  return server;
};

module.exports = {
  bootServer,
};