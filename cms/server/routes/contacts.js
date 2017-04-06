/**
 * Created by Jamespc on 3/28/2017.
 */

var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var sequenceGenerator = require('./sequenceGenerator');

router.post('/', function (req, res, next) {

  var maxContactId = sequenceGenerator.nextId("contacts");

  Contact.find().populate('_id').exec(function (err, contacts) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting contacts',
        error: err
      });
    }

    var groupIds = [];
    for (var id in req.body.group) {
      groupIds.push(req.body.group[id].contactId);
    }

    var groupObjectIds = [];

    for (var i in contacts) {
      for (var j in contacts) {
        if (contacts[j].id == groupIds[i]) {
          console.log("getting the id's");
          groupObjectIds.push(contacts[j]._id);
        }
      }
    }

    var contact = new Contact ({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: groupObjectIds
    });

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
  })


});

router.get('/', function (req, res, next) {
  Contact.find().populate('group').exec(function (err, contacts) {
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

  Contact.find().populate('_id').exec(function (err, contacts) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting contacts',
        error: err
      });
    }

    var groupIds = [];
    for (var id in req.body.group) {
      groupIds.push(req.body.group[id].contactId);
    }

    var groupObjectIds = [];

    for (var i in contacts) {
      for (var j in contacts) {
        if (contacts[j].id == groupIds[i]) {
          groupObjectIds.push(contacts[j]._id);
        }
      }
    }

    var contact;
    for (var i in contacts) {
      if (contacts[i].id == req.body.contactId) {
         contact = contacts[i];
      }
    }

    contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = groupObjectIds;

    console.log("INSIDE PATCH");
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
  })
  /*var contact;

  Contact.find().populate("_id").exec(function (err, contacts) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting contacts',
        error: err
      });
    }

    for (var i in contacts) {
      if (contacts[i].id == req.params.id) {
        contact = contacts[i];
      }
    }

    console.log("Here in contacts patch!");
    console.log(contact);

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
*/
});

router.delete('/:id', function(req, res, next) {
  var contact;

  Contact.find().populate("_id").exec(function (err, contacts) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting contacts',
        error: err
      });
    }

    for (var i in contacts) {
      if (contacts[i].id == req.params.id) {
        contact = contacts[i];
      }
    }

    contact.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'Remove function error',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted Contact',
        obj: result
      });
    });
  })
});

module.exports = router;

