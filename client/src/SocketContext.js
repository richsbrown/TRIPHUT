import React, { createContext, useState, useRef, useEffect } from "react"
import { io } from "socket.io-client"
import Peer from "simple-peer"

const SocketContext = createContext()

const endPoint = "http://localhost:3001"
let socket

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState()
  const [me, setMe] = useState("")
  const [call, SetCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  const [name, setName] = useState("")
  const [connection, setConnection] = useState("")

  useEffect(() => {
    socket = io(endPoint)
  }, [endPoint])

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        myVideo.current.srcObject = currentStream
      })

    socket.on("me", (id) => {
      console.log(id)
      setMe(id)
    })

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      SetCall({ isRecievedCall: true, from, name: callerName, signal })
    })
  }, [])

  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on("signal", (data) => {
      socket.emit("ansercall", { signal: data, to: call.from })
      console.log(data, "data")
    })

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream
      console.log(userVideo.current.srcObjec)
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      })
      console.log(data)
    })

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true)
      console.log(signal)
      peer.signal(signal)
    })

    connectionRef.current = peer
    console.log(peer)
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()

    window.location.reload()
  }

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }
