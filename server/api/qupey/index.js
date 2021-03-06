'use strict';

var express = require('express');
var controller = require('./qupey.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// router.use(auth.isAuthenticated(), function(req, res, next) {
// 	next();
// });

//change this

router.get('/', controller.index);
router.post('/redeem/:id', auth.isAuthenticated(), controller.redeem);
router.get('/getwithstore/:id',auth.isAuthenticated(), controller.getWithStore);
router.get('/:id', controller.show);
router.get('/:id/sender', controller.sender);
router.get('/:id/recipient', controller.recipient);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;