const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Route = require('./routeModel');

const Schedule = sequelize.define('schedule', {
    id: {  
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Route,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false, 
    }
}, {
    tableName: 'horarios', 
    timestamps: false, 
});

Schedule.belongsTo(Route, { foreignKey: 'route_id' });

module.exports = Schedule;
