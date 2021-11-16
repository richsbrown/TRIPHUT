import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { set_loggedUser } from "../../Redux/Actions/action";

const EditProfile =() => {
const navigate = useNavigate();
const dispatch = useDispatch();
const loggedUser = useSelector(state=>state.loggedUser)
const isAuth = useSelector(state=>state.isLogged);

const [data,setData] = useState({
  fullname:loggedUser.fullname,
  username: loggedUser.username,
  email:loggedUser.email
})

const handleData = (e)=>{
  const name = e.target.name;
        const value = e.target.value;
        setData(prev => { return { ...prev, [name]: value } });

}

const handleSubmit = e => {
  e.preventDefault();
  fetch(`http://localhost:3001/updateUser`, {
      method: 'post',
      headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({ id: loggedUser._id, data })
  })
      .then(resp => resp.json())
      .then(result => {
          if (!result.error) {
              dispatch(set_loggedUser(result.user));
              backHandler()
          }
      })
      .catch(er => console.log(er))
}

const backHandler = () => {
  navigate(-1)
}
console.log(loggedUser.dp)
const { fullname, username, email } = data;

return(
  <div className="home card card-home" style={{ minHeight: '65vh' }}>
        {
            isAuth && (
                <div>
                    <form onSubmit={handleSubmit} method="post">
                        <div className="post-top-part">
                            <i onClick={backHandler} className="ep-cancelBtn fas">Cancel</i>
                            <i className="fas ep-headerTitle">Edit Profile</i>
                            <i onClick={handleSubmit} className="blue-text text-darken-2 fas ep-doneBtn">Done</i>
                        </div>
                        <hr />
                        <div>
                            {loggedUser.dp && <img style={{ marginLeft: '34%' }} className="profile-img" src={loggedUser.dp} alt="profile-img" />}
                        </div>
                        <div style={{ marginLeft: '34%' }}>
                            <strong><Link to="/updateProfilePhoto" className="blue-text text-darken-2">Change Profile Photo</Link></strong>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <div className="row">
                                <div className="ep-labelDiv col">Name</div>
                                <input className="col ep-input" type="text" spellCheck="false" autoComplete="off" id="fullname" name="fullname" placeholder="Name" value={fullname} onChange={handleData} />
                            </div>
                            <div className="row">
                                <div className="col ep-labelDiv">Username</div>
                                <input className="col ep-input" type="text" spellCheck="false" autoComplete="off" id="username" name="username" placeholder="Username" value={username} onChange={handleData} />
                            </div>
                            <div className="row">
                                <div className="col ep-labelDiv">Email</div>
                                <input className="col ep-input" type="email" spellCheck="false" autoComplete="off" id="email" name="email" placeholder="Email" value={email} onChange={handleData} />
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    </div>
)
}

export default EditProfile