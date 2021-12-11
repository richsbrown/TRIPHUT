const assert = require('chai').assert;
const express = require('express')
const tripRouter = require('./Routes/trip');
const userRouter = require('./Routes/user')
const supertest = require('supertest');
const mongoose = require('mongoose')
const Trip = require('./Models/TripModel')
const databaseName = 'TripHut_TEST2'
//BeforeAll or BeforeEach




/* TRIP CONTROLLER */
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
  
  const mockID = '619fb79bf1c1be15002b53f2'

  it('/trips/:id route should return corresponding trip', (done) => {
    request.post(`/trips/`)
    .send({postId: mockID})
    .then(result => {
      assert.equal(result.body.trip[0]._id, mockID)
      done()
    }).catch(done); //this fixes timeout issue
  })
})



/* USER CONTROLLER  */
describe('User Controller', async () => {
  const app = express()
  app.use(express.json())
  app.use(userRouter)
  const request = supertest(app)
  
  before(async() => {
    const dbLink = `mongodb://127.0.0.1/${databaseName}`
    await mongoose.connect(dbLink, {useNewUrlParser: true})
  })
  
  const mockUsername = 'JohnTest'

  it('/user/:username route should return corresponding user', (done) => {
    request.get(`/user/${mockUsername}`).then(result => {
      assert.equal(result.body.user.username, mockUsername)
      done()
    })
  })

  it('/user/:username/followers should return an array of followers', (done) =>{
    request.get(`/user/${mockUsername}/followers`).then(result => {
        console.log(result.body.followers)
      assert.equal(result.body.username, mockUsername);
      assert.typeOf(result.body.followers, 'array');
      assert.typeOf(result.body.followers[0]._id, 'string');
      done();
    }).catch(done); //this fixes timeout issue
  });
})