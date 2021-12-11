import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import 'react-image-crop/dist/ReactCrop.css';
import {storage} from '../../firebase/index';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {useNavigate} from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import { set_loggedUser, update_data } from "../../Redux/Actions/action";
import APIService from '../../apiService';
import './styles/profilePhoto.css'

const ProfilePhoto = () => {
  const dispactch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector(state => state.loggedUser);
  const isAuth = useSelector(state => state.isLogged);

  const [token] = useState(localStorage.getItem('jwt'));
  const [file, setFile] = useState(null);
  const [send, setSend] = useState(null);
  const [url, setUrl] = useState(null);
  const [crop,setCrop] = useState({x:0,y:30,width:100});
    

  const onChangeHandler = event => {
    const url = event.target.files[0];
    if (url) {
        setFile(URL.createObjectURL(url));
        setUrl(url);
    } else {
        setFile(null);
    }
  }

  const handleUpload = e => {
    
    e.preventDefault();
    const name = url.name.replace('.','');
    const storageRef = ref(storage,`images/${name}`);
    const upBytes = uploadBytesResumable(storageRef,url);
    upBytes.on(
        'state_changed',
        snapshot =>{},
      error => {
        console.log(error);
      },
      ()=>{
        getDownloadURL(upBytes.snapshot.ref).then(url=>{
          setSend(url)
        })
      }
    )
  }

  useEffect(()=>{
    if (send) {
      APIService.updateProfilePhoto(loggedUser.username, send, token)
      .then(result => {
        // set new user data to the redux logeduser state
        dispactch(set_loggedUser(result.user));
        dispactch(update_data()); // set state to trigger use effects where data needs to be changed in other components
        navigate(-1);   //goback to previous page
      })
      .catch(err => console.log(err))
    }
  },[send, dispactch, loggedUser.username, navigate, token])

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
                        <ReactCrop onImageLoaded={()=>{}} src={file} crop={crop} keepSelection='true' circularCrop onChange={setCrop} />
                    </div>
                }
            </div>

        }
    </>
)
}

export default ProfilePhoto