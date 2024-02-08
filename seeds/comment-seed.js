const {Comment} = require('../models');

const commentData = [
  {
    content: "Great Blog",
    user_id: 2,
    blogpost_id: 1,
  },
  {
    content: "Terrible Thoughts",
    user_id: 1,
    blogpost_id: 3,
  },
  {
    content: "A bit out there, but I can dance to this.",
    user_id: 1,
    blogpost_id: 4,
  },
  {
    content: "At least this was said once.",
    user_id: 3,
    blogpost_id: 5,
  },
  {
    content: "People who do not like this are wrong!",
    user_id: 6,
    blogpost_id: 3,
  },
  {
    content: "I say again... Baaaaaad",
    user_id: 1,
    blogpost_id: 3,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;