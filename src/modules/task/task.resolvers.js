const Task = require('./task.schema');

const resolvers = {
  Mutation: {
    createTask: async (parent, { task }) => {
      return new Task({ ...task }).save();
    },
    deleteTask: async (parent, { id }) => {
      return Task.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
