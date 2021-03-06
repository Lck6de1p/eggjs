/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1626052984242_5394';

    // add your middleware config here
    config.middleware = ['httpLog'];
    config.httpLog = {
        type: 'all'
    }
    config.allowHosts = ['localhost:8000', '127.0.0.1:8000']

    config.interfaceLimit = {
        maxCount: 30, // 最多请求个数
        time: 3 * 1000 // 间隔时间
    }

    config.interfaceCache = {
        expire: 10,
        include: ['/api/user/detail']
    }
    exports.security = {
        csrf: {
            enable: false,
        },
    };

    // 模板引擎的配置
    config.view = {
        mapping: {
            '.html': 'ejs'
        },
        root: [
            path.join(appInfo.baseDir, "app/html"),
            path.join(appInfo.baseDir, "app/view"),
        ].join(',')
    }

    config.ejs = {
            // delimiter: "$"
        }
        // 配置静态文件目录和访问地址
    config.static = {
        prefix: "/assets/",
        dir: path.join(appInfo.baseDir, "app/assets")
    }

    config.session = {
        key: "LCK_SESS",
        httpOnly: true,
        maxAge: 1000 * 5,
        renew: true
    }

    // egg-auth配置
    config.auth = {
        exclude: ['/api/user/login', '/api/user/register', '/api/commons/citys','/api/house/hot' ]
    };
    // egg-mysql配置
    config.mysql = {
        app: true,
        agent: false,
        client: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '123456',
            database: 'egg_house'
        }
    };

    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'egg_house',
        define: {
            timestamps: false,
            freezeTable: true
        }
    }

    config.jwt = {
        secret: 'lck'
    }

    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: '123456',
            db: 0
        }
    }
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        salt: 'lck',
        redisExpire: 60 * 60 * 24
    };
    return {
        ...config,
        ...userConfig,
    };
};