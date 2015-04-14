/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Qupey = require('./qupey.model');

exports.register = function(socket) {
  Qupey.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Qupey.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('qupey:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('qupey:remove', doc);
}