const MongoMemory = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const server = require('../../src');
const { CREATE_USER, LIST_USERS } = require('./query');

const User = require('../../src/modules/user/user.schema');

let mongod;
describe('User Test', () => {
  before(async () => {
    mongod = new MongoMemory();
    const conn = await mongoose.connect(await mongod.getConnectionString(), {
      useNewUrlParser: true,
    });

    const data = [...Array(10).keys()].map((element) =>
      new User({
        name: `Lucas${element}`,
        email: 'lucasveberdebrida@gmail.com',
      }).save()
    );
    await Promise.all(data);
    return conn;
  });

  it('Create User', (done) => {
    request(server)
      .post('/graphql')
      .send({
        query: CREATE_USER,
        variables: {
          user: {
            name: 'Bubbles',
            email: 'bubbles@gmail.com',
          },
        },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.createUser).to.have.property('name');
        done();
      });
  });
  it('Duplicate user name', (done) => {
    request(server)
      .post('/graphql')
      .send({
        query: CREATE_USER,
        variables: {
          user: { name: 'Bubbles', email: 'bubbles@gmail.com' },
        },
      })
      .end((err, res) => {
        expect(res.body.errors[0].message).to.contains(
          'Já existe um usuário com o nome informado'
        );
        done();
      });
  });
  it('Create User', (done) => {
    request(server)
      .post('/graphql')
      .send({
        query: CREATE_USER,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.errors[0].message).to.contains(
          `Variable "$user" of required type "UserInput!" was not provided`
        );

        done();
      });
  });
  it('Testing pagination', (done) => {
    request(server)
      .post('/graphql')
      .send({
        query: LIST_USERS,
      })
      .end((err, res) => {
        expect(res.body.data.listUsers).to.have.property('totalUsers');
        expect(res.body.data.listUsers).to.have.property('users');
        expect(res.body.data.listUsers.totalUsers).equals(11);
        expect(res.body.data.listUsers.users).to.be.an('array');
        expect(res.body.data.listUsers.users).to.have.lengthOf(10);

        done();
      });
  });
  it('Testing pagination with filter', (done) => {
    request(server)
      .post('/graphql')
      .send({
        query: LIST_USERS,
        variables: {
          user: { name: 'Lucas7' },
        },
      })
      .end((err, res) => {
        expect(res.body.data.listUsers).to.have.property('totalUsers');
        expect(res.body.data.listUsers).to.have.property('users');
        expect(res.body.data.listUsers.totalUsers).equals(1);
        expect(res.body.data.listUsers.users).to.be.an('array');
        expect(res.body.data.listUsers.users).to.have.lengthOf(1);

        done();
      });
  });
  after(() => {
    mongod.stop();
  });
});
