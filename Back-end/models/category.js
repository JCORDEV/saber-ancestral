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
      unique: true,
      autoIncrement: false
    },
  };
  const options = {
    tableName: "category",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const CategoryModel = sequelize.define("category_model", attributes, options);

  CategoryModel.associate = (models) => {
    CategoryModel.hasMany(models.plant_model, {
        foreignKey: 'category_id',
        as: 'plants',
    });
  };
  return CategoryModel;
};