const assert = require('chai').assert;
const express = require('express')
const tripRouter = require('./server/Routes/trip');
const userRouter = require('./server/Routes/user')
const supertest = require('supertest');
const mongoose = require('mongoose')
const Trip = require('./server/Models/TripModel')
//BeforeAll or BeforeEach

describe('Trip Controller', async () => { 
  
  const app = express()
  app.use(express.json())
  app.use(tripRouter)
  const request = supertest(app)
  
  before(async() => {
    const dbLink = 'mongodb+srv://marshal:mongo@cluster0.8o9m6.mongodb.net/chat_db?authSource=admin&replicaSet=atlas-m5opbu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
    await mongoose.connect(dbLink, {useNewUrlParser: true})
  })
  
  it('/alltrips route should return array of objects', (done) => {
    request.get('/alltrips').then(trips => {
      const result = trips.body.trips;
      assert.typeOf(result, 'array');
      done()
    })
  })
  
  const mockID = '61967a8166babde4eb5eeb2f'

  it('/trips/:id route should return corresponding trip', (done) => {
    request.get(`/trips/${mockID}`).then(result => {
      assert.equal(result.body.trip[0]._id, mockID)
      done()
    })
  })
})

describe('User Controller', async () => {
  const app = express()
  app.use(express.json())
  app.use(userRouter)
  const request = supertest(app)
  
  before(async() => {
    const dbLink = 'mongodb+srv://marshal:mongo@cluster0.8o9m6.mongodb.net/chat_db?authSource=admin&replicaSet=atlas-m5opbu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
    await mongoose.connect(dbLink, {useNewUrlParser: true})
  })
  
  const mockUsername = '1234'

  it('/user/:username route should return corresponding user', (done) => {
    request.get(`/user/${mockUsername}`).then(result => {
      //console.log(result.body.user.username)
      assert.equal(result.body.user.username, mockUsername)
      done()
    })
  })
})