const Controller = require('egg').Controller;
const BaseController = require('./base');

class HouseController extends BaseController {
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    this.success(result);
  }

  async search() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const result = await ctx.service.house.search(params);
    this.success(result);
  }

  async detail() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const result = await ctx.service.house.detail(params.id);
    this.success({
      info: result,
      banner: result.imgs
    })
  }
}

module.exports = HouseController;