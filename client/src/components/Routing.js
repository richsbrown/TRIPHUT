import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  set_islogged,
  unset_islogged,
  set_loggedUser,
  unset_loggedUser,
} from "../Redux/Actions/action"
import { Route, Routes } from "react-router-dom"
import Login from "../components/Screens/login"
import Signup from "../components/Screens/signup"
import Home from "../components/Screens/Home"
import CreateTrip from "../components/Screens/createTrip"
import Profile from "../components/Screens/profile"
import EditProfile from "../components/subcomponents/editprofile"
import ProfilePhoto from "../components/subcomponents/profilePhoto"
import TripPage from "../components/Screens/tripPage"
import AddPhoto from "../components/subcomponents/addPhoto"
import Followers from "./Screens/Followers"
import Following from "./Screens/following"
import VideoChat from "./Screens/videoChatApp"
import APIService from "../apiService"

const Routing = () => {
  const [token] = useState(localStorage.getItem("jwt"))
  const isAuth = useSelector((state) => state.isLogged)
  const isUpdate = useSelector((state) => state.isUpdate)
  const dispatch = useDispatch()

  useEffect(() => {
    //using unstable batch updates so that the setstate functions dont trigger useEffect again and again
    ReactDOM.unstable_batchedUpdates(() => {
      APIService.authenticate(token)
        .then((data) => {
          if (data.isLogged) {
            // setting user data to set_isloggedUser state
            dispatch(set_loggedUser(data.user))
            // setting state to true for isLogged state using set_islogged action dispatch
            dispatch(set_islogged())
          }
          if (data.error) {
            // unset the states to false or null
            dispatch(unset_loggedUser())
            dispatch(unset_islogged())
          }
        })
        .catch((er) => console.log(er))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  return (
    <Routes>
      {isAuth && <Route exact path="/video" element={<VideoChat />} />}
      {isAuth && <Route exact path="/photos/:postId" element={<AddPhoto />} />}
      {isAuth && <Route exact path="/posts/:postId" element={<TripPage />} />}

      {isAuth && (
        <Route exact path="/updateProfilePhoto" element={<ProfilePhoto />} />
      )}
      {isAuth && <Route exact path="/profile/edit" element={<EditProfile />} />}
      {isAuth && <Route exact path="/user/:username" element={<Profile />} />}
      
      {/* NEW ROUTES FOR FOLLOWERS & FOLLOWING PAGES */}
      {isAuth && <Route exact path="/user/:username/followers" element={<Followers />} />}
      {isAuth && <Route exact path="/user/:username/following" element={<Following />} />}

      {isAuth && <Route exact path="/" element={<Home />} />}
      {isAuth && <Route exact path="/createtrip" element={<CreateTrip />} />}
      {!isAuth && <Route exact path="/signup" element={<Signup />} />}
      {!isAuth && <Route exact path="/" element={<Login />} />}
    </Routes>
  )
}

export default Routing
