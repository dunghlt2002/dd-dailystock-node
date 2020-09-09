module.exports = (sequelize, Sequelize) => {

    const Content_data = sequelize.define("contents", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subject: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.STRING
      },
      c_body: {
        type: Sequelize.STRING
      },
      c_view: {
        type: Sequelize.STRING
      },
      content_cat_id: {
        type: Sequelize.STRING
      },
      s_image: {
        type: Sequelize.STRING
      },
      b_image: {
        type: Sequelize.INTEGER
      }
    }
    , 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: true,  // ON updated_at created_at
      underscored: true   // khong tao them column customer_id
    });
   
    return Content_data;
  
   };  // cua export
  