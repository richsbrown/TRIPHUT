import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {update_data} from '../../Redux/Actions/action';
import { Link } from "react-router-dom";
import moment from "moment";

const Trip = (props) => {
  const mydata = useSelector(state =>state.loggedUser);
  const dispatch = useDispatch();
  const { url, description, _id: id, postedBy: { _id: postedId, username, dp }, likes} = props.post;

  const like = async() =>{
    try{
      const response = await fetch('http://localhost:3001/like', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          "authorization": "Bearer " + localStorage.getItem('jwt')
        },
        body:JSON.stringify({tripId:id})
      });
      await response.json();
      dispatch(update_data());
    }
    catch(e){
      console.log(e);
    }
  };

  const handleDelete = async (e) =>{
    try{
      const id = e.target.parentElement.parentElement.parentElement.id;
      const response = await fetch(`http://localhost:3001/${id}/delete`, {
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'authorization': "Bearer " + localStorage.getItem('jwt')
        }
      });
      await response.json();
      dispatch(update_data());
    }catch(e){
      console.log(e);
    }
  }

  return(
    <div id={id} data-username={postedId} className="card trip-card" style={{ marginBottom: "1rem", padding: "0.3rem" }}>
      <div className="post-top-part">
        {dp && <Link to={`/user/${username}`}><img style={{ marginTop: '0.5rem' }} className="post-profile-pic" width="40" height="40" src={dp || require('../../images/profile-pic.jpg')} alt="profile pic" /></Link>}
        <h6 className="post-username"><strong><Link to={`/user/${username}` } style={{ cursor: 'pointer' }}>{username}</Link></strong></h6>
        <div className = "post-top-more">
          {username === mydata.username && <i className="material-icons" onClick ={handleDelete}>delete</i>}
          <Link to ={`/posts/${id}`}><i className="material-icons">arrow_forward</i></Link>
          {
              username !== mydata.username &&
                       ( likes.find(my => my.username === mydata.username) === undefined ?
                            <i onClick={like} className="material-icons">favorite</i> :
                            <i onClick={like} className="material-icons red-text" aria-hidden="true">favorite</i>)
          }
          </div>
        </div>
        <div className = 'trip-details'>
          <img onDoubleClick={like}  src={url} alt="img" width="100%" className = "profile-img" />
          <div className ="trip-details-body">
            {props.post.title ? <h5 style ={{color:'grey',textDecoration:'underline',marginTop:'0px', textTransform:'capitalize'}}>{props.post.title}</h5> : null}
            <p>{description}</p>
            <p><strong>Posted On:</strong> {moment(props.post.postedDate).format('MMMM Do, YYYY')}</p>
          </div>
        </div>
      </div>
    )
  }

export default Trip;