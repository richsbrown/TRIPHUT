const isAuthenticated = (state = null, action) => {
  switch(action.type) {
    case 'set_auth_true':
      return true
    case 'set_auth_false':
      return false;
    default:
      return state  
  }
}


export default  isAuthenticated