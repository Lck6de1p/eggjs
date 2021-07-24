module.exports = app => {
    const store = {};
    
    app.sessionStore = {
        async get(key) {
            console.log(store, '-----')
            return store[key]
        },
        async set(key, value, maxAge) {
            store[key] = value
        },
        async destroy() {
            store[key] = null
        }

    }
    // 添加自定义插件
    const mids = app.config.coreMiddleware;
    app.config.coreMiddleware = [...mids, ...[
        'interfaceLimit',
        'allowHosts',
        'notFound',
        'auth',
        'interfaceCache'
    ]]
}