'use strict';
const system=require('../../base/system.js');
/**
 * 管理员列表
 */
exports.operator=async(ctx,next)=>{
    await ctx.render('system/operator',{req:ctx});
}
/**
 * 管理员编辑
 */
exports.editOperator=async(ctx,next)=>{
    let model=null;
    let id=ctx.request.query.id||'';
    let roleList=await system.getEffectiveRoleList();
    if(id>0 && !isNaN(id)){
        model=await system.getOperatorById(id);
    }
    await ctx.render('system/editOperator',{req:ctx,model:model,roleList:roleList});
}

/**
 * 管理员保存
 */
exports.saveOperator=async(ctx,next)=>{
    let model= ctx.request.body.model||'';
    let result=await system.saveOperator(model);
    ctx.body=result;
}

/**
 * 获取管理员列表
 */
exports.getOperatorList=async(ctx,next)=>{
    let model= ctx.request.body.model;
    let body=await system.getOperatorList(model);
    ctx.body=body;
}

/**
 * 菜单
 */
exports.menu=async(ctx,next)=>{
    await ctx.render('system/menu',{req:ctx});
}

/**
 * 菜单编辑
 */
exports.editMenu=async(ctx,next)=>{
    let model=null;
    let id=ctx.request.query.id||'';
    let parentMenu=await system.getParentMenuList();
    if(id && !isNaN(id)){
        model=await system.getMenuById(id);
    }
    await ctx.render('system/editMenu',{req:ctx,parentmodel:parentMenu,model:model});
}

/**
 * 菜单列表
 */
exports.getMenuList=async(ctx,next)=>{
    let model= ctx.request.body.model;
    let body=await system.getMenuList(model);
    ctx.body=body;
}

/**
 * 菜单保存
 */
exports.saveMenu=async(ctx,next)=>{
    let model= ctx.request.body.model||'';
    let result=await system.saveMenu(model);
    ctx.body=result;
}


/**
 * 根据角色Id和菜单状态获取菜单列表
 */
exports.getMenuListByRoleId=async(ctx,next)=>{
    let roleMenu=null;
    let id=ctx.request.query.id||0;
    if(id>0) {
        roleMenu = await system.getMenuListByRoleId(id);
    }
    ctx.body=roleMenu;
}
/**
 * 角色编辑
 */
exports.editRole=async(ctx,next)=>{
    let role=null;
    let id=ctx.request.query.id||'';
    let roleMenu=[];
    roleMenu.push(0);
    if(id && !isNaN(id)){
        role=await system.getRoleById(id);
        if(role && role.roleMenus &&　role.roleMenus instanceof  Array){
            for(let i=0;i<role.roleMenus.length;i++){
                roleMenu.push(role.roleMenus[i].menuModel.id)
            }
        }
    }
    let body= await system.getParentMenuList(0);
    let menu={};
    if(body && body instanceof Array){
        for(let i=0;i<body.length;i++){
            menu[body[i].id]={id:body[i].id,pid:body[i].parentId,title:body[i].name};
        }
    }
    await ctx.render('system/editRole',{req:ctx,model:role,roleMenu:roleMenu.join(','),menu:encodeURIComponent(JSON.stringify(menu))});
}
/**
 * 角色列表
 */
exports.role=async(ctx,next)=>{
    await ctx.render('system/role',{req:ctx});
}

/**
 * 角色列表
 */
exports.getRoleList=async(ctx,next)=>{
    let model= ctx.request.body.model;
    let body=await system.getRoleList(model);
    ctx.body=body;
}

/**
 * 角色保存
 */
exports.saveRole=async(ctx,next)=>{
    let model= ctx.request.body.model||'';
   let result=await system.saveRole(model);
    ctx.body=result;
}
