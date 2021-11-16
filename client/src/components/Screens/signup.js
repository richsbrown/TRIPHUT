import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const Signup = ()=>{
const navigate = useNavigate()
const [formData,setFormData] = useState({email:"", username:"", password:"", fullname:""})
const {email,username,password,fullname} = formData;

const signupHandler = (e)=> {
  const name = e.target.name;
  const value = e.target.value;
  setFormData((prevState)=>{
    return {...prevState,[name]:value}
  })
}

const submitHandler = async (event) => {
  try{
    event.preventDefault();
    if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    && fullname.length > 3 && username.length > 3 && password.length > 5) {
  
      const response = await fetch('http://localhost:3001/signup', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email,
          fullname,
          password,
          username
        })
      })
      const data = await response.json();
      if(data.error){
        M.toast({ html: data.error, classes: "red darken-1" })
      }
      else{
        setFormData({ email: "", username: "", password: "", fullname: "" });
        navigate('/');
        M.toast({ html: data.message, classes: "blue darken-1" })
      }
    }
    else{
      M.toast({ html: "Invalid email or other fields<br>Please check your inputs again.", classes: "red darken-1" })
    }
  }catch(e){
    console.log(e)
  }
  
}

  return(
    <>
            <form method="post" className="card card-login" onSubmit={submitHandler}>
                <h2 className="insta-font">TripHut</h2>
                <h5 className="grey-text  text-darken-1">Sign up here</h5>
                <input type="email" autoComplete="off"
                    name="email" placeholder="Email" required value ={email} onChange = {signupHandler}/>
                <input type="text" autoComplete="off"
                    name="fullname" placeholder="Full Name" required minLength="4" value ={fullname} onChange = {signupHandler}/>
                <input type="text" autoComplete="off" required minLength="4"
                    name="username" placeholder="Username" value ={username} onChange = {signupHandler}/>
                <input type="password" name="password" required minLength="6"
                    placeholder="Password" value ={password} onChange = {signupHandler}/>
                <br />
                <button className="btn blue insta-btn">
                    Sign Up
                </button>
            </form>
            <div className="card card-login signup-card">
                Have an account?  <Link className="blue-text" to="/"> Log in</Link>
            </div>
    </>
  )
}

export default Signup