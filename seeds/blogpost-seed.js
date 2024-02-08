const {BlogPost} = require('../models');

const blogData = [
  {
    title: "Top 5 Keyboard Keys",
    content: "The best possible keys to use in tech are!! T, P, B, 3, U",
    user_id: 4,
  },
  {
    title: "Why do we need Electricity",
    content: "Most tech can run with no outside power, so why are we held captive?",
    user_id: 1,
  },
  {
    title: "Best kind of color",
    content: "In tech, the only kind of color you should care about is blue.",
    user_id: 2,
  },
  {
    title: "Where to work?",
    content: "Obviously you should work under a bridge for safety.",
    user_id: 3,
  },
  {
    title: "How to drink water",
    content: "Drinking can be challenging.. even for a tech pro like me! So just hold on tight to that glass.",
    user_id: 5,
  },
];

const seedBlogPost = () => BlogPost.bulkCreate(blogData);
module.exports = seedBlogPost;