const { gql } = require('apollo-server');

const typeDefs = gql`
  extend type Mutation {
    createUser(user: UserInput!): User!
  }

  input UserInput {
    name: String!
    email: String
  }

  type User {
    _id: ID
    name: String!
    email: String
  }
`;

module.exports = typeDefs;
