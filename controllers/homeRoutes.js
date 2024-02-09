const { BlogPost, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', async(req, res)=>{
  try{
    const blogPosts = await BlogPost.findAll({
      attributes:{exclude:['user_id', 'id', 'createdAt', 'updatedAt']},
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
    if(!blogPosts[0])
      return res.status(404).json({message: "NO blogposts found"});
    const temp = {
      blogPosts, 
      isLoggedIn:req.session.logged_in
    };
    console.log(temp);
    return res.status(200).render('home', temp);
    // return res.status(200).json(items);
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