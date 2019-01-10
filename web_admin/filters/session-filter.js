/**
 * 登录过滤器
 * @param ctx
 * @param next
 * @returns {Promise<*>}
 */
module.exports = async (ctx, next) => {
    // console.log("-----登录过滤器-----登录用户-"+ctx.session.user.userName)
    if(ctx.session.user){
        ctx.state.user=ctx.session.user;
        await next();
    }else{
        if(ctx.request.method=="GET"){
            console.log("signIn:")
            return ctx.redirect('/signInPC');
        }else{
            console.log("session失效,请重新登录:")
            return ctx.body={err:'session失效,请重新登录.',code:-1};
        }
    }
}

