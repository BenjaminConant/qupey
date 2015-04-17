'use strict';

var express = require('express');
var controller = require('./customer.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.use(auth.isAuthenticated(), function(req, res, next) {
	next();
});

router.get('/', controller.index);
// router.get('/userContacts', controller.userContacts);
router.get('/:id/stores', controller.myStores);
router.get('/:id/qupeys', controller.myQupeys);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/addMyQupey', controller.addMyQupey);
router.post('/:id/send/qupey', controller.sendQupey);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;