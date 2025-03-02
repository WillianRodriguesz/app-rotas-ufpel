'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rota_paradas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rota_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rotas',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      parada_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'paradas',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      ordem: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('rota_paradas', {
      fields: ['rota_id', 'ordem'],
      type: 'unique',
      name: 'unique_rota_ordem'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rota_paradas');
  }
};
