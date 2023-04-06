const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class InProgress extends Model { }

InProgress.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    timeRemaining: {
        type: DataTypes.TIME,
        allowNull: true
    },
    book_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'books',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'inProgress'
});

module.exports = InProgress;