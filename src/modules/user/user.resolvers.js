const { UserInputError } = require('apollo-server');

const User = require('./user.schema');

const resolvers = {
  Mutation: {
    createUser: async (parent, { user }) => {
      const foundUser = await User.countDocuments({ name: user.name });
      if (foundUser)
        throw new UserInputError('Já existe um usuário com o email informado');

      return new User({ ...user }).save();
    },
  },
};

module.exports = resolvers;
