/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Qupeyhash = require('./qupeyHash.model');

exports.register = function(socket) {
  Qupeyhash.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Qupeyhash.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('qupeyHash:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('qupeyHash:remove', doc);
}