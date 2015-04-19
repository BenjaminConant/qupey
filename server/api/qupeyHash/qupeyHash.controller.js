'use strict';

var _ = require('lodash');
var Qupeyhash = require('./qupeyHash.model');

// Get list of qupeyHashs
exports.index = function(req, res) {
  Qupeyhash.find(function (err, qupeyHashs) {
    if(err) { return handleError(res, err); }
    return res.json(200, qupeyHashs);
  });
};

// Get a single qupeyHash
exports.show = function(req, res) {
  Qupeyhash.findById(req.params.id, function (err, qupeyHash) {
    if(err) { return handleError(res, err); }
    if(!qupeyHash) { return res.send(404); }
    return res.json(qupeyHash);
  });
};

// Creates a new qupeyHash in the DB.
exports.create = function(req, res) {
  Qupeyhash.create(req.body, function(err, qupeyHash) {
    if(err) { return handleError(res, err); }
    return res.json(201, qupeyHash);
  });
};

// Updates an existing qupeyHash in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Qupeyhash.findById(req.params.id, function (err, qupeyHash) {
    if (err) { return handleError(res, err); }
    if(!qupeyHash) { return res.send(404); }
    var updated = _.merge(qupeyHash, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, qupeyHash);
    });
  });
};

// Deletes a qupeyHash from the DB.
exports.destroy = function(req, res) {
  Qupeyhash.findById(req.params.id, function (err, qupeyHash) {
    if(err) { return handleError(res, err); }
    if(!qupeyHash) { return res.send(404); }
    qupeyHash.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}