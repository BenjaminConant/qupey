'use strict';

var Promise = require('bluebird');

//for DRYing out the code 
module.exports = function AbstractController (status, controller) {
  if (controller === undefined) {
    controller = status;
    status = 200;
  }
  return function (req, res, next) {
    Promise.resolve(controller(req))
    .then(function (data) {
      res.status(status).json(data);
    })
    .catch(next);
  };
};