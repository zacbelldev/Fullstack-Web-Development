var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    maxDocumentId: {type: Number, required: true},
    maxMessageId: {type: Number, required: true},
    maxContactsId: {type: Number, required: true},
    maxContactId: {type: Number, required: true}
});

module.exports = mongoose.model('Sequence', schema);