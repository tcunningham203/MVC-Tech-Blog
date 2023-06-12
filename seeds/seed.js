const sequelize = require("../config/connection");
const { User, Comment, Post } = require('../models');

const userData = require("./userData.json");
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }
  
  process.exit(0);
};


seedDatabase();
