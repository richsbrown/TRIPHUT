import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import 'react-image-crop/dist/ReactCrop.css';
import {storage} from '../../firebase/index';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {useNavigate, useParams} from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import { update_data } from "../../Redux/Actions/action";

const AddPhoto = () => {
  const {postId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(state =>state.isLogged);

  const [file,setFile] = useState(null);
  const [send, setSend] = useState(null);
  const [url, setUrl] = useState(null)   
  const [crop,setCrop] = useState({x:0,y:30,width:100});

  const onChangeHandler = event => {
    const url = event.target.files[0];
    if (url) {
        setFile(URL.createObjectURL(url));
        setUrl(url);
    } else {
        setFile(null);
    }
};

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
  },[send, dispatch, navigate, postId])

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
                        <ReactCrop src={file} crop={crop} keepSelection='true' circularCrop onChange={setCrop} />
                    </div>
                }
            </div>

        }
    </>
)


}

export default AddPhoto