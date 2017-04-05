/**
 * Created by Jamespc on 3/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  id: {type: String, required: true},
  name: {type: String},
  email: {type: String},
  phone: {type: String},
  imageUrl: {type: String},
  group: [{type: Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Contact', schema);
