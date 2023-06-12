const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const db = {};

// Load models
db.User = require('./models/User');
db.Post = require('./models/Post');
db.Comment = require('./models/Comment');

// Define model associations
db.User.hasMany(db.Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
db.Post.belongsTo(db.User, {
  foreignKey: 'user_id',
});
db.Post.hasMany(db.Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});
db.Comment.belongsTo(db.Post, {
  foreignKey: 'post_id',
});
db.User.hasMany(db.Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
db.Comment.belongsTo(db.User, {
  foreignKey: 'user_id',
});

module.exports = db;
