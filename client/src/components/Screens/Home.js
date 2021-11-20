import React, {useState,useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import CreateTrip from './createTrip';
import Trip from '../subcomponents/Trip'
import { set_hPosts } from "../../Redux/Actions/action";
import ReactDOM from 'react-dom';
import Discover from '../subcomponents/Discover';
import APIService from '../../apiService'

const Home = () => {
  const {id, postId} = useParams();
  const isAuth = useSelector(state => state.isLogged);
  const isUpdate = useSelector(state => state.isUpdate);
  const posts = useSelector(state => state.ishposts);
  const [loaded,setLoaded] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const {fullname} = useSelector(state =>state.loggedUser)


  useEffect(() => {
    if (isAuth) {
      // // Using ReactDOM.unstable_batchedUpdates to batch the fetch and sts
      ReactDOM.unstable_batchedUpdates(() => {
        // If id is recieved as useParams prop then fetch specific user posts else if postId is recieved then fetch myCollection else home page fetch.
        APIService.populateTrips(id, postId)
          .then(resp => {
            if (!resp.error && resp.trips.length > 0) {
              dispatch(set_hPosts(resp.trips));
              if (!loaded) {
                setLoaded(true);
              }
            } else {
              navigate.push('/');  //if selected collection or userposts are 0 then display home route.
            }
          })
          .catch(err => console.log(err))
      })
    }
    // eslint-disable-next-line
}, [isAuth, isUpdate, id, postId]);  


  return(
    <div className="home trip-card">
    {
      isAuth &&
      posts && // Only display the block if user is logged in and post array has data from fetch API.
      <div>
        <div>Top Trips</div>
        <div>
          <Discover />
          </div>
          <div className="homepage" style={{ position: "relative", }}>
            {(!id && !postId) && <CreateTrip />}
            { // Mapping through the post state array to display all the posts on Page.
            posts.map(post => {
                return <Trip id={post._id} key={post._id} postId={post._id} post={post} />
            })
            }
        </div>
      </div>
    }
    </div>
  )
}

export default Home