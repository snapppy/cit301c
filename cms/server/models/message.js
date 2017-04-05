/**
 * Created by Jamespc on 3/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  id: {type: String, required: true},
  subject: {type: String},
  text: {type: String},
  sender: {type: Schema.Types.ObjectId, ref: 'Contact', required: true}
});

module.exports = mongoose.model('Message', schema);
