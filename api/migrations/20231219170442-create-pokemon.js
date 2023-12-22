'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      vida: {
        type: Sequelize.INTEGER
      },
      ataque: {
        type: Sequelize.INTEGER
      },
      defensa: {
        type: Sequelize.INTEGER
      },
      velocidad: {
        type: Sequelize.INTEGER
      },
      altura: {
        type: Sequelize.FLOAT
      },
      peso: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pokemons');
  }
};