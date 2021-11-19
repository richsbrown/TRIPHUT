const express = require('express');
const cors = require("cors")
const request = require('supertest');
const supertest = require('supertest');
const assert = require('chai').assert;
const mongoose = require('mongoose');
const databaseName = 'TripHut_TEST2';
//const {beforeAll, afterEach} = require('jest');

const app = require('../server');
const authRouter = require("../Routes/user");
const authController = require('./userController');
const User = require('../Models/UserModel');
const mocks = require('node-mocks-http');
const { expect } = require('chai');
const { afterEach, after } = require('mocha');

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

describe('Intagration tests', () => {

    const app = express();
    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(authRouter)
    const request = supertest(app);

    before(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url, {useNewUrlParser: true});
    });

    // afterEach(async () => {
    //     await User.deleteMany();
    // });

    after(async () => {
        await mongoose.disconnect()
    })

    it('should save a new user to the database', async () => {
// email, fullname, username, password
        const email = 'test1@gmail.com';
        const fullname = 'John Doe Test';
        const username = 'JohnTest';
        const password = '123456';

        const res = await request.post('/signup', )
        .send({email, fullname, username, password})

        const user = await User.findOne({username})
        expect(user.username).to.equal(username)
        await User.findOneAndDelete({username})
    });


})


