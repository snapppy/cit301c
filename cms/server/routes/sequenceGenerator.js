/**
 * Created by Jamespc on 3/28/2017.
 */

var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.find()
    .exec(function (err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence[0]._id;
      maxDocumentId = sequence[0].maxDocumentId;
      maxMessageId = sequence[0].maxMessageId;
      maxContactId = sequence[0].maxContactsId;
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "documents":
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case "contacts":
      console.log('INSIDE SEQUENCE GENERATOR CONTACTS');
      console.log(maxContactId);
      maxContactId++;
      console.log(maxContactId);
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      console.log(nextId);
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function (err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
