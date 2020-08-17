const CREATE_USER = `
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      name
    }
  }
`;

const LIST_USERS = `
  query ListUser($user: UserInput) {
    listUsers(user: $user){
      totalUsers
      users{
        _id
        name
        email
      }
    }
  }
`;

module.exports = { CREATE_USER, LIST_USERS };
