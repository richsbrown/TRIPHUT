export const set_islogged = () => {
  return {
      type: 'set_auth_true'
  }
}

export const unset_islogged = () => {
  return {
      type: 'set_auth_false'
  }
}
export const set_loggedUser = (data) => {
  return {
      type: 'set_loggedUser',
      payload: data
  }
}

export const unset_loggedUser = () => {
  return {
      type: 'unset_loggedUser',
  }
}

export const set_hTrips = (data) => {
  return {
      type: 'SET_HTRIPS',
      payload: data
  }
}

export const update_hTrips = (data) => {
  return {
      type: 'UPDATE_HTRIPS',
      payload: data
  }
}
export const update_data = () => {
  return {
      type: 'update_data',
  }
}