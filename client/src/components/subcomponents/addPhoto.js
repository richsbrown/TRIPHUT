import React, { useState, useEffect } from 'react';
import M from "materialize-css";
import { useSelector, useDispatch } from "react-redux";
import 'react-image-crop/dist/ReactCrop.css';
import {storage} from '../../firebase/index'
import {ref, uploadString, uploadBytes, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import {useNavigate, useParams} from 'react-router-dom'
import ReactCrop from 'react-image-crop';
import { set_loggedUser, update_data } from "../../Redux/Actions/action";

const AddPhoto = () => {
  const {postId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(state =>state.isLogged)
  const [file,setFile] = useState(null);
  const [send, setSend] = useState(null);
  const [url, setUrl] = useState(null)
   
  const [image, setImage] = useState(null);
  const [crop,setCrop] = useState({x:0,y:30,width:100});

  function getCroppedImage(image,crop) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth /image.width;
    const scaleY = image.naturalHeight/image.height;
    canvas.width = crop.width
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x*scaleX,
      crop.y*scaleY,
      crop.width*scaleX,
      crop.height*scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL('image/png');

  }

  const onChangeHandler = event => {
    const url = event.target.files[0];
    console.log(event.target.files)
    if (url) {
        setFile(URL.createObjectURL(url));
        setUrl(url)
    } else {
        setFile(null);
    }

}

  const handleUpload = e => {
    
    e.preventDefault();
    const name = url.name.replace('.','')
    console.log(url)
    const storageRef = ref(storage,`images/${name}`)
        const upBytes = uploadBytesResumable(storageRef,url)
        upBytes.on(
          'state_changed',
          snapshot =>{},
        error => {
          console.log(error);
        },
        ()=>{
          getDownloadURL(upBytes.snapshot.ref).then(url=>{
            setSend(url)
            console.log(url,file,send)
          })
        }
        
        )
    
  }

  useEffect(()=>{
    if(send){
      fetch('http://localhost:3001/photos',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          "authorization": "Bearer " + localStorage.getItem('jwt')
        },
        body:JSON.stringify({
          photo:send,
          tripId:postId
        })
      })
      .then(resp=>resp.json())
      .then(result=>{
        dispatch(update_data())
        navigate(-1)
      })
      .catch(e=>console.log(e))
    }
  },[send])

  return (
    <>
        {  // here only shows the form and image data based on file selected..
            isAuth && <div className="card home card-home">
                <div>

                    <div>
                        <label htmlFor="file-input" className="btn btn-large blue pp-selectBtn">Select</label>
                        {file && <span style={{ marginLeft: '40%' }} onClick={handleUpload} className="btn btn-large blue pp-selectBtn">Upload</span>}
                    </div>

                    <input style={{ "display": "none" }} id="file-input" type="file" accept="image/png, image/jpeg" files={file} onChange={onChangeHandler}  />
                </div>
                {
                    file && <div >
                        <ReactCrop onImageLoaded={setImage} src={file} crop={crop} keepSelection='true' circularCrop onChange={setCrop} />
                    </div>
                }
            </div>

        }
    </>
)


}

export default AddPhoto