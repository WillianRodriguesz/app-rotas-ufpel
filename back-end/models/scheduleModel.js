const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Rota = require('./routeModel');

const Horario = sequelize.define('horario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'horarios',
    timestamps: false
});

Horario.associate = (models) => {
    Horario.belongsTo(models.Rota, {
        foreignKey: 'rota_id',
        onDelete: 'CASCADE'
    });
};

module.exports = Horario;
