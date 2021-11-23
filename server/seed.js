const User = require('../Models/UserModel');
const Trip = require('../Models/TripModel');
import { Mongoose } from 'mongoose';
import faker from 'faker';
import bcrypt from 'bcryptjs';
import { RawUser, RecipeDB, UserDB } from '../lib/index';

export const DbSeedData = {
  users: [],
  recipes: []
}

export const random = (max)=> Math.floor(Math.random() * max);

export const seedDb = async (db) => {
  const users = Array.from({ length: 10 }, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullname: faker.internet.fullname(), //add fullname input
  }));
  await db.connection.models.User.insertMany(
    users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    }))
  );
  // Each user will have one trip;
  let trips = [];
  for (let i = 0; i < users.length; i++) {
    const userDB = await db.connection.models.User.findOne({
      email: users[i].email,
    });
    const trip = {

        title: 'Test Trip Title'

    //   keywords: Array.from({ length: Math.floor(Math.random() * 9) }, () =>
    //     faker.lorem.words()
    //   ),
    //   recipeIngredient: Array.from(
    //     { length: Math.floor(Math.random() * 9) },
    //     () => faker.lorem.sentence()
    //   ),
    //   recipeInstructions: Array.from(
    //     { length: Math.floor(Math.random() * 9) },
    //     () => faker.lorem.sentences()
    //   ),
    //   notes: [],
    //   name: faker.lorem.words(),
    //   recipeYield: '',
    //   image: faker.image.food(),
    //   author: faker.name.firstName(),
    //   url: faker.internet.url(),
    //   origin: users[i].username,
    //   userID: userDB._id,
    };
    trips.push(trip);
  }
  await db.connection.models.TripModels.insertMany(
    trips.map((trip) => ({ ...trip }))
  );
  return { users, trips };
};