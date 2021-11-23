const assert = require('chai').assert;
const express = require('express')
const tripRouter = require('./Routes/trip');
const userRouter = require('./Routes/user')
const supertest = require('supertest');
const mongoose = require('mongoose')
const Trip = require('./Models/TripModel')
const databaseName = 'TripHut_TEST'
const request = supertest(app);


//server stuff from santi
const { bootDB } = require('./startDb');
const { bootServer } = require('./startServer');

require('dotenv').config();

const PORT = 3005 //port you want to use
const connectionString = `mongodb://127.0.0.1/${databaseName}` //link to mongoDB

bootDB(connectionString);
bootServer(PORT);

//BeforeAll or BeforeEach

let server;
let db;
let mockUsers;
let accessToken;

const fakeUserInfo = {
  email:" test@test.com",
  username: "test1234",
  password: "test1234",
  fullname: "test name",
}

describe('Trip Controller', async () => {

  beforeAll(async () => {
    db = await bootDB(connectionString);
    if (db) {
      await db?.connection.db.dropDatabase();
      const seedData = await seedDb(db); //figure out what to do with seedDb
      mockUsers = seedData.users;
      mockTrips = seedData.trips;
    }
    server = bootServer(port);
  });
  
  it('/alltrips route should return array of objects', (done) => {
    request.get('/alltrips').then(trips => {
      const result = trips.body.trips;
      assert.typeOf(result, 'array');
      done()
    })
  })
  
  const mockID = '61968e58e22942b53f4b02f4'

  it('/trips/:id route should return corresponding trip', (done) => {
    request.post('/trips/')
      .send({postId: mockID})
      .then(result => {
        assert.equal(result.body.trip[0]._id, mockID)
      done()
    })
  })

  afterAll(async () => {
    await db?.connection.close();
    server.close();
  });
})




describe('User Controller', async () => {

  beforeAll(async () => {
    db = await bootDB(connectionString);
    if (db) {
      await db?.connection.db.dropDatabase();
      const seedData = await seedDb(db); //figure out what to do with seedDb
      mockUsers = seedData.users;
      mockTrips = seedData.trips;
    }
    server = bootServer(port);
  });
  

  const mockUsername = 'John'

  it('/user/:username route should return corresponding user', (done) => {
    request.get(`/user/${mockUsername}`).then(result => {
      //console.log(result.body.user.username)
      assert.equal(result.body.user.username, mockUsername)
      done()
    })
  })

  
  it('/:userId/followers should return an array of followers', (done) =>{
    request.get(`/user/${mockUsername}/followers`).then(result => {
      assert.equal(result.body.username, mockUsername);
      assert.typeOf(result.body.followers, 'array');
      //assert.typeOf(result.body.followers[0]._id, 'string');
      done();
    });
  });

  afterAll(async () => {
    await db?.connection.close();
    server.close();
  });
})

//const userID = '61967b0fe22942b53f4b01a8'