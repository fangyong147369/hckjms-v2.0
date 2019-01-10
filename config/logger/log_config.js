'use strict';
var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../../nodeLog')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// var errorLogPath = path.resolve(__dirname, "../logs/error/error");
//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// var responseLogPath = path.resolve(__dirname, "../logs/response/response");
var log_config = {
    "appenders":
    [
        //错误日志
        {
            "category":"errorLogger",             //logger名称
            "type": "dateFile",                   //日志类型
            "filename": errorLogPath,             //日志输出位置
            "alwaysIncludePattern":true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log",
            "maxLogSize" : 1024*12,  //一个文件的大小，超出后会自动新生成一个文件//后缀，每小时创建一个新的日志文件
            "path": errorPath                     //自定义属性，错误日志的根目录
        },
        //响应日志
        {
            "category":"resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "maxLogSize" : 1024*12,  //一个文件的大小，超出后会自动新生成一个文件//后缀，每小时创建一个新的日志文件
            "path": responsePath
        }
    ],
    "levels":                                   //设置logger名称对应的的日志等级
    {
        "errorLogger":"ERROR",
        "resLogger":"ALL"
    },
    "baseLogPath": baseLogPath                  //logs根目录
}

module.exports = log_config;