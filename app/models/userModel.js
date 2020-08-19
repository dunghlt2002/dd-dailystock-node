module.exports = (sequelize, Sequelize) => {

    const User_data = sequelize.define("user_data", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      isadmin: {
        type: Sequelize.INTEGER
      }
    }
    , 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,  // tat updatedAt createdAt
      underscored: true   // khong tao them column customer_id
    });
   
    return User_data;
  
   };  // cua export
  