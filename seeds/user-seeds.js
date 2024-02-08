const {User} = require('../models');

const userData = [
  {
    username: "jerimah88",
    password: "password",
  },
  {
    username: "cris2",
    password: "password",
  },
  {
    username: "templdoom",
    password: "password",
  },
  {
    username: "crazy88",
    password: "password",
  },
  {
    username: "Tourch0Lifer",
    password: "password",
  },
  {
    username: "1SkItrip1",
    password: "password",
  },
];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;