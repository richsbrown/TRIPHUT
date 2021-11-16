import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { unset_islogged, unset_loggedUser } from "../Redux/Actions/action"

const Nav = () => {
  const isAuth = useSelector((state) => state.isLogged)
  const { username } = useSelector((state) => state.loggedUser) || "username"
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(unset_islogged())
    dispatch(unset_loggedUser())
    navigate("/")
  }
  return (
    <nav className="white">
      <div className="nav-wrapper">
        <ul className="right black-text nav_li">
          {isAuth ? (
            <>
              <li>
                <Link to="/">
                  <i className="material-icons black-text">home</i>
                </Link>
              </li>
              <li>
                <Link to="/video">
                  <i className="material-icons black-text">switch_video</i>
                </Link>
              </li>
              <li>
                <a href={`/user/${username}`}>
                  <i className="material-icons black-text">person</i>
                </a>
              </li>
              <li>
                <Link to="/" onClick={logoutHandler}>
                  <i className="material-icons black-text">https</i>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">
                  <i className="material-icons black-text">account_circle</i>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <i className=" large material-icons black-text">add_circle</i>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
