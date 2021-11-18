const assert = require('chai').assert;
const request = require('supertest');
const express = require('express')
const app = require('./server/server')
const authController = require('./server/Controller/authController');
const tripController = require('./server/Controller/tripController');
const mocks = require('node-mocks-http');

//BeforeAll or BeforeEach

describe ('Server' , () => {
  describe('Trip Controller', () => { 
    it('getAllTrips should return array', async () => {
      
      //const req = {test: 'testREQ'}   //mocks.createRequest();
      //console.log('checking req', req)
      
      //const res = mocks.createResponse(); 

      const response = await tripController.getAllTrips(req, res)
        console.log("response: ", + response)
     
    })
  })
})