const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection'); 
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({ helpers });
require('dotenv').config();

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));

app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
