const sequelize = require('../config/connection');
const seedBlogPost = require('./blogpost-seed');
const seedComment = require('./comment-seed');
const seedUser = require('./user-seeds');
const seedAll = async()=>{
  await sequelize.sync({force:true});
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUser();
  console.log('\n----- User Seeded -----\n');
  await seedBlogPost();
  console.log('\n----- blog post seeded -----\n');
  await seedComment();
  console.log('\n----- comments seeded -----\n');
  process.exit(0);
};

seedAll();