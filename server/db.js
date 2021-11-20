const mongoose = require('mongoose');
const databaseName = 'TripHut'

mongoose.connect(`mongodb://127.0.0.1/${databaseName}`,{
  useNewURLParser: true,
})
.then(()=>{
  console.log('Successfully connected to DB')
})
.catch((e)=>{
  console.log(e);
})

module.exports = mongoose;