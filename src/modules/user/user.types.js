const { gql } = require('apollo-server');

const typeDefs = gql`
  extend type Mutation {
    createUser(user: UserInput!): User!
  }

  extend type Query {
    getUser(id: String!): User
    listUsers(user: UserInput, offset: Int, limit: Int): UserPagination
  }

  type UserPagination {
    users: [User]
    totalUsers: Int
  }

  input UserInput {
    name: String
    email: String
  }

  type User {
    _id: ID
    name: String!
    email: String
  }
`;

module.exports = typeDefs;
