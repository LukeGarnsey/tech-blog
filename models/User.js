const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model{

    
}

User.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isAlpha:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len: (8),
        }
    }
},
{
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'user',
}
);

module.exports = User;