const assert = require('chai').assert;
const express = require('express')
const tripRouter = require('./Routes/trip');
const userRouter = require('./Routes/user')
const supertest = require('supertest');
const mongoose = require('mongoose')
const Trip = require('./Models/TripModel')
const databaseName = 'TripHut'
//BeforeAll or BeforeEach

describe('Trip Controller', async () => { 
  
  const app = express()
  app.use(express.json())
  app.use(tripRouter)
  const request = supertest(app)
  
  before(async() => {
    const dbLink = `mongodb://127.0.0.1/${databaseName}`
    await mongoose.connect(dbLink, {useNewUrlParser: true})
  })
  
  it('/alltrips route should return array of objects', (done) => {
    request.get('/alltrips').then(trips => {
      const result = trips.body.trips;
      assert.typeOf(result, 'array');
      done()
    })
  })
  
  const mockID = '61968e58e22942b53f4b02f4'

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
    const dbLink = `mongodb://127.0.0.1/${databaseName}`
    await mongoose.connect(dbLink, {useNewUrlParser: true})
  })
  
  const mockUsername = 'John'

  it('/user/:username route should return corresponding user', (done) => {
    request.get(`/user/${mockUsername}`).then(result => {
      //console.log(result.body.user.username)
      assert.equal(result.body.user.username, mockUsername)
      done()
    })
  })

  const userID = '61967b0fe22942b53f4b01a8'

  it('/:userId/:task should return an array of followers', (done) =>{
    request.get(`/${userID}/followers`).then(result => {
      assert.equal(result.body.followers._id, userID);
      assert.typeOf(result.body.followers.followers, 'array');
      //assert.typeOf(result.body.followers.followers[0]._id, 'string');
      done();
    });
  });
})