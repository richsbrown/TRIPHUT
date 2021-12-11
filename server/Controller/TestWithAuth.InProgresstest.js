// Endpoint testing with mocha and chai and chai-http

    // Import libraries
    const chai = require('chai');
    //const chaiHttp = require('chai-http');
    const should = chai.should();
    var mongoose = require("mongoose");

    // Import server
    var server = require('../testingServer');

    // Import Todo Model
    var Trip = require("../Models/TripModel");
    var User = require("../Models/UserModel");

    // use chaiHttp for making the actual HTTP requests        
    //chai.use(chaiHttp);

    describe('Trip & User API', function() {

        it('should Register user, login user, check token and delete a trip on /trip/<id> DELETE', function(done) {
            chai.request(server)

                // register request
                .post('/auth/register')

                // send user registration details
                .send({
                        'fullName': 'Jeremy Doe',
                        'email': 'testjeremy@gmail.com',
                        'password': '123456'
                    }

                ) // this is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // when we get a resonse from the endpoint

                    // in other words,
                    // the res object should have a status of 201
                    res.should.have.status(201);

                    // follow up with login
                    chai.request(server)
                        .post('/auth/sign_in')
                        // send user login details
                        .send({
                            'email': 'testjeremy@gmail.com',
                            'password': '123456'
                        })
                        .end((err, res) => {
                            console.log('this runs the login part');
                            res.body.should.have.property('token');
                            var token = res.body.token;

                            // follow up with requesting user protected page
                            chai.request(server)
                                .get('/user/:id/trips')
                                .end(function(err, res) {
                                    chai.request(server)
                                        .delete('/:tripId/delete' + res.body[0]._id)

                                        // we set the auth header with our token
                                        .set('Authorization', 'JWT ' + token)
                                        .end(function(error, resonse) {
                                            resonse.should.have.status(200);
                                            resonse.body.should.have.property('message');
                                            resonse.body.message.should.equal('Authorized User, Action Successful!');
                                            done();
                                        });
                                })
                        })
                })
        })
    })