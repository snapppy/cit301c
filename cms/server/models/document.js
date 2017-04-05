/**
 * Created by Jamespc on 3/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String}
});

module.exports = mongoose.model('Document', schema);
