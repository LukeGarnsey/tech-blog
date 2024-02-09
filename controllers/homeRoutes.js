const { BlogPost, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', async(req, res)=>{
  try{
    console.log(req.session.user_id);
    console.log(req.session.logged_in);
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
    
    return res.status(200).render('dashboard', {blogPosts});
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
router.get("/user/:id", async(req, res)=>{
  try{
    const item = await User.findByPk(req.params.id, {
      include: [{model:BlogPost}, {model:Comment}],
    });

    if(!item)
      return res.status(404).json({message: "NO Item found"});

    return res.status(200).json(item);
  }catch(err){
    return res.status(500).send(err);
  }
});
router.get('/login', async(req, res)=>{
  res.render('user');
});


module.exports = router;