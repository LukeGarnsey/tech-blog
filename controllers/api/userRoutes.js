const { User } = require('../../models');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.post('/login', async(req, res)=>{
  try{
    console.log(req.body);
    const user = await User.findOne({where:{username: req.body.username}});
    //setup session cookie to have user logged in
    //VErify user is in DB
    if(!user)
      return res.status(400).json({message: 'Incorrect email or password'});
    
    const valid = await user.checkPassword(req.body.password);
    if(!user)
      return res.status(400).json({message: 'Incorrect email or password'});

      req.session.save(()=>{
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
    //setup session cookie to have user logged in
    //create User in DB
    const newUser = req.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
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