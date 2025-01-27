require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,  
    },
    connectTimeout: 10000 
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
});

try {
    console.log('Attempting connection with URL:', process.env.DATABASE_URL);
  } catch (error) {
    console.error('Detailed connection error:', error.message, error.stack);
  }

  const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('Direct PG connection successful'))
  .catch(err => console.error('Direct PG connection failed:', err));

sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.log('Unable to connect to the database:', err);
        });

module.exports = sequelize;
