import { combineReducers } from "redux";
import isAuthenticated from './auth'
import loggedUserReducer from './userReducer'
import tripReducer from './tripReducer'
import updateReducer from "./update";

const allReducers = combineReducers({
  ishposts:tripReducer,
  isLogged: isAuthenticated,
  loggedUser:loggedUserReducer,
  isUpdate: updateReducer
})

export default allReducers