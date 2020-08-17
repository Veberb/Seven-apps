const { gql } = require('apollo-server');

const typeDefs = gql`
  extend type Mutation {
    createTask(task: TaskInput!): Task!
  }

  input TaskInput {
    title: String!
    description: String!
    status: String
    user: String!
  }

  type Task {
    _id: ID
    title: String
    description: String
    status: String
    user: ID
  }
`;

module.exports = typeDefs;