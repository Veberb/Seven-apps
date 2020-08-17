const Task = require('./task.schema');

const resolvers = {
  Mutation: {
    createTask: async (parent, { task }) => {
      return new Task({ ...task }).save();
    },
  },
};

module.exports = resolvers;
