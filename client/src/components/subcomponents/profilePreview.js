import React from 'react';
import './styles/profile-preview.css'
import {Link} from 'react-router-dom';

const ProfilePreview = ({profile}) => {

    return (
        <Link to={`/user/${profile.username}`}> 
            <div className="profile-preview">
                {profile.dp && <img src={profile.dp} alt={profile.username}/>}
                <div className="profile-info">
                        <h4>{profile.username}</h4>
                </div>
            </div>
        </Link>
    );
};

export default ProfilePreview;