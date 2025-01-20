const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const Motorista = sequelize.define('motorista', {
    id_motorista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, 
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false, 
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    dt_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    }
}, {
    tableName: 'motoristas', 
    timestamps: false, 
});

module.exports = Motorista;
