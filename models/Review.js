const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Review extends Model {}

// define table columns and configuration
Review.init(
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        star_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        // define user_id column
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
        
    }
);

module.exports = Review;