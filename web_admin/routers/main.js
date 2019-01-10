'use strict';
const Router =require('koa-router');
const session=require('../filters/session-filter');
const operator = require('../controllers/operator');
const router = new Router()
router.get('/',session,operator.index);//Netty
router.post('/',session,operator.globaSerch);//全局搜索
router.get('/signIn',operator.findOperatorFromNetty);//Netty登录
router.get('/signInPC',operator.logIn);//PC登录
router.post('/signInPC',operator.findOperatorFromPC);//Netty登录
router.get('/signOut',session,operator.signOut);
router.get('/welcome',session,operator.welcome);
router.get('/test',session,operator.test);
module.exports = router;
