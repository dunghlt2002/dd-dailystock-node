module.exports = (sequelize, Sequelize) => {

    const Content_cat_data = sequelize.define("content_cat", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content_cat_desc: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.STRING
      }
    }
    , 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: true,  // ON updated_at created_at
      underscored: true   // khong tao them column customer_id
    });
   
    return Content_cat_data;
  
   };  // cua export
  