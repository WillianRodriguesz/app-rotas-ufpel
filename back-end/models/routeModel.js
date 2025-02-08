const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Rota = sequelize.define('rota', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'rotas',
    timestamps: false
});

module.exports = Rota;
