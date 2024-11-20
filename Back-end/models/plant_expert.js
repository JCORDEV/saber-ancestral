const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    expert_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "expert_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "expert_model"
      }
    },
    plant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "plant_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "plant_model"
      }
    }
  };
  const options = {
    tableName: "plant_expert",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const PlantExpertModel = sequelize.define("plant_expert_model", attributes, options);
  return PlantExpertModel;
};