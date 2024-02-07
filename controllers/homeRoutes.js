const router = require('express').Router();

router.get('/', async(req, res)=>{
  res.send("on Homepage");
});
router.get('/login', async(req, res)=>{
  res.send("on Login page");
});


module.exports = router;