require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const sequelize = require('./config/database');
//const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./graphql');
const models = require('./models');

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    models,
    // mongoModels: require('./mongodb')  // Add MongoDB models for use in GraphQL resolvers
  }),
});

// Sync PostgreSQL with Sequelize
sequelize.sync()
  .then(() => {
    console.log('PostgreSQL connected');
    return server.listen({ port: process.env.PORT || 4000 });
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
