const Service = require('egg').Service;
const BaseService = require('./base');

class OrderService extends BaseService {
    async hasOrder(params) {
        return this.run(async (ctx) => {
            const result = await ctx.model.Orders.findOne({
                where: {
                    userId: params.userId,
                    houseId: params.houseId
                }
            })
            return result;
        })
    }
    async addOrder(params) {
        return this.run(async (ctx) => {
            const result = await ctx.model.Orders.create(params);
            return result;
        })
    }
    async delOrder(id) {
        return this.run(async (ctx) => {
            const result = await ctx.model.Orders.destroy({
                where: { id }
            });
            return result;
        })
    }
}

module.exports = OrderService;