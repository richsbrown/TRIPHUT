import React from 'react'
import './styles/followers.css'
import { useEffect, useState } from 'react'
import APIService from '../../apiService'
import {useParams} from 'react-router-dom';
import ProfilePreview from '../subcomponents/profilePreview';

const Followers = () => {

  const [followers, setFollowers] = useState([]);
  const {username} = useParams();


    useEffect(() => {
        async function receiveFollowers () {
            const fetchedUser = await APIService.getFollowers(username);
            console.log('fetched followers', fetchedUser.followers)
            setFollowers(fetchedUser.followers);
        }
        receiveFollowers();
    }, [followers, username])


    return (
        <div className="followers-container">
            <h1>Followers</h1>
            {followers.length && followers.map(follower => <ProfilePreview key={follower.username} profile={follower}/>)}
        </div>
    )
}

export default Followers;
