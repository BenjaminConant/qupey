'use strict';

var _ = require('lodash');
var Qupey = require('./qupey.model');
var User = require('../user/user.model');
var Store = require('../store/store.model');
var mongoose = require('mongoose');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);


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



exports.redeem = function (req, res) {
  // remove the qupey from the users myQupeys array


  var senders = [];
  var qupey; 
  User.findById(req.user._id).exec()
  .then(function(user){
    user.qupeys.pull(req.params.id);
    return user.saveAsync();
  })
  .then(function(){
    return Qupey.findById(req.params.id).exec()
  })
  .then(function(qupey){
    qupey.redeemCount++;
    return qupey.saveAsync()
  })
  .then(function(qupey){
    var qupey = qupey[0];
    Store.findById(qupey.store).exec()
    .then(function (store){
     console.log("got to the last thing", store);
     console.log(qupey);
    if (qupey.shared.length > 0) {
      // i am redeeming a qupey that has been shared with me.
      // increment the cupey redeem  count 
      // if there is a sharer add the store's Gold Qupey to the shareers array
      console.log("got to store find by id, 94");
      qupey.shared.forEach(function(share){
        if (share.recipient === req.user.email) {
          senders.push(share.sender)
          console.log("in if 100", share.sender);
        }
      })
      console.log('senders array: ', senders)
      if (senders.length > 0){
        var count = 0; 
        // if (typeof sender === 'string'){
        senders.forEach(function(sender){
          console.log('sender in for each: ', sender)
            User.findOne({email: sender}).exec()
            .then(function(u){
              console.log('u id: ', u._id)
             if (u) console.log('we have a user:', u.email, "we have a store", store)
              u.qupeys.push(store.gold_qupey.toString());
              return u.saveAsync()
            })
            .then(function(u){
              u = u[0]; 
              console.log('u in then: ', u.email)
                count++;
                if (count === senders.length){
                  res.status(200).end(); 
                }              
            })            
          })
        //end of typeof check
        // }
        // end of senders length if 
      }

      else {
          res.status(200).end()
      }
      // end of first if
    }

    else {
      res.status(200).end();
    }

  })
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