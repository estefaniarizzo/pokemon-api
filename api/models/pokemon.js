'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pokemon.belongsToMany(models.Type, { through: 'TipoPokemon' });
    }
  }
  Pokemon.init({
    nombre: DataTypes.STRING,
    imagen: DataTypes.STRING,
    vida: DataTypes.INTEGER,
    ataque: DataTypes.INTEGER,
    defensa: DataTypes.INTEGER,
    velocidad: DataTypes.INTEGER,
    altura: DataTypes.FLOAT,
    peso: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};