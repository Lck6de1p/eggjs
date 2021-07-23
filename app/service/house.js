'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const BaseService = require('./base')

class HouseService extends BaseService {

  commAttr(app) {
    return {
      order: [
        ['showCount', 'DESC']
      ],
      attributes: {
        exclude: ['startTime', 'endTime', 'publishTime']
      },
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          attributes: ['url']
        }
      ]
    }
  }

  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        limit: 4,
        ...this.commAttr(app)
      })
      return result;
    })
  }

  async search(params) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const where = {
        cityCode: params.code,
        startTime: {
          [lte]: params.startTime
        },
        endTime: {
          [gte]: params.endTime
        },
        name: {
          [like]: `%${params.houseName}%`
        }
      }
      if (!params.houseName) {
        delete where.name
      }
      const result = await ctx.model.House.findAll({
        limit: 8,
        offset: (params.pageNum - 1) * params.pageSize,
        where,
        ...this.commAttr(app)
      })
      return result;
    })
  }

  async detail(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        where: {
          id
        },
        include: {
          model: app.model.Imgs,
          attributes: ['url']
        }
      })

      await ctx.model.House.update({
        showCount: result.showCount + 1
      }, {
        where: {
          id
        }
      })
      return result;
    })
  }

}

module.exports = HouseService;
