import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import APIService from '../../apiService';
import './styles/signup.css'

const Signup = ()=>{
const navigate = useNavigate()
const [formData,setFormData] = useState({email:"", username:"", password:"", fullname:""})
const {email,username,password,fullname} = formData;

const signupHandler = (e)=> {
  const name = e.target.name;
  const value = e.target.value;
  setFormData((prevState)=> {
    return {...prevState,[name]:value}
  })
}

const submitHandler = async (event) => {
  try{
    event.preventDefault();
    const data = await APIService.createUser(email, fullname, username, password);
    if(data.error){
      M.toast({ html: data.error, classes: "red darken-1" })
    }
    else{
      setFormData({ email: "", username: "", password: "", fullname: "" });
      navigate('/');
      M.toast({ html: data.message, classes: "blue darken-1" })
    }
  }catch(e){
    console.log(e)
  }
}

  return(
    <>
            <form 
            data-testid='signupForm'
            method="post" className="card card-login" onSubmit={submitHandler}>
                <h2 className="insta-font">TripHut</h2>
                <h5 className="grey-text  text-darken-1">Sign up here</h5>
                <input 
                data-testid='signupEmail'
                type="email" autoComplete="off"
                    name="email" placeholder="Email" required value ={email} onChange = {signupHandler}/>
                <input 
                data-testid='signupFullname'
                type="text" autoComplete="off"
                    name="fullname" placeholder="Full Name" required minLength="4" value ={fullname} onChange = {signupHandler}/>
                <input 
                data-testid='signupUsername'
                type="text" autoComplete="off" required minLength="4"
                    name="username" placeholder="Username" value ={username} onChange = {signupHandler}/>
                <input 
                data-testid='signupPassword'
                type="password" name="password" required minLength="6"
                    placeholder="Password" value ={password} onChange = {signupHandler}/>
                <br />
                <button 
                data-testid='signupButton'
                className="btn blue insta-btn">
                    Sign Up
                </button>
            </form>
            <div className="card card-login signup-card">
                Have an account?  
                <Link
                data-testid='loginButtonLink' 
                className="blue-text" to="/"> Log in</Link>
            </div>
    </>
  )
}

export default Signup