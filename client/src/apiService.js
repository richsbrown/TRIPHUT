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

module.exports = APIService