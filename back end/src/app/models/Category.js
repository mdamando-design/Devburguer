import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3000/category-files/${this.path}`;
        },
      },
      },
      {
        sequelize,
        tableName: 'categories',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products',
    });
  }
}

export default Category;
