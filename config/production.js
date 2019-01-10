'use strict';
/**
 * 生产环境配置文件
 */
var config = {
    env: 'production', //环境名称
    port: 3000,         //服务端口号
    core_path:"http://192.168.2.84:8080",
    redis_config: {
        port:6379,
        host:"127.0.0.1"
    },

};
module.exports=config;
