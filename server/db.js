const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://marshal:mongo@cluster0.8o9m6.mongodb.net/chat_db?authSource=admin&replicaSet=atlas-m5opbu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',{
  useNewURLParser: true,
})
.then(()=>{
  console.log('Successfully connected to DB')
})
.catch((e)=>{
  console.log(e);
})

module.exports = mongoose;