const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Parada = sequelize.define('parada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    }
}, {
    tableName: 'paradas',
    timestamps: false
});

module.exports = Parada;
