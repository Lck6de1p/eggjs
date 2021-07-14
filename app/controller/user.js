'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'user index';
    //  获取session

    const session = ctx.session.user;
    console.log(session)
    const user = ctx.cookies.get("user")
    await ctx.render('user.html', {
      id: 100,
      name: 'admin',
      user: user ? JSON.parse(user) : null,
      lists: [
        'java',
        'php',
        'ts'
      ]
    });
  }

  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.cookies.set('user', JSON.stringify(body), {
      // 单位 ms
      maxAge: 10000,
      // httpOnly 不能用js操作cookies
      httpOnly: true,
    })

    //  保存session
    ctx.session.user = body

    ctx.body = {
      status: 200,
      data: body
    }
  }

  async logout() {
    const { ctx } = this;
    ctx.cookies.set('user', null);
    ctx.body = {
      status: 200
    }
  }

  async lists() {
    const { ctx, app } = this;
    // console.log(app.mysql)
    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 1500);
    // });

    const res = await ctx.service.user.lists();
    ctx.body = res;
  }

  async detail() {
    const { ctx } = this;
    const res = ctx.service.user.detail(10);
    console.log(res);
    ctx.body = ctx.query.id;
  }

  async detail2() {
    const { ctx } = this;
    console.log(ctx.params);
    const res = await ctx.service.user.detail2(ctx.params.id);
    ctx.body = res;
  }
  async add() {
    const { ctx } = this;
    console.log(ctx.request.body);
    // const rule = {
    //   name: { type: 'string' },
    //   age: { type: 'number' },
    // };
    // ctx.validate(rule);
    const res = await ctx.service.user.add(ctx.request.body);
    ctx.body = {
      status: 200,
      data: res,
    };

  }

  async edit() {
    const { ctx } = this;
    const res = await ctx.service.user.edit(ctx.request.body);
    ctx.body = {
      status: 200,
      data: res,
    };
  }
  async del() {
    const { ctx } = this;
    const res = await ctx.service.user.delete( ctx.request.body.id);
    ctx.body = {
      status: 200,
      data: res,
    };
  }
}

module.exports = UserController;

