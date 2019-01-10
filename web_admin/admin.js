const config=require('../config/development');
const fs=require('fs');
const koa = require("koa");   //node框架
const path = require("path");
const ejs = require("ejs");   //模板引擎
const bodyParser = require("koa-bodyparser"); //表单解析中间件
const onerror = require('koa-onerror');//路由中间件
const views = require("koa-views");   //模板呈现中间件
const koaStatic = require("koa-static");  //静态资源加载中间件
const router = require("koa-router")();
const logger = require('koa-logger');//日志打印
//log工具
const log = require('../config/logger/log');
const app = new koa();
// require('../enums/fields');
const session = require('koa-generic-session');//基于缓存的session
const redisStore = require('koa-redis');
require('../tools/gloabVariable');
require('../tools/util');
app.keys = ['some secret hurr','keys'];//设置签名Cookie密钥
app .use(session({
    secret: 'AH^%^SSFWPDe3G32A2DKJS(*PDSA',
    key: 'web-session',
    proxy: 'true',
    cookie: {
        domain: "",
        path: '/',
        httpOnly: true,
        maxAge: 60*60*1000,//Session有效期单位毫秒
        rewrite: true,
        signed: true
    },
    store: redisStore({
        host:config.redis_config.host,
        port:config.redis_config.port,
        database: 0,
        prefix: "/",
        ttl: 60*1000
    })
}))
    .use(router.routes())
    .use(router.allowedMethods())
onerror(app);
app.use(logger());
global.core_path=config.core_path;
console.log("当前连接redisURL:"+config.redis_config.host+"    端口:"+config.redis_config.port)
console.log("当前连接服务器URL:"+config.core_path)
//配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname , './public')))
app.use(koaStatic(path.join(__dirname , '../static')))
//配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'),{
    extension: 'ejs'
}))
// logger任何请求都从此处走，这是明面上的第一个异步函数用于记录发生的一整个请求所花费的时间
app.use(async (ctx, next) => {
    const start = new Date();
    try {
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);//打印请求的方式请求的url和请求所花费的时
        log.logResponse(ctx, ms);
    } catch (e) {
        const ms = new Date() - start;
        console.log("e: "+e.toString());
        log.logResponse(ctx, ms);
    }
});
app.use(async function(ctx, next) {
    const start = new Date()
    if(ctx.response.status=="404"){
        await ctx.render('404');
    }
    if(ctx.response.status=="500"){
        await ctx.render('500');
    }
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);//打印请求的方式请求的url和请求所花费的时
});

//使用表单解析中间件
app.use(bodyParser({
    "formLimit":"5mb",
    "jsonLimit":"5mb",
    "textLimit":"5mb"
}));

fs.readdirSync(__dirname+'/routers').forEach(function(file){
    if(file.indexOf(".js")>-1){
        app.use(require('./routers/'+file).routes());
    }
})
app.on("error",(err,ctx)=>{//捕获异常记录错误日志
    try {
        console.log(new Date(),":",err);
    }catch (e) {
        ctx.response.body={"e":"服务器内部异常！",message:e};
        log.logError(ctx, e,new Date());
    }
});
module.exports = app;

