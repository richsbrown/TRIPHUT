import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

const TripPage = ()=> {
  const {postId} = useParams()
  const [trip,setTrip] = useState();
  const navigate = useNavigate();
  const isAuth = useSelector(state=>state.isLogged)
  const loggedUser = useSelector(state => state.loggedUser);
  const isUpdate = useSelector(state=>state.isUpdate)
  const [loaded,setLoaded] = useState(null);
  // const { url, description, _id: id, postedBy: { _id: postedId, username }, likes} = trip


  useEffect(()=>{
        fetch(`http://localhost:3001/trips`,{
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
            "authorization": "Bearer " + localStorage.getItem('jwt')
          },
          body: JSON.stringify({postId})
        })
        .then(resp => resp.json())
        .then(data => {
            if(!data.error){
              setTrip(data.trip[0])
              setLoaded(true)
              console.log("trip: " + trip)
            }else{
              navigate('/')
            }
          }).catch(e=> console.log(e))
  },[isUpdate])

  return(
    isAuth && loaded ? (
      <div className="profile card-home home">
      {/* Top part with user dp & username */}
      <div className="profile-info row">
          <div className="col s4 left">
              {trip.url && <img className="profile-img" src={trip.url} alt="profile-img" />}
          </div>
          <div className="col s8 profile-data">
              <div className={"profile-flex"} >
                  <span className="username profile-flex-item">{trip.title}</span>
              </div>
          </div>
      </div>
      {(loggedUser._id === trip.postedBy._id) ?
      <div>
        <Link to={`/photos/${postId}`} >< div className="btn black" style={{ width: '48%', marginLeft: '2%', borderRadius: '0.3rem' }}><strong className="white-text">Add Photo</strong></div></Link>
      </div>
      :null
      }
      <hr className="hr-profile" />
      {
        (trip.photos.length > 0) ? 
        trip.photos.map(photo=> {
          return(<img src={photo} alt="img" width="100%" className = "display-img-card" />)
        })
        
        :null
      }
      </div>
    )
    :
    null
  )
}

export default TripPage