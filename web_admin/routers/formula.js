'use strict';
const Router = require('koa-router');
const formula = require('../controllers/formula');
const session = require('../filters/session-filter');
const router = new Router({
    prefix: '/formula'
})
router.get('/formula', session, formula.formula);
router.post('/getFormulaList', session, formula.getFormulaList);
router.get('/showFormulaById', session, formula.showFormulaById);
router.post('/removeFormulaById', session, formula.removeFormulaById);
router.get('/concentration', session, formula.concentration);
router.post('/getConcentrationList', session, formula.getConcentrationList);
module.exports = router;
