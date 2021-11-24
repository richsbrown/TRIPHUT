import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {set_islogged, set_loggedUser} from '../../Redux/Actions/action'
import APIService from '../../apiService'
import './styles/login.css'

const Login = () => {
const [formData,setFormData] = useState({email:"",password:""})
const isAuth = useSelector(state => state.set_islogged)
const dispatch = useDispatch();
const {email, password} = formData;
const navigate = useNavigate()
const [display,setDisplay] = useState(true)

const handleFormData = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setFormData((prevState)=>{
    return {...prevState,[name]:value}
  })
}

const handleSubmit = async (event) => {
  event.preventDefault()
  try{
    const data = await APIService.signIn(email, password)
    if(data.error){
      M.toast({ html: data.error, classes: "red darken-1" })
    }
    else{
      setFormData({email:"",password:""});
      localStorage.setItem('jwt',data.token)
      dispatch(set_loggedUser(data.user))
      dispatch(set_islogged());
      navigate("/");
      M.toast({ html: data.message, classes: "blue darken-1" })
    }
  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
isAuth ? navigate('/signup') : setDisplay(true)

},[isAuth, navigate])

  return(
    display && <>
      <form 
      data-testid='loginForm'
      method="post" className="card card-login" onSubmit ={handleSubmit}>
        <h2 className="insta-font">TripHut</h2>
        <input 
        data-testid='loginEmail'
        type="email" autoComplete="off"
          name="email" value ={email} placeholder="Email" required onChange ={handleFormData}
        />
        <input 
        data-testid='loginPassword'
        type="password" name="password" required minLength="6"
          placeholder="Password" onChange ={handleFormData} value ={password} />
        <br />
        <button 
        data-testid='loginButton'
        className="btn blue insta-btn">
          Log In
      </button>
        <div className="or-container">
          <hr />OR<hr />
        </div>
        <br />
        {/* <Link className="blue-text  text-darken-4" to="/">forgot password ?</Link> */}
        <br/>
        <Link 
        data-testid='loginButtonLinkToSignup'
        className="btn signup" to="/signup"> Sign up</Link>
      </form>
    </>
  )
}

export default Login