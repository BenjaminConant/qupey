'use strict';

var _ = require('lodash');
var Owner = require('./owner.model');

// Get list of owners
exports.index = function(req, res) {
  Owner.find(function (err, owners) {
    if(err) { return handleError(res, err); }
    return res.json(200, owners);
  });
};

// Get a single owner
exports.show = function(req, res) {
  Owner.findById(req.params.id, function (err, owner) {
    if(err) { return handleError(res, err); }
    if(!owner) { return res.send(404); }
    return res.json(owner);
  });
};

// Creates a new owner in the DB.
exports.create = function(req, res) {
  Owner.create(req.body, function(err, owner) {
    if(err) { return handleError(res, err); }
    return res.json(201, owner);
  });
};

// Updates an existing owner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Owner.findById(req.params.id, function (err, owner) {
    if (err) { return handleError(res, err); }
    if(!owner) { return res.send(404); }
    var updated = _.merge(owner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, owner);
    });
  });
};

// Deletes a owner from the DB.
exports.destroy = function(req, res) {
  Owner.findById(req.params.id, function (err, owner) {
    if(err) { return handleError(res, err); }
    if(!owner) { return res.send(404); }
    owner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}