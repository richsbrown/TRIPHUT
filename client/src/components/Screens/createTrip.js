import React, { useState, useEffect } from "react"
import M from "materialize-css"
import { useSelector, useDispatch } from "react-redux"
import { update_hPosts } from "../../Redux/Actions/action"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { storage } from "../../firebase/index"
import APIService from '../../apiService'
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"

const CreateTrip = () => {
  const isAuth = useSelector((state) => state.isLogged)
  const dispatch = useDispatch()
  const [trip, setTrip] = useState({
    file: null,
    title: "",
    description: "",
    url: "",
  })

  const [send, setSend] = useState(false)
  const [imgUrl, seturl] = useState("")
  const { file, description, title, url } = trip
  const [crop, setCrop] = useState({ x: 0, y: 30, width: 100 })


  const onChangeHandler = (event) => {
    if (event.target.name === "description") {
      const description = event.target.value
      setTrip((prevState) => {
        return { ...prevState, description }
      })
    } else if (event.target.name === "title") {
      const title = event.target.value
      setTrip((prevState) => {
        return { ...prevState, title }
      })
    } else {
      if (event.target.files[0]) {
        const uri = event.target.files[0]
        const file = URL.createObjectURL(uri)
        setTrip((prevState) => {
          return { ...prevState, file: file, url: uri }
        })
      } else {
        setTrip({ title: "", description: "", url: "", file: null })
      }
    }
  }

  const handleForm = (event) => {
    event.preventDefault()
    //const file = getCroppedImage(image, crop)
    const name = trip.url.name.replace(".", "")
    console.log(trip.url, "From TripSide")
    const storageRef = ref(storage, `images/${name}`)
    const upBytes = uploadBytesResumable(storageRef, trip.url)
    upBytes.on(
      "state_changed",
      (snapshot) => {
        console.log("Hello")
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(upBytes.snapshot.ref).then((url) => {
          seturl(url)
          setTrip((prev) => {
            return { ...prev, url: url }
          })
          setSend((prev) => !prev)
        })
      }
    )
  }

  useEffect(() => {

    async function sendTrip (url, description, title) {
      const result = await APIService.CreateTrip(url, description, title)
      return result;
    }

    if (send) {
      const result = sendTrip(url, description, title)
        dispatch(update_hPosts(result.post))
        if (result.error) {
          M.toast({ html: result.error, classes: "red darken-1" })
        } else {
          setTrip({ title: "", description: "", url: "", file: null })
          setSend((prev) => !prev)
          M.toast({ html: result.message, classes: "blue darken-1" })
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send, imgUrl])

  return (
    <>
      {
        // here only shows the form and image data based on file selected..
        isAuth &&
          (file ? ( // display the selected image file and form to home screen
            <form
              method="post"
              className="card-home card"
              onSubmit={handleForm}
            >
              <i
                onClick={() =>
                  setTrip({
                    description: "",
                    url: "",
                    file: null,
                    travelDate: null,
                  })
                }
                className="material-icons black-text"
              >
                cancel
              </i>
              <div>
                <ReactCrop
                  width="100%"
                  src={file}
                  crop={crop}
                  keepSelection="true"
                  onChange={setCrop}
                />
              </div>
              <label htmlFor="file-input">
                {/* <img src={file} alt="img"  /> */}
              </label>
              <input
                style={{ display: "none" }}
                id="file-input"
                type="file"
                accept="image/png, image/jpeg"
                files={file}
                onChange={onChangeHandler}
              />
              <div className="post-top-part post-comments">
                <input
                  required={true}
                  style={{ marginLeft: "1rem" }}
                  value={title}
                  onChange={onChangeHandler}
                  autoFocus="on"
                  className="comment-add"
                  autoComplete="off"
                  type="text"
                  name="title"
                  id="input_text"
                  maxLength="20"
                  placeholder="Add a title"
                />
                <br />
                <input
                  required={true}
                  style={{ marginLeft: "1rem" }}
                  value={description}
                  onChange={onChangeHandler}
                  autoFocus="on"
                  className="comment-add"
                  autoComplete="off"
                  type="text"
                  name="description"
                  id="input_text"
                  maxLength="100"
                  placeholder="Add a description"
                />
                <button
                  style={{ marginTop: "-0.5rem" }}
                  className="blue white-text darken-1 post-comment-username"
                >
                  {" "}
                  Post{" "}
                </button>
              </div>
            </form>
          ) : (
            // else display the floating button to add new post..
            <div>
              <label htmlFor="file-input">
                <div
                  style={{
                    display: "absolute",
                    position: "fixed",
                    zIndex: 8,
                    //bottom: -50,
                    right: -75, // CHANGED 
                  }}
                >
                  <span className="btn-floating btn-large black"> 
                    <i className="material-icons">add</i>
                  </span>
                </div>
              </label>
              <input
                style={{ display: "none" }}
                id="file-input"
                type="file"
                accept="image/png, image/jpeg"
                files={file}
                onChange={onChangeHandler}
              />
            </div>
          ))
      }
    </>
  )
}

export default CreateTrip
