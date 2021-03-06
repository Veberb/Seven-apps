const { gql } = require('apollo-server');

const typeDefs = gql`
  extend type Mutation {
    createTask(task: TaskInput!): Task!
    updateTask(task: TaskInput!, id: String!): Task
    deleteTask(id: String!): Task!
  }

  extend type Query {
    getTask(id: String!): Task
    listTasks(task: TaskInput, offset: Int, limit: Int): TaskPagination
  }

  type TaskPagination {
    tasks: [Task]
    totalTasks: Int
  }

  input TaskInput {
    title: String
    description: String
    status: String
    user: String
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
