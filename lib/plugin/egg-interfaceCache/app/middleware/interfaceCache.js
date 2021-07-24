/**
 * 缓存接口
 * 1、将接口的地址作为redis key
 */


module.exports = options => {
    return async (ctx, next) => {
        const { url } = ctx.request;
        const cache = await ctx.app.redis.get(url);
        if (options.include.includes(url)) {
            if (cache) {
                ctx.body = JSON.parse(cache);
                return
            } else {
                await next();
                await ctx.app.redis.set(url, JSON.stringify(ctx.response.body), 'EX', 8)
            }
        } else {
            await next();
        }
    }
}