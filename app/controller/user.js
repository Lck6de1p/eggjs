'use strict';
const Controller = require('egg').Controller;
const md5 = require('md5');
const dayjs = require('dayjs');
const BaseController = require('./base');

class UserController extends BaseController {

  async jwtSign({id, username}) {
    const { ctx, app } = this;

    const token = app.jwt.sign({
      id,
      username
    }, app.config.jwt.secret)
    // ctx.session[username] = 1
    await app.redis.set(username, token, 'EX', app.config.redisExpire);
    return token;
  }

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ['password']),
      createTime: ctx.helper.timestamp(result.createTime),
    }
  }

  async register() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const user = await ctx.service.user.getUser(username);
    if (user) return this.error('用户已经存在');

    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time()
    });
    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        username: result.username
      });
      this.success({
        ...this.parseResult(ctx, result),
        token
      })
    } else {
      this.error('注册失败');
    }
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        username: user.username
      })
      this.success({
        ...this.parseResult(ctx, user),
        token
      })
    } else {
      this.error('该用户不存在')
    }
  }

  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);

    if (user) {
      this.success({
        ...this.parseResult(ctx, user)
      })
    } else {
      this.error('该用户不存在');
    }
  }

  async logout() {
    const { ctx, app } = this;
    try {
      // ctx.session[ctx.username] = null
      app.redis.del(ctx.username);
      this.success('ok');
    } catch (error) {
      this.error('退出登录失败');
    }
  }

  async edit() {
    const {ctx, app} = this;
    const result = ctx.service.user.edit({
      ...ctx.request.body,
      updateTime: ctx.helper.time()
    })
    this.success(result);
  }
}
module.exports = UserController;

