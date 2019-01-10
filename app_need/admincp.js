const Koa = require('koa');//导入koa
const admin = new Koa();//声明一个koa对象表示koa本身
const router = require('koa-router')(); //路由
const json = require('koa-json');//导入json模块
const onerror = require('koa-onerror');
const bodyParser = require("koa-bodyparser"); //表单解析中间件
const logger = require('koa-logger');//console日志系统
const session = require('koa-generic-session');//基于缓存的session
const redisStore = require('koa-redis');
const koaStatic = require("koa-static");  //静态资源加载中间件
const render = require('koa-ejs');
const views = require("koa-views");   //模板呈现中间件
const fs = require('fs');
const path = require("path");

//log工具
const log = require('../config/logger/log');
// error handler
const rest = require('../app_need/restfulAPI');
admin.use(session({
    secret: 'adMiN_AH^%^SSFWPDG32A2DKJS(*PDSA',
    key: 'account_session',
    proxy: 'true',
    cookie: {
        domain: "",
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000,//Session有效期单位毫秒
        rewrite: true,
        signed: true
    }, store: redisStore({
        host: "127.0.0.1",
        port: 6379,
        database: 0,
        prefix: "/",
        ttl: 60 * 1000
    })
}))
admin.use(router.routes())
admin.use(router.allowedMethods())
onerror(admin);
// middlewares
admin.use(rest.restify('/api'));
// admin.use(bodyParser);
admin.use(json());
admin.use(logger());
admin.use(koaStatic('./admin/public'));
admin.use(require('koa-static')(__dirname + '/public'));
//配置静态资源加载中间件
admin.use(koaStatic(path.join(__dirname, './public')))
admin.use(koaStatic(path.join(__dirname, '../static')))

// logger任何请求都从此处走，这是明面上的第一个异步函数用于记录发生的一整个请求所花费的时间
admin.use(async (ctx, next) => {
    const start = new Date();
    try {
        await next();
        const ms = new Date() - start;
        log.logResponse(ctx, ms);
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);//打印请求的方式请求的url和请求所花费的时
    } catch (e) {
        const ms = new Date() - start;
        console.log("logger-捕获异常:" + e.toString());
        log.logError(ctx, e, ms);
    }
});

//捕获异常记录错误日志
admin.on("error", (err, ctx) => {
    const start = new Date();
    console.log("捕获异常:" + err.toString());
    const ms = new Date() - start;
    log.logError(ctx, err.toString(), ms);

});

// //使用表单解析中间件
admin.use(bodyParser({
    "formLimit":"5mb",
    "jsonLimit":"5mb",
    "textLimit":"5mb"
}));
fs.readdirSync(__dirname + '/routers').forEach(function (file) {
    if (file.indexOf(".js") > -1) {
        console.log("/routers file： "+file)
        admin.use(require('./routers/' + file).routes());
    }
})
render(admin, {
    layout: '__layout',
    root: path.join(__dirname, './views'),
    viewExt: 'ejs'
});
// //配置服务端模板渲染引擎中间件
// admin.use(views(path.join(__dirname, './views'),{
//     extension: 'ejs'
// }))

module.exports = admin;
