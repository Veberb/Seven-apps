const { ApolloServer } = require('apollo-server-express');
const express = require('express');

// eslint-disable-next-line global-require
if (process.env.NODE_ENV !== 'test') require('./database');

const app = express();

const { typeDefs, resolvers } = require('./graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(4000);

module.exports = app;
