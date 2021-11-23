import { connect, Mongoose } from 'mongoose';

const bootDB = async (connectionString) => {
  try {
    const connection = await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Successfully connected to the database.');
    return connection;
  } catch (err) {
    console.log('[Database connection error]:\n', err);
  }
};

module.exports = {
  bootDB,
};