'use strict';
/**
 * 测试环境配置文件
 */
var config = {
    env: 'test', //环境名称
    port: 3002,         //服务端口号
    core_path:"http://192.168.2.84:8080",
    redis_config: {
        port:6379,
        host:"127.0.0.1"
    },

};
module.exports=config;
