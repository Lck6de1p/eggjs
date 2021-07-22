module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Img = app.model.define('imgs', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      url: STRING,
      houseId: INTEGER,
      createTime: DATE,
  });
  return Img;
}