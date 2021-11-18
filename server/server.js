const express = require("express")
const cors = require("cors")
const PORT = 3001
const app = express()
const server = require("http").createServer(app)
const authRouter = require("./Routes/auth")
const tripRouter = require("./Routes/trip")
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(authRouter)
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

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})

module.exports = app;