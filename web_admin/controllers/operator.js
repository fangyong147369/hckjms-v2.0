'use strict';
const biz_operator = require('../../base/system');
/**
 * 登录
 */
exports.signIn = async(ctx,next)=> {
    await ctx.render('main/signIn', {req: ctx});
}
/**
 * PC登录
 */
exports.logIn = async(ctx,next)=> {
    await ctx.render('main/signIn', {req: ctx});
}
/**
 * 注销
 */
exports.signOut = async(ctx,next)=> {
    ctx.session.user = null;
    await ctx.render('main/signIn', {req: ctx});
}

/**
 * 首页Netty
 */
exports.index = async(ctx,next)=> {
    let menuList = [];
    let roleId = (ctx.session && ctx.session.user && ctx.session.user.roleModel) ? ctx.session.user.roleModel.id : 0;
    if (roleId > 0) {
        menuList = await biz_operator.getMenuListByRoleId(roleId);
    }
    await ctx.render('main/index', {req: ctx,menuList:menuList});
}
/**
 * 首页Pc
 */
exports.indexFromPc = async(ctx,next)=> {
    let menuList = [];
    let roleId = (ctx.session && ctx.session.user && ctx.session.user.roleModel) ? ctx.session.user.roleModel.id : 0;
    if (roleId > 0) {
        menuList = await biz_operator.getMenuListByRoleId(roleId);
    }
    await ctx.render('main/indexFromPc', {req: ctx,menuList:menuList});
}
/**
 * 登录
 */
exports.globaSerch = async(ctx,next)=> {
    let body = ctx.request.body;
    ctx.body = {message: "···接口陆续开放中·····", "返回": "<a href='http://localhost:4700/'>返回<a/>"};
}
/**
 * welcome
 */
exports.welcome = async(ctx,next)=> {
    let menu = await biz_operator.getParentMenuList(1);
    await ctx.render('main/welcome', {req: ctx});
}
/**
 * PC登录
 */
exports.findOperatorFromPC = async(ctx,next)=> {
    let p_username = ctx.request.body.username;
    let p_password = ctx.request.body.password;
    let p_type = ctx.request.body.type;
    let body = null;
    if (p_type == "pc") {
        body = await biz_operator.findOperator({signInWay: 2, userName: p_username, password: p_password});
    }
    if (body != null && body.code == 1) {
         ctx.session.user = body.data;
    }
    ctx.response.body = body;

}
/**
 * 登录
 */
exports.findOperatorFromNetty = async(ctx,next)=> {
    let userName = ctx.request.query.username;
    let password = ctx.request.query.password;
    let body = await biz_operator.findOperator({signInWay: 2, userName: userName, password: password});
    if (body != null && body.code == 1) {
        ctx.session.user = body.data;
        let menuList = [];
        let roleId = (ctx.session && ctx.session.user && ctx.session.user.roleModel) ? ctx.session.user.roleModel.id : 0;
        if (roleId > 0) {
            menuList = await biz_operator.getMenuListByRoleId(roleId);
        }
        await ctx.render('formula/formula', {req: ctx, menuList: menuList});
    } else if (body != null && body.code == 2) {
        return ctx.body = body;
    } else if(body != null && body.code == -1) {
        return ctx.body = {mes: body && body.message ? body.message: "系统内部调用错误"}
    }else{
        return ctx.body = body;
    }
}
/**
 * 登录
 */
exports.test = async(ctx,next)=> {
    let body = await biz_operator.test(1);
    await ctx.render('main/test', {req: ctx, body: body});
}
