const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class BlogPost extends Model{

}

BlogPost.init({
  id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  contents:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:'user',
      key: 'id',
    }
  }
},{
  sequelize,
  timestamps:true,
  freezeTableName:true,
  underscored:true,
  modelName:'blogpost',
});

module.exports = BlogPost;