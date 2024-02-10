const { BlogPost, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', async(req, res)=>{
  try{
    const blogPosts = await BlogPost.findAll({
      attributes:{exclude:['user_id', 'createdAt', 'updatedAt']},
      include: [
      {
        model:Comment, 
        attributes:['content'], 
        include: [
          {
            model:User, attributes:['username']
          }], 
      }, 
      {
        model:User, attributes:['username'],
      }],
      
    });
    const temp = {
      isLoggedIn:req.session.logged_in
    };
    if(!blogPosts[0])
      return res.status(200).render('home', temp);
    
    temp.blogPosts = blogPosts;
    return res.status(200).render('home', temp);
    // return res.status(200).json(items);
  }catch(err){
    return res.status(500).send(err);
  }
});
router.get('/blog/:id', async(req, res)=>{
  try{
    if(!req.session.logged_in || !req.session.user_id)
      return res.redirect("/login");

    const blogPost = await BlogPost.findByPk(req.params.id, {
      attributes:{exclude:['user_id', 'createdAt', 'updatedAt']},
      include: [
      {
        model:Comment, 
        attributes:['content'], 
        include: [
          {
            model:User, attributes:['username']
          }], 
      }, 
      {
        model:User, attributes:['username'],
      }],
      
    });
    const temp = {
      isLoggedIn:req.session.logged_in
    };
    if(!blogPost)
      return res.status(404).redirect("/");
    
    temp.blogPost = blogPost;
    return res.status(200).render('blogpost', temp);
    
  }catch(err){
    return res.status(500).send(err);
  }
});
router.post("/comment", async(req, res) =>{
  try{
    if(!req.session.logged_in || !req.session.user_id)
      return res.redirect("/login");

    const newComment = req.body;
    newComment.user_id = req.session.user_id;
    const comment = await Comment.create(newComment);

    return res.status(200).json(comment);
  }catch(err){
    return res.status(500).send(err);
  }
});
router.get("/comments", async(req,res)=>{
  try{
    const items = await Comment.findAll();
    
    if(!items[0])
      return res.status(404).json({message: "NO comments found"});

    return res.status(200).json(items);
  }catch(err){
    return res.status(500).send(err);
  }
});
router.get("/dashboard", async(req, res)=>{
  try{
    if(!req.session.logged_in || !req.session.user_id)
      return res.redirect("/login");

    const user = await User.findByPk(req.session.user_id, {
      include: [{model:BlogPost,
        include: [
        {
          model:Comment, 
          attributes:['content'], 
          include: [
            {
              model:User, attributes:['username']
            }], 
        }]}, {model:Comment}],
    });

    if(!user)
      return res.status(404).redirect("/login");

    // console.log(user.dataValues.blogposts[0].dataValues.comments[0]);
    return res.status(200).render('dashboard', {
      user, 
      isLoggedIn:req.session.logged_in
    });
  }catch(err){
    return res.status(500).send(err);
  }
});
router.get('/create', async(req,res)=>{
  if(!req.session.logged_in || !req.session.user_id)
      return res.redirect("/login");

  return res.status(200).render('create');
});
router.get('/login', async(req, res)=>{
  res.render('user', {isLoggedIn:req.session.logged_in});
});


module.exports = router;