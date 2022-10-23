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
    // Altura
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Peso
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Años de vida / Esperanza de vida
    life_span: {
      type: DataTypes.STRING,
    },
    // Raza
    breed_group: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
};
