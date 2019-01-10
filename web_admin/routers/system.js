'use strict';
const Router = require('koa-router');
const system = require('../controllers/system');
const session = require('../filters/session-filter');
const router = new Router({
    prefix: '/system'
})
router.get('/operator', session, system.operator);
router.get('/editOperator', session, system.editOperator);
router.post('/saveOperator', session, system.saveOperator);
router.post('/getOperatorList', session, system.getOperatorList);
router.post('/getMenuListByRoleId', session, system.getMenuListByRoleId);
router.get('/role', session, system.role);
router.post('/getRoleList', session, system.getRoleList);
router.get('/system/editRole', session, system.editRole);
router.post('/saveRole', session, system.saveRole);
router.get('/menu', session, system.menu);
router.post('/getMenuList', session, system.getMenuList);
router.get('/editMenu', session, system.editMenu);
router.post('/saveMenu', session, system.saveMenu);
module.exports = router;
