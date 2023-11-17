import { Model, DataTypes } from 'sequelize';
import db from '../models/index.cjs';
import Product from './product.js';

class User extends Model {
    static associate(models) {
        User.hasMany(Product, {
            foreignKey: 'user_id',
        });
    }
}

User.init(
    {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: db.sequelize,
        modelName: 'User',
        timestamps: false,
    }
);

export default User;
