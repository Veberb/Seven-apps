const { ApolloServer } = require('apollo-server-express');
const express = require('express');

require('./database');

const app = express();

const { typeDefs, resolvers } = require('./graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(4000);

module.exports = app;
