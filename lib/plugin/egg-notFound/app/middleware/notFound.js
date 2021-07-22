module.exports = options => {
    return async (ctx, next) => {
        const flag = ctx.app.router.stack.filter(item => {
            return item.regexp.test(ctx.request.url);
        })
        console.log(flag)
        if (flag.length) {
            await next();
        } else {
            ctx.body = {
                status: 404,
                errMsg: `接口${ctx.request.url}不存在`
            }
        }
    }
}