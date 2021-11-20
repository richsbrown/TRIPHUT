const APIService = {};
const BASE_URL = 'http://localhost:3001';

APIService.getAllTrips = () => {
  return fetch(`${BASE_URL}/alltrips`, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.signIn = (email, password) => {
  return fetch('http://localhost:3001/signin',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      email,
      password
    })
  })
  .then(res => res.json())
  .catch(err =>console.log(err))
}

APIService.createTrip = (url, description, title) => {
  return fetch("http://localhost:3001/createtrip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      url: url,
      description: description,
      title: title,
    })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

APIService.populateTrips = (id, postId) => {
  return fetch((id) ? `http://localhost:3001/user/${id}/trips` : (postId) ? 'http://localhost:3001/myCollections' : 'http://localhost:3001/alltrips', {
      method: (id) ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

APIService.getProfileInfo = (username, token ) => {
    return fetch(`http://localhost:3001/user/${username}`,{
      headers:{
        'Content-Type':'application/json',
        'authorization':"Bearer " + token
      }
    })
    .then(res =>res.json())
    .catch(err => console.log(err))
}

APIService.getFollowers = (username, token) => {
  return fetch(`http://localhost:3001/user/${username}/follow`,{
      method: 'POST',
      headers: {
        "Content-Type":'application/json',
        'authorization':"Bearer " + token
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

APIService.createUser = (email, fullname, username, password) => {
  return fetch('http://localhost:3001/signup', {
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
    .then(res => res.json())
    .catch(err => console.log(err));
};


APIService.getTripInfo = (postId, token) => {
  return fetch(`http://localhost:3001/trips`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      "authorization": "Bearer " + token
    },
    body: JSON.stringify({postId})
  })
  .then(resp => resp.json())
  .catch(err => console.log(err));
};

APIService.postPhoto = (send, postId, token) =>{
  return fetch('http://localhost:3001/photos',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        "authorization": "Bearer " + token
      },
      body:JSON.stringify({
        photo:send,
        tripId:postId
      })
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

APIService.editProfile = (id, data, token) =>{
  return fetch(`http://localhost:3001/updateUser`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    },
    body: JSON.stringify({ id, data })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.updateProfilePhoto = (username, send, token) => {
  return fetch('http://localhost:3001/updateProfilePhoto', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token
      },
      body: JSON.stringify({
        dp: send,
        username
      })
    })
    .then(res => res.json())
    .catch(err => console.log(err));
};

APIService.like = (tripId, token) => {
  return fetch('http://localhost:3001/like', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      "authorization": "Bearer " + token
    },
    body:JSON.stringify({tripId})
  })
  .catch(err => console.log(err))
}

APIService.authenticate = (token) => {
  return fetch("http://localhost:3001/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

module.exports = APIService;