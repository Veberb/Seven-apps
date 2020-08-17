const Task = require('./task.schema');

const resolvers = {
  Query: {
    getTask: (parent, { id }) => {
      return Task.findById(id);
    },
  },
  Mutation: {
    createTask: async (parent, { task }) => {
      return new Task({ ...task }).save();
    },
    updateTask: async (parent, { task, id }) => {
      return Task.findByIdAndUpdate(
        id,
        { $set: { ...task } },
        { new: true, runValidators: true }
      );
    },

    deleteTask: async (parent, { id }) => {
      return Task.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
