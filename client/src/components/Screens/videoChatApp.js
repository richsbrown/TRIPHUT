import React from "react"
import { Typography, AppBar } from "@material-ui/core"
import VideoPlayer from "../subcomponents/VideoPlayer"
import Notifications from "../subcomponents/notification"
import Option from "../subcomponents/options"
import { makeStyles } from "@material-ui/core"
import { ContextProvider } from "../../SocketContext"

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}))

const VideoChat = () => {
  const classes = useStyles()
  return (
    <ContextProvider>
      <div className={classes.wrapper}>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography variant="h2" align="center">
            Video Chat
          </Typography>
        </AppBar>
        <VideoPlayer />
        <Option>
          <Notifications />
        </Option>
      </div>
    </ContextProvider>
  )
}

export default VideoChat
