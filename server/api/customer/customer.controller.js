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
  // console.log('id: ', req.params.id, 'body: ', req.body.qupeyId)
  User.findById(req.params.id).exec()
  .then(function (customer) {
    customer.qupeys.push(req.body.qupeyId)
    return customer.saveAsync()  //promisified mongoose returns [saved]
  })
  .then(function(saved){
    // console.log('saved: ', saved)
    return res.json(saved[0]);    
  })
  .then(null, handleError(res));
};


// send a qupey to my friends
exports.shareQupey = function(req, res) {
  // look up customer and find the qupey 
  // req body will hold both qupey id and the emails
  User.findById(req.params.id).exec()
  .then(function (customer) {
    // should add a check --- if qupey id is in qupeys array, remove and push into shared qupeys 
    console.log('emails: ', req.body.friendEmails)
    var textLink = '127.0.0.1:9000/storeDetail/' + req.body.storeObj._id; 
    req.body.friendEmails.push('qupeybusiness@gmail.com')
    return Promise.map(req.body.friendEmails, function(email){
      nodemailerConfig.options = {
        from: nodemailerConfig.userInfo.user,
        to: 'ayana.d.i.wilson@gmail.com', // hard coded for now so I don't spam my friends but this works well 
        subject: customer.google.displayName + '  sent you a fantastic, wonderful qupey for ' + req.body.storeObj.name + '!', 
        html: '<a href=\"' + textLink.toString() + '\">Click here to retrieve your qupey</a>'
              + '<br />'
              + '<br /> Text Link: ' + textLink
      }
      console.log('env: ', process.env.NODEMAILER_USER, process.env.NODEMAILER_PASSWORD)
      sendMail(nodemailerConfig.options)
      .then(function(){
        console.log('in here')
        return; 
      })
      .then(null, function(err){
        console.log('err: ', err)
      })
    })
  })
  .then(function(){
    function makeHash(email){
      console.log('in make hash')
      User.findOne({email: email}).exec()
      .then(function(user){
        if (!user){
          console.log('this user is not in the db')
          console.log('type: ', typeof QupeyHash)
          console.log('elements: ', email, req.body.storeObj.default_qupey._id, req.body.storeObj._id)
          console.log('whole object: ', req.body.storeObj)
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
          return new Promise(function (resolve, reject){
            user.save(function(err, created){
              if (err) return reject(err); 
              resolve(created)
            })
          })
        } //end of else 
      })  
    }
    return Promise.all(req.body.friendEmails.map(makeHash))
    .then(function (all){
      console.log('all!: ', all)
      transport.close(); 
      res.send(200); 
    })
  })
  .then(null, handleError(res)); 
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