const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Stop = sequelize.define('stop', {
    id: {  
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false, 
    },
    latitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false, 
    },
    longitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false, 
    }
}, {
    tableName: 'paradas', 
    timestamps: false, 
});

module.exports = Stop;
