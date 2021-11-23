import React from 'react'
import './styles/following.css'
import { useEffect, useState } from 'react'
import APIService from '../../apiService'
import {useParams} from 'react-router-dom';
import ProfilePreview from '../subcomponents/profilePreview';

const Following = () => {

  const [following, setFollowing] = useState([]);
  const {username} = useParams();
    

    useEffect(() => {
        async function receiveFollowing () {
            const fetchedUser = await APIService.getFollowing(username);
            setFollowing(fetchedUser.following);
        }
        receiveFollowing();
   
    }, [following, username])


    return (
        <div className="following-container">
            <h1>Following</h1>
            {following.length && following.map(profile => <ProfilePreview key={profile.username} profile={profile}/>)}
        </div>
    )
}

export default Following;
