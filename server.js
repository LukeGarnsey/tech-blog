const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');



const app = express();
const PORT = process.env.PORT || 3001;



const sess = {
  secret: "Super Secret secret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    
  },
  store: new SequelizeStore({
    db:sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create();//{helpers}


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force:false}).then(()=>{//{force:true}
  app.listen(PORT, () => console.log('Server Active and Listening'));
});