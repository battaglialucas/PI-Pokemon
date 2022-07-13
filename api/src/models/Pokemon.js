const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isInt: {
            msg: "Id must be an integer number",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: {
          msg: "name Must only contains letters",
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      life: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "life must be an integer number",
          },
        },
      },
      strength: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "strength must be an integer number",
          },
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "defense must be an integer number",
          },
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "speed must be an integer number",
          },
        },
      },
      height: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "height must be an integer number",
          },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "weight must be an integer number",
          },
        },
      },
    },
    { timestamps: false }
  );
};
