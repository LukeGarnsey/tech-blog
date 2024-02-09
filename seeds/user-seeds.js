const {User} = require('../models');

const userData = [
  {
    username: "jerimah88",
    password: "qwertuioy",
  },
  {
    username: "cris2",
    password: "password123",
  },
  {
    username: "templdoom",
    password: "1qaz2wssxd3e",
  },
  {
    username: "crazy88",
    password: "ef3f5gnn5",
  },
  {
    username: "Tourch0Lifer",
    password: "347329047320478203",
  },
  {
    username: "1SkItrip1",
    password: "KSFJIE883*#@#@",
  },
];

const seedUser = () => User.bulkCreate(userData, {individualHooks:true});
module.exports = seedUser;