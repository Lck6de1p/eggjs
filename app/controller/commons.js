const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {

    this.success(
      [
        [
          {
            label: "杭州",
            value: "10001"
          },
          {
            label: "苏州",
            value: "10002"
          },
        ]
      ]
    );
  }
}

module.exports = CommonsController;