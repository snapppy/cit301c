/**
 * Created by Jamespc on 3/28/2017.
 */


var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var Contact = require('../models/contact');
var sequenceGenerator = require('./sequenceGenerator');



router.get('/', function (req, res, next) {
  Message.find().populate('sender').exec(function (err, messages) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting messages',
        error: err
      });
    }
    res.status(200).json({
      message: 'Messages successfuly retrieved',
      obj: messages
    });
  })
});


router.post('/', function (req, res, next) {

  var maxMessageId = sequenceGenerator.nextId("messages");

  Contact.findOne({'id': req.body.sender}, {'id': 1}, function (err, contactId) {
    if (err || !contactId) {
      return res.status(500).json({
        title: 'Invalid sender - sender not found',
        error: err
      });
    }

    var message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: contactId
    });

    console.log("----------------Inside message post --------------");
    console.log(message);

    message.save(function (err, result) {
      response.setHeader('Content-Type', 'application/json');
      if (err) {
        return response.status(500).json({
          title: 'Error saving message',
          error: err
        });
      }
    });
  });
});

router.patch('/:id', function (req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    message.content = req.body.content;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;
