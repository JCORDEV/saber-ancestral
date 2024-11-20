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
    common_name: {
      type: DataTypes.CHAR(150),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "common_name",
      autoIncrement: false
    },
    scientific_name: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "scientific_name",
      unique: true,
      autoIncrement: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "description",
      autoIncrement: false
    },
    habitat: {
      type: DataTypes.CHAR(200),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "habitat",
      autoIncrement: false
    },
    medicinal_uses: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "medicinal_uses",
      autoIncrement: false
    },
    preparation_method: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "preparation_method",
      autoIncrement: false
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "benefits",
      autoIncrement: false
    },
    precautions: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "precautions",
      autoIncrement: false
    },
    availability: {
      type: DataTypes.CHAR(150),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "availability",
      autoIncrement: false
    },
    image: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "image",
      autoIncrement: false
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "category_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "category_model"
      }
    },
  };
  const options = {
    tableName: "plant",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const PlantModel = sequelize.define("plant_model", attributes, options);

  PlantModel.associate = (models) => {
    PlantModel.belongsToMany(models.expert_model, {
      through: models.plant_expert_model,
      foreignKey: 'plant_id',
      otherKey: 'expert_id',
      as: 'experts'
    });

    PlantModel.belongsTo(models.category_model, {
      foreignKey: 'category_id',
      as: 'category',
    });
  };

  return PlantModel;
};