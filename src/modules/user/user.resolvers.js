const { UserInputError } = require('apollo-server');

const User = require('./user.schema');

const resolvers = {
  Query: {
    getUser: (parent, { id }) => {
      return User.findById(id);
    },
    listUsers: async (parent, { user = {}, offset = 1, limit = 10 }) => {
      const query = {};
      const { name, email } = user;

      if (name) query.name = new RegExp(name);
      if (email) query.email = new RegExp(email);

      const [users, totalUsers] = await Promise.all([
        User.find(query)
          .skip((offset - 1) * limit)
          .limit(limit),
        User.countDocuments(query),
      ]);

      return { users, totalUsers };
    },
  },
  Mutation: {
    createUser: async (parent, { user }) => {
      const foundUser = await User.countDocuments({ name: user.name });
      if (foundUser)
        throw new UserInputError('Já existe um usuário com o nome informado');

      return new User({ ...user }).save();
    },
  },
};

module.exports = resolvers;
