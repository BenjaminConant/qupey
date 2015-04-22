'use strict';

var _ = require('lodash');
var Qupey = require('./qupey.model');

// Get list of qupeys
exports.index = function(req, res) {
  Qupey.find().exec()
  .then(function (qupeys) {
    return res.json(qupeys);
  })
  .then(null, handleError(res));
};

// Get a single qupey
exports.show = function(req, res) {
  Qupey.findById(req.params.id, function (err, qupey) {
    if(err) { return handleError(res, err); }
    if(!qupey) { return res.send(404); }
    return res.json(qupey);
  });
};

// Get qupeys by sender
exports.sender = function(req, res) {
  Qupey.find({sender: req.params.id}).exec()
  .then(function (qupeys) {
    return res.json(qupeys);
  })
  .then(null, handleError(res));
};

// Get qupeys by recipient
exports.recipient = function(req, res) {
  Qupey.find({recipient: req.params.id}).exec()
  .then(function (qupeys) {
    return res.json(qupeys);
  })
  .then(null, handleError(res));
};

//gets a qupey with a populated store
exports.getWithStore = function (req, res) {
 
  Qupey.findById(req.params.id)
  .populate('store')
  .exec()
  .then(function(qupey){
    res.json(200, qupey)
  })
  .then(null, handleError(res))
};


// Creates a new qupey in the DB.
exports.create = function(req, res) {
  Qupey.create(req.body, function(err, qupey) {
    if(err) { return handleError(res, err); }
    return res.json(201, qupey);
  });
};

// Updates an existing qupey in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Qupey.findById(req.params.id, function (err, qupey) {
    if (err) { return handleError(res, err); }
    if(!qupey) { return res.send(404); }
    var updated = _.merge(qupey, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, qupey);
    });
  });
};

// Deletes a qupey from the DB.
exports.destroy = function(req, res) {
  Qupey.findById(req.params.id, function (err, qupey) {
    if(err) { return handleError(res, err); }
    if(!qupey) { return res.send(404); }
    qupey.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res) {
  return function(err){
    return res.status(500).json(err);
  }
}