const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model { }

Book.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    coverUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pageCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
});

module.exports = Book;





