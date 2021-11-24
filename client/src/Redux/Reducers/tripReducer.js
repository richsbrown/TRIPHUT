const tripReducer = (state =[], action) => {
  switch(action.type){
    case 'SET_HTRIPS':
      return [...action.payload]
    case 'UPDATE_HTRIPS':
      return [action.payload,...state]
    default:
      return state  
  }
}

export default tripReducer