const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Años de vida / Esperanza de vida
    life_span: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    // Altura
    maxHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Peso
    maxWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataBaseDog: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
