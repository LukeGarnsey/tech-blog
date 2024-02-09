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

module.exports = router;