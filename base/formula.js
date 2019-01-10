/**
 * @author zzhu
 * 系统配置业务
 */
'use strict';
const co = require('co');
const midx = require('./midx');

/**
 * 通过配方Id查询配方
 */
exports.removeFormulaById =async function(model) {
    if(model.id<=0){
        return {code: -1, message: "id参数错误"};
    }
    return co(function* () {
        try {
            let result = yield midx('/formula/formula/deleteById', model);
            return result;
        } catch (error) {
            console.log(error);
            return {code: -1, message: error};
        }
    })
}
/**
 * 通过配方Id查询配方
 */
exports.getFormulaById =async function(id) {
    if(id<=0){
        return {code: -1, message: "id参数错误！"};
    }
    return co(function* () {
        try {
            let result = yield midx('/formula/formula/getById', {id:id});
            if(result.code==1&&result.data!=null){
                return  {code: 1, message: result.message,data:result.data};
            }else {
                return  {code: -1, message: result.message,data:[]};
            }
        } catch (error) {
            console.log(error);
            return {code: -1, message: error};
        }
    })
}
/**
 * 查询配方列表
 */
exports.getFormulaList = async function(model) {
    return co(function* () {
        try {
            let result = yield midx('/test/findAllBySql', model);
            return {rows:result};
        } catch (error) {
            console.log(error);
            return {list: [], total: 0, code: -1, message: error};
        }
    })
}

/**
 * 查询浓度列表
 */
exports.getConcentrationList =async function(model) {
    return co(function* () {
        try {
            let result = yield midx('/formula/concentration/list', model);
            return {
                rows: (result && result.data && result.data.list && result.data.list instanceof Array ? result.data.list : []),
                total: (result && result.data && result.data.page && result.data.page.total && !isNaN(result.data.page.total) ? result.data.page.total : 0)
            };
        } catch (error) {
            console.log(error);
            return {list: [], total: 0, code: -1, message: error};
        }
    })
}

/**
 * 查询浓度列表
 */
exports.getConcentrationListByFormulaId =async function(model) {
    return co(function* () {
        try {
            let result = yield midx('/formula/concentration/list', model);
            return result;
        } catch (error) {
            console.log(error);
            return {list: [], total: 0, code: -1, message: error};
        }
    })
}
