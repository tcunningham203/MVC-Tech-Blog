const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const hbs = exphbs.create();
require('dotenv').config();

const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

app.use("/js", express.static(__dirname));
app.use("/css", express.static(__dirname));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js/")); // redirect JS jQuery
app.use(
  "/css",
  express.static(__dirname + "/node_modules/bootstrap/dist/css/")
); // redirect CSS bootstrap

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
