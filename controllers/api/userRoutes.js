const { User } = require('../../models');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.post('/login', async(req, res)=>{
  try{
    const user = await User.findOne({where:{username: req.body.username}});
    if(!user)
      return res.status(400).json({message: 'Incorrect email or password'});
    
    const valid = await user.checkPassword(req.body.password);
    if(!valid)
      return res.status(400).json({message: 'Incorrect email or password'});

    req.session.save(()=>{
      console.log("session save");
      req.session.user_id = user.id;
      req.session.logged_in = true;
      return res.status(200).send("Login Successful");
    });
  }catch(err){
    return res.status(400).json(err);
  }
});
router.post('/register', async(req, res)=>{
  try{
    const user = await User.create(req.body);
    
    req.session.save(()=>{
      req.session.user_id = user.id;
      req.session.logged_in = true;
      return res.status(200).send("User Signed Up");
    });
    
  }catch(err){
    res.status(400).json(err);
  }
});
router.post('/logout', async(req, res)=>{
  try{
    req.session.destroy(()=>{
      return res.status(204).end();
    });
    
  }catch(err){
    return res.status(404).end();
  }
});

module.exports = router;