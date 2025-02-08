const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Route = require('./routeModel');
const Stop = require('./stopModel');

const RouteStop = sequelize.define('route_stop', {
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
    stop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Stop,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'rota_paradas', 
    timestamps: false, 
    indexes: [
        {
            unique: true,
            fields: ['route_id', 'order']
        }
    ]
});

RouteStop.belongsTo(Route, { foreignKey: 'route_id' });
RouteStop.belongsTo(Stop, { foreignKey: 'stop_id' });

module.exports = RouteStop;
