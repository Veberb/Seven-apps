const Task = require('./task.schema');

const resolvers = {
  Query: {
    getTask: (parent, { id }) => {
      return Task.findById(id);
    },
    listTasks: async (parent, { task = {}, offset = 1, limit = 10 }) => {
      const query = {};
      const { title, description, status, user } = task;

      if (title) query.title = new RegExp(title);
      if (description) query.description = new RegExp(description);
      if (status) query.status = status;
      if (user) query.user = user;

      const [tasks, totalTasks] = await Promise.all([
        Task.find(query)
          .skip((offset - 1) * limit)
          .limit(limit),
        Task.countDocuments(query),
      ]);

      return { tasks, totalTasks };
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
