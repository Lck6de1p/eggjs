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
    // egg-auth配置
    config.auth = {
        exclude: ['/home', '/user', '/login', 'logout']
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

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        salt: 'lck'
    };
    return {
        ...config,
        ...userConfig,
    };
};