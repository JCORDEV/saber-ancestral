const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(150),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false
    },
    expertise_area: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "expertise_area",
      autoIncrement: false
    },
    contact: {
      type: DataTypes.CHAR(200),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "contact",
      autoIncrement: false
    },
    image: {
      type: DataTypes.CHAR(200),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "image",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "expert",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const ExpertModel = sequelize.define("expert_model", attributes, options);
  
  ExpertModel.associate = (models) => {
    ExpertModel.belongsToMany(models.plant_model, {
      through: models.plant_expert_model,
      foreignKey: 'expert_id',
      otherKey: 'plant_id',
      as: 'plants'
    });
  };
  
  return ExpertModel;
};