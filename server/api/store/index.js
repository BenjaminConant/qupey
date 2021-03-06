'use strict';

var express = require('express');
var controller = require('./store.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

// router.use(auth.isAuthenticated(), function(req, res, next) {
// 	next();
// });

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/customers', controller.customers);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;