const User = require("./User");
const Castle = require("./Castle");
const Stamp = require("./Stamp");
const Review = require("./Review");
const Note = require("./Note");

User.hasMany(Stamp, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Stamp.belongsTo(User, {
  foreignKey: "user_id",
});

Stamp.belongsTo(Castle, {
  foreignKey: "castle_id",
});

Castle.hasOne(Stamp, {
  foreignKey: "castle_id",
});


User.hasMany(Review, {
  foreignKey: 'user_id'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

Castle.hasMany(Note, {
  foreignKey: "castle_id",
  onDelete: "CASCADE",
});

Note.belongsTo(User, {
  foreignKey: "user_id",
});

Note.belongsTo(Castle, {
  foreignKey: "castle_id",
});




module.exports = { User, Stamp, Castle, Review, Note };