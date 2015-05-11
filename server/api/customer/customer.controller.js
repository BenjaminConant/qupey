'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');
var User = require('../user/user.model'); 
var Qupey = require('../qupey/qupey.model'); 
var QupeyHash = require('../qupeyHash/qupeyHash.model'); 
var nodemailerConfig = require('../../config/nodemailer'); 
var Promise = require('bluebird'); 
var nodemailer = require('nodemailer'); 
var transport = nodemailerConfig.transporter; 
var sendMail = Promise.promisify(transport.sendMail, transport); 
var request = require('request'); 
var requestP = Promise.promisify(require('request')); 
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose)


// Get list of customers
exports.index = function(req, res) {
  Customer.find(function (err, customers) {
    if(err) { return handleError(res, err); }
    return res.json(200, customers);
  });
};

// Get all of my stores
exports.myStores = function(req, res) {
  Customer.findById(req.params.id).populate('stores').exec()
  .then(function (customers) {
    return res.json(customers);
  })
  .then(null, handleError(res));
};


// Get all of my qupeys 
exports.myQupeys = function(req, res) {
  Customer.findById(req.params.id).populate('qupeys').exec()
  .then(function (customers) {
    return res.json(customers);
  })
  .then(null, handleError(res));
};

// add my qupey to my array 
exports.addMyQupey = function(req, res) {
  User.findById(req.params.id).exec()
  .then(function (customer) {
    customer.qupeys.push(req.body.qupeyId)
    return customer.saveAsync()  //promisified mongoose returns [saved]
  })
  .then(function(saved){
    return res.json(saved[0]);    
  })
  .then(null, handleError(res));
};


// send a qupey to my friends
exports.shareQupey = function(req, res) {
  var count = 0; 
  // look up customer and find the qupey 
  // req body will hold both qupey id and the emails
  req.body.friendEmails.push('ayana.d.i.wilson@gmail.com')
  Qupey.findById(req.body.storeObj.default_qupey._id).exec()
  .then(function(qupey){
    req.body.friendEmails.forEach(function(email){
      qupey.shared.push({
        recipient: email,
        sender: req.user.email
      }) 
    })
    return qupey.saveAsync()
  })
  .then(function(qupey){
  qupey = qupey[0]; 
  console.log('saved qupey: ', qupey)
  User.findById(req.params.id).exec()
  .then(function (customer) {
    console.log('customer: ', customer.email)
    console.log('req body: ', req.body.storeObj)
    // should add a check --- if qupey id is in qupeys array, remove and push into shared qupeys
    // if a user shares a qupey, that qupey is not added to their qupeys array but to their shared qupeys array
    if (customer.sharedQupeys.indexOf(req.body.storeObj.default_qupey._id) === -1){
      customer.sharedQupeys.addToSet(req.body.storeObj.default_qupey._id)
      return customer.saveAsync()      
    }
    else {
      return Promise.resolve([customer]); 
    }
  })
  .then(function savedCustomer(customer){
    customer = customer[0];
    console.log('emails: ', req.body.friendEmails)
    var textLink = 'http://qupey.herokuapp.com/storeDetail/' + req.body.storeObj._id; 
    // this is here for debugging purposes 
    // req.body.friendEmails.push('ayana.d.i.wilson@gmail.com', 'conantbenjamin@gmail.com')
    return Promise.map(req.body.friendEmails, function(email){
      nodemailerConfig.options = {
        from: nodemailerConfig.userInfo.user,
        to: email,
        subject: customer.google.displayName + '  sent you an awesome qupey for ' + req.body.storeObj.name + '!', 
        html: '<p>Hey there,</p>'
              + '<p>Just writing to let you know that your friend ' +customer.google.displayName+ ' has sent you a '+ req.body.storeObj.name+ ' Qupey. This awesome Qupey will allow you to take ' +req.body.storeObj.default_qupey.type.discount+ '% of your next trip to ' + req.body.storeObj.name+ '. Enjoy! </p>'
              + '<a href=\"' + textLink.toString() + '\">Your Qupey</a>'
              + '<br />'
              + '<br /> Text Link: ' + textLink
      }
      sendMail(nodemailerConfig.options)
      .then(function(){
        count++;
        console.log('in here') 
        if (count === req.body.friendEmails.length){
          transport.close(); 
          res.send(200);
        }
        return; 
      })
      .then(null, function(err){
        console.log('err: ', err)
      })
    }) //removed })
    .then(function(){
      function makeHash(email){
        console.log('in make hash: ', email)
        User.findOne({email: email}).exec()
        .then(function(user){
          if (!user){
            console.log('this user is not in the db')
            console.log('elements: ', email, req.body.storeObj.default_qupey._id, req.body.storeObj._id)
            // hash is created only for users that don't exist in the database
            return QupeyHash.create({
              email: email, 
              qupeyId: req.body.storeObj.default_qupey._id, 
              storeId: req.body.storeObj._id
            })
          }
          else {
            //add the qupey and store id to the user object
            console.log('this user is in the db: ', email, req.body.storeObj.default_qupey._id, req.body.storeObj._id)
            user.qupeys.push(req.body.storeObj.default_qupey._id); 
            user.stores.push(req.body.storeObj._id); 
            user.saveAsync().then(function(user){
              console.log('saved user: ', user[0].qupeys)
            });
          } //end of else 
        })  
      }
      return Promise.join(
        Promise.map(req.body.friendEmails, function(email){
          return makeHash(email)
        }))
    })
  })
  .then(null, handleError(res)); 
  })
};


// Get a single customer
exports.show = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    return res.json(customer);
  });
};

// Creates a new customer in the DB.
exports.create = function(req, res) {
  Customer.create(req.body, function(err, customer) {
    if(err) { return handleError(res, err); }
    return res.json(201, customer);
  });
};

// Updates an existing customer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customer.findById(req.params.id, function (err, customer) {
    if (err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customer);
    });
  });
};

// Deletes a customer from the DB.
exports.destroy = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    customer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res) {
  return function(err){
    console.log('err: ', err)
    return res.status(500).json(err);
  }
}