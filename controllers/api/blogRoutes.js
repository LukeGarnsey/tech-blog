const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');

router.get('/', async(req, res)=>{
  try{
    const items = await BlogPost.findAll({
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
    if(!items[0])
      return res.status(404).json({message: "NO blogposts found"});

    return res.status(200).json(items);
  }catch(err){
    return res.status(500).send(err);
  }
});
router.get("/user/:id", async(req, res)=>{
  try{
    const user = await User.findByPk(req.params.id, {
      include: [{model:BlogPost}, {model:Comment}],
    });

   
    return res.status(200).json(user);
  }catch(err){
    return res.status(500).send(err);
  }
});
router.post("/create", async(req, res)=>{
  try{
    if(!req.session.logged_in || !req.session.user_id)
      return res.redirect("/login");
    const newBlog = req.body;
    newBlog.user_id = req.session.user_id;
    const blog = await BlogPost.create(newBlog);

    return res.status(200).json(blog);
  }catch(err){
    return res.status(500).send(err);
  }
});

module.exports = router;