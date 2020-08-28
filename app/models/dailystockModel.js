module.exports = (sequelize, Sequelize) => {

    const DailyStock_data = sequelize.define("dailystock", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.STRING
      },
      symbolcode: {
        type: Sequelize.STRING
      },
      entrypoint: {
        type: Sequelize.STRING
      },
      exitpoint: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.STRING
      },
      s_image: {
        type: Sequelize.STRING
      },
      netincome: {
        type: Sequelize.STRING
      },
      stocolor: {
        type: Sequelize.STRING
      },
      rsicolor: {
        type: Sequelize.STRING
      },
      macdcolor: {
        type: Sequelize.STRING
      },
      macd_htf: {
        type: Sequelize.STRING
      },
      macd_htf: {
        type: Sequelize.STRING
      },
      macd_htf: {
        type: Sequelize.STRING
      },
      macd_htf: {
        type: Sequelize.STRING
      },
      timeframe: {
        type: Sequelize.INTEGER
      },
      buyshort: {
        type: Sequelize.INTEGER
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
   
    return DailyStock_data;
  
   };  // cua export
  