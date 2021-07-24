

module.exports = options => {
    let count = 0;
    let firstTime = new Date().getTime();
    return async (ctx, next) => {
        if (new Date().getTime() - firstTime >= options.time) {
            if (count >= options.maxCount) {
                count = 0;
                firstTime = new Date().getTime();
                ctx.body = {
                    status: 500,
                    errMsg: '请求太频繁'
                };
                return 
            } else {
                count = 0;
                firstTime = new Date().getTime();
                await next(); 
            }
        } else {
            count++;
            await next(); 
        }

    }
}