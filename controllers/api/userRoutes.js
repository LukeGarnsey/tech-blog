const router = require('express').Router();

router.post('/login', async(req, res)=>{
  try{
    //setup session cookie to have user logged in
    //VErify user is in DB
    res.status(200).send("User logged in");
  }catch(err){
    res.status(400).json(err);
  }
});
router.post('/signup', async(req, res)=>{
  try{
    //setup session cookie to have user logged in
    //create User in DB
    res.status(200).send("User Signed Up");
  }catch(err){
    res.status(400).json(err);
  }
});
router.post('/logout', async(req, res)=>{
  try{
    //Destroy session cookie
    res.status(204).end();
  }catch(err){
    res.status(404).end();
  }
});

module.exports = router;