'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = {
            status: 200,
            data: {
                name: 'lck',
                age: 18
            }
        };
    }

    async newApplication() {
        const { ctx, app } = this;
        // const packageInfo = app.package('scripts');
        // console.log(packageInfo)
        const allPack = app.allPackage
        console.log(allPack)
        ctx.body = 'newApplication'
    }

    async newContext() {
        const { ctx } = this;
        const params = ctx.params();
        console.log(params)
        ctx.body = 'newContext'
    }

    async newRequest() {
        const { ctx } = this;
        const token = ctx.request.token;
        ctx.body = token
    }

    async newResponse() {
        const { ctx } = this;
        ctx.response.token = '123adsad'
        ctx.body = 'newResponse'
    }
}

module.exports = HomeController;