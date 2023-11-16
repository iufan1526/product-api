import { Model, DataTypes } from 'sequelize';
import db from '../models/index.cjs';

class Product extends Model {
    static associate(models) {
        // define association here
    }
}

Product.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_state: {
            type: db.Sequelize.ENUM('FOR_SALE', 'SOLD_OUT'),
            defaultValue: 'FOR_SALE',
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: db.sequelize,
        modelName: 'Product',
        timestamps: false,
    }
);

export default Product;
