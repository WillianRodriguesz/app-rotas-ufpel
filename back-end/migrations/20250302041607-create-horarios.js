'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('horarios', {
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
      horario: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('horarios');
  }
};
