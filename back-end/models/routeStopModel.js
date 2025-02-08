const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Rota = require('./routeModel');
const Parada = require('./stopModel');

const RotaParada = sequelize.define('rotaParada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ordem: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'rota_paradas',
    timestamps: false
});

RotaParada.associate = (models) => {
    RotaParada.belongsTo(models.Rota, {
        foreignKey: 'rota_id',
        onDelete: 'CASCADE'
    });
    RotaParada.belongsTo(models.Parada, {
        foreignKey: 'parada_id',
        onDelete: 'CASCADE'
    });
};

module.exports = RotaParada;
