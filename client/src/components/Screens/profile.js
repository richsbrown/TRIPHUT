import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import moment from 'moment';
import APIService from '../../apiService';
import "./styles/profile.css"

const Profile = () => {
  const {username,} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.isLogged);
  const loggedUser = useSelector(state => state.loggedUser);
  
  const [userData, setUserData] = useState(null);
  const [follow, setFollow] = useState(false);
  const [token] = useState(localStorage.getItem('jwt'))

  useEffect(()=> {
    APIService.getProfileInfo(username, token)
    .then(data => {
      if(data.user) {
        setUserData(data.user);
      }else{
        navigate('/');
      }
    })
    .catch(er => console.log(er));
  },[follow, navigate, username, token]);
  
  const followHandler = ()=> {
    APIService.follow(username, token)
    .then(data => {
      if(!data.error){
        setFollow(prev=>!prev)
      }
    })
    .catch(err => console.log(err));
  };

  return(
    isAuth && userData ?
      <div className="profile card-home home">
      {/* Top part with user dp & username */}
      <div className="profile-info row">
        <div className="col s4 left">
          {userData.dp && <img className="profile-img" src={userData.dp} alt="profile-img" />}
        </div>
        <div className="col s8 profile-data">
          <div className={"profile-flex"} >
            <span className="username profile-flex-item">{username}</span>
          </div>
        </div>
      </div>
      <span className="full-name"><strong>{userData.fullname}</strong></span><br /><br />
      {
        (userData._id !== loggedUser._id) ? (userData.followers.find(id => id === loggedUser._id) ?
          < div onClick={followHandler} className="btn grey" style={{ width: '100%', borderRadius: '0.3rem' }}><strong className="white-text">Unfollow</strong></div>
          :
          < div onClick={followHandler} className="btn blue" style={{ width: '100%', borderRadius: '0.3rem' }}><strong className="white-text">Follow</strong></div>)
          :
          <div>
              <Link to="/profile/edit" >< div className="btn black" style={{ width: '48%', marginLeft: '2%', borderRadius: '0.3rem' }}><strong className="white-text">Edit Profile</strong></div></Link>
          </div>
      }
      <hr className="hr-profile" />
      <div className="row center">
        <span className="col s4"><strong>{userData.trips.length}</strong><br />posts</span>

        
        <Link to={`/user/${userData.username}/followers`}><span className="col s4"><strong>{userData.followers.length}</strong><br />followers</span></Link>
        <Link to={`/user/${userData.username}/following`}><span className="col s4"><strong>{userData.following.length}</strong><br />following</span></Link>      
      
      
      
      
      </div>
      { // Mapping through the post state array to display all the posts on Page.
        userData.trips.slice(0).reverse().map(trip => {
          // each post should probably be made into a component instead
          return(
            <div key={trip._id} className="card trip-card" style={{ marginBottom: "1rem", padding: "0.3rem" }}>
            <div className = "post-top-more" style={{textAlign:'right'}}>
            <Link to ={`/posts/${trip._id}`}><i className="material-icons">arrow_forward</i></Link>
            </div>  
            <div className="trip-details" style={{marginTop:'1rem'}}>
              <img src={trip.url} alt="img" width="100%" className = "profile-img" />
              <div className = 'trip-details-body'>
              {trip.title ? <h5 style ={{color:'grey',textDecoration:'underline',marginTop:'0px', textTransform:'capitalize'}}>{trip.title}</h5> : null}
                <p>{trip.description}</p>
                <p><strong>Posted On:</strong> {moment(trip.postedDate).format('MMMM Do, YYYY')}</p>
                <p style ={{color:'#158bcb'}}><strong>{trip.likes.length} like{trip.likes.length === 1 ? '':'s'}
                </strong></p>
            </div>
            </div>
            </div>
          )
          
        })
      }
      </div>
      :null
  )
}

export default Profile