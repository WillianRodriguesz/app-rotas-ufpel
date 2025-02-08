const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const Usuario = sequelize.define('usuario', {
    id_usuario: {  
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
    motorista: {  
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    dt_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    }
}, {
    tableName: 'usuarios', 
    timestamps: false, 
});

module.exports = Usuario;
