/**
 * Created by Jamespc on 3/28/2017.
 */

var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var sequenceGenerator = require('./sequenceGenerator');

router.post('/', function (req, res, next) {

  var maxContactId = sequenceGenerator.nextId("contacts");
  console.log("-------------Contact max Id from sequence generator: -------------");
  console.log(maxContactId);

  var groupIds = [];
  for (var id in req.body.group) {
    groupIds.push(req.body.group[id].contactId);
  }

  /*contacts.group.find({ id: { $in: [groupIds]}});*/

  /*Contact.find({ id: { $in: [groupIds]}});*/
  //get the contacts from the databse and search for the _id of every matching id, store in array.
  var groupObjectIds = [];
  Contact.find().populate('_id').exec(function (err, contacts) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting contacts',
        error: err
      });
    }

    for (var i in contacts) {
        //check to see if id matches
        for (var j in contacts) {
            if (contacts[j].id == groupIds[i]) {
                console.log("getting the id's");
              groupObjectIds.push(contacts[j]._id);
            }
        }
    }
    console.log("Group contact _id's");
    console.log(groupObjectIds);
  })

  var contact = new Contact ({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: groupObjectIds
  });
  console.log("THIS IS THE CONTACT INSIDE OF THE POST FUNCTION");
  console.log(contact);

  contact.save(function (err, result) {
    res.setHeader('Content-Type', 'application/json');

    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      })
    }

  return res.status(200).json({
    title: 'contact saved',
    obj: contact
  });

  });


});

router.get('/', function (req, res, next) {
  Contact.find().populate('_id').exec(function (err, contacts) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting contacts',
        error: err
      });
    }
    res.status(200).json({
      message: 'Contacts successfuly retrieved',
      obj: contacts
    });
  })
});

router.patch('/:id', function (req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No contact Found!',
        error: {message: 'contact not found'}
      });
    }
    contact.content = req.body.content;
    contact.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated contact',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {message: 'Contact not found'}
      });
    }
    contact.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted contact',
        obj: result
      });
    });
  });
});

module.exports = router;

