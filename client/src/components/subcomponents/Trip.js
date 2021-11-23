import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {update_data} from '../../Redux/Actions/action';
import { Link } from "react-router-dom";
import moment from "moment";
import APIService from "../../apiService";
import './styles/trip.css'

const Trip = ({post}) => {
  const mydata = useSelector(state =>state.loggedUser);
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem('jwt'))
  const [tripInfo, changeTripInfo] = useState({})
  const [url, setUrl] = useState('');
  const [id, setID] = useState('');
  const [description, setDescription] =useState('');
  const [postedBy, setPostedBy] = useState({
    _id: '',
    username:'',
    dp:''
  });
  const [likes, setLikes] = useState([]);

  const like = async() =>{
    try{
      const response = await APIService.like(id, token);
      
      console.log(response)
      dispatch(update_data());
    }
    catch(e){
      console.log(e);
    }
  };

  const handleDelete = async (e) =>{
    try{
      const id = e.target.parentElement.parentElement.parentElement.id;
      await APIService.deleteTrip(id);
      dispatch(update_data());
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    async function getTripInfo() {
      const result = await APIService.getTripInfo(post);
      const tripObject = result.trip[0]
      changeTripInfo(tripObject);
      setUrl(tripObject.url);
      setID(post);
      setPostedBy(tripObject.postedBy);
      setLikes(tripObject.likes);
      setDescription(tripObject.description);
    }
    getTripInfo();

  }, [])

  return(
    <div id={id} data-username={postedBy._id} className="card trip-card" style={{ marginBottom: "1rem", padding: "0.3rem" }}>
      <div className="post-top-part">
        {postedBy.dp && <Link to={`/user/${postedBy.username}`}><img style={{ marginTop: '0.5rem' }} className="post-profile-pic" width="40" height="40" src={postedBy.dp || 'no image'} alt="profile pic" /></Link>}
        <h6 className="post-username"><strong><Link to={`/user/${postedBy.username}` } style={{ cursor: 'pointer' }}>{postedBy.username}</Link></strong></h6>
        <div className = "post-top-more">
          {postedBy.username === mydata.username && <i className="material-icons" onClick ={handleDelete}>delete</i>}
          <Link to ={`/posts/${id}`}><i className="material-icons">arrow_forward</i></Link>
          {
              postedBy.username !== mydata.username &&
                ( likes.indexOf(mydata._id) === -1 ?
                   <i onClick={like} className="material-icons">favorite</i> :
                   <i onClick={like} className="material-icons red-text" aria-hidden="true">favorite</i>)
          }
          </div>
        </div>
        <div className = 'trip-details'>
          <img onDoubleClick={like}  src={url} alt="img" width="100%" className = "profile-img" />
          <div className ="trip-details-body">
            {tripInfo.title ? <h5 style ={{color:'grey',textDecoration:'underline',marginTop:'0px', textTransform:'capitalize'}}>{tripInfo.title}</h5> : null}
            <p>{description}</p>
            <p><strong>Posted On:</strong> {moment(tripInfo.postedDate).format('MMMM Do, YYYY')}</p>
          </div>
        </div>
      </div>
    )
  }

export default Trip;