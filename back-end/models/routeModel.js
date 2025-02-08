const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const RouteStop = require('./routeStopModel');
const Stop = require('./stopModel');
const Schedule = require('./scheduleModel');

const Route = sequelize.define('route', {
    id: {  
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false, 
    }
}, {
    tableName: 'rotas', 
    timestamps: false, 
});

Route.belongsToMany(Stop, { through: RouteStop, foreignKey: 'route_id' });
Route.hasMany(Schedule, { foreignKey: 'route_id', onDelete: 'CASCADE' });

module.exports = Route;
