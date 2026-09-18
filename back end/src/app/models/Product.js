import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING,
      price: Sequelize.INTEGER,
      offer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      category_id: Sequelize.INTEGER,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3000/product-files/${this.path}`;
        },
      },
    }, {
      sequelize,
      tableName: 'products',
      timestamps: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Product;