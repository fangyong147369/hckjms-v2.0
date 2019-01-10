'use strict';
const biz_formula = require('../../base/formula');
/**
 * 查询配方列表
 */
exports.getFormulaList = async(ctx,next)=> {
    let model = ctx.request.body.model;
    let body = await biz_formula.getFormulaList(model);
    ctx.body = body;
}


/**
 * 查询配方列表页面
 */
exports.formula = async(ctx,next)=> {
    console.log("查询配方列表页面:")
    await ctx.render('formula/formula', {req: ctx});
}


/**
 * 通过配方Id查询配方页面
 */
exports.showFormulaById = async(ctx,next)=> {
    let model = null;
    let conList = null;
    console.log("通过配方Id查询配方页面:")
    let id = ctx.request.query.id || '';
    if (id && !isNaN(id)) {
        model = await biz_formula.getFormulaById(id);
        let result = await biz_formula.getConcentrationListByFormulaId({formulaId: id});
        if (result && result.code == 1 && result.data && result.data.list && result.data.list instanceof Array) {
            conList = result.data.list
        } else {
            console.error("浓度查询错误：" + result.message)
        }
    }
    if (model.code == 1) {
        model = model.data;
    } else {
        model = [];
    }
    await ctx.render('formula/showFormulaById', {req: ctx, model: model, conList: conList});
}

/**
 * 通过配方Id移除配方
 */
exports.removeFormulaById = async(ctx,next)=> {
    let model = ctx.request.body.model;
    let body = await biz_formula.removeFormulaById(model);
    ctx.body = body;
}
/**
 * 查询浓度列表
 */
exports.getConcentrationList = async(ctx,next)=> {
    let model = ctx.request.body.model;
    let body = await biz_formula.getConcentrationList(model);
    ctx.body = body;
}
/**
 * 查询浓度列表页面
 */
exports.concentration = async(ctx,next)=> {
    let formulaId = ctx.request.query.formulaId || 0;
    await ctx.render('formula/concentration', {req: ctx, formulaId: formulaId});
}


