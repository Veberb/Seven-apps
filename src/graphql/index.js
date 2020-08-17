const { gql } = require('apollo-server');

const UserResolver = require('../modules/user/user.resolvers');
const UserTypes = require('../modules/user/user.types');

const TaskResolver = require('../modules/task/task.resolvers');
const TaskTypes = require('../modules/task/task.types');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = {
  typeDefs: [linkSchema, UserTypes, TaskTypes],
  resolvers: [UserResolver, TaskResolver],
};
