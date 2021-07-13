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
  config.middleware = [];
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

  config.static = {
    prefix: "/assets/",
    dir: path.join(appInfo.baseDir, "app/assets")
  }


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
