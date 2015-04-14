/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Owner = require('./owner.model');

exports.register = function(socket) {
  Owner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Owner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('owner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('owner:remove', doc);
}