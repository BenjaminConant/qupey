'use strict';

var _ = require('lodash');
var Store = require('./store.model');
var mongoose = require('mongoose');
var User = require('../user/user.model');
var Qupey = require('../qupey/qupey.model');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

// Get list of stores
exports.index = function(req, res) {
  Store.find({}).exec()
  .then(function (stores) {
    return res.json(stores);
  })
  .then(null, handleError(res));
};

// Get a single store
exports.show = function(req, res) {
  Store.findById(req.params.id)
  .populate('default_qupey')
  .populate('gold_qupey')
  .exec()
  .then(function (store) {
    return res.json(store);
  })
  .then(null, handleError(res));
};

// Get customers
exports.customers = function(req, res) {
  Store.findById(req.params.id).populate('customers').exec()
  .then(function (store) {
    return res.json(store);
  })
  .then(null, handleError(res));
};

// Creates a new store in the DB.
exports.create = function(req, res) {
  return User.findById(req.user._id)
  .exec()
  .then(function(user){
    Store.create(req.body.store)
    .then(function(store){
      req.body.standard.store = store._id;
      Qupey.create(req.body.standard)
      .then(function(standardQupey){
        req.body.gold.store = store._id;
        Qupey.create(req.body.gold)
        .then(function(goldQupey){
          store.default_qupey = standardQupey._id;
          store.gold_qupey = goldQupey._id;
          store.saveAsync()
          .spread(function(s){
            user.ownedStores.push(store._id);
            user.saveAsync()
            .spread(function(){
             return res.json(201, s);
            })
          })
        })
      })
    })
  })
  .then(null, handleError(res));
};


// Creates a new store in the DB.
// exports.create = function(req, res) {
//   var store, user; 
//   User.findById(req.user._id).exec()
//   .then(function(user){
//     user = user; 
//     return Store.create(req.body.store)
//   })
//   .then(function(store){
//     store = store; 
//     req.body.standard.store = store._id;
//     return Qupey.create(req.body.standard)
//   })
//   .then(function(standardQupey){
//     req.body.gold.store = store._id;
//     return Qupey.create(req.body.gold)
//   })
//   .then(function(goldQupey){
//     store.default_qupey = standardQupey._id;
//     store.gold_qupey = goldQupey._id;
//     return store.saveAsync()
//   })       
//   .spread(function(s){
//     store = s; 
//     user.ownedStores.push(store._id);
//     return user.saveAsync()
//   })
//   .spread(function(){
//     return res.json(201, store);
//   })
//   .then(null, handleError(res));
// };


// Updates an existing store in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Store.findById(req.params.id, function (err, store) {
    if (err) { return handleError(res, err); }
    if(!store) { return res.send(404); }
    var updated = _.merge(store, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, store);
    });
  });
};

// Deletes a store from the DB.
exports.destroy = function(req, res) {
  Store.findById(req.params.id, function (err, store) {
    if(err) { return handleError(res, err); }
    if(!store) { return res.send(404); }
    store.remove(function(err) {
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