/**
 * Created by Jamespc on 3/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  maxDocumentId: {type: String},
  maxMessageId: {type: String},
  maxContactsId: {type: String}
});

module.exports = mongoose.model('Sequence', schema);
