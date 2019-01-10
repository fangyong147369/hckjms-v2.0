'use strict';
const Router =require('koa-router');
const util = require('../controllers/util');
const session_filter=require('../filters/session-filter');
const router = new Router()
router.post('/util/uploadImage', session_filter,util.uploadImage);
module.exports = router;
