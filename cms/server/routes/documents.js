var express = require('express');
var router = express.Router();
var Document = require('../models/document');
var sequenceGenerator = require('./sequenceGenerator');

router.get('/', function (req, res, next) {
  Document.find().populate('sender').exec(function (err, documents) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting documents',
        error: err
      });
    }
    res.status(200).json({
      document: 'documents successfuly retrieved',
      obj: documents
    });
  })
});


router.post('/', function (req, res, next) {

  var maxDocumentId = sequenceGenerator.nextId("documents");

    var document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });

    document.save(function (err, result) {
      res.setHeader('Content-Type', 'application/json');
      if (err) {
        return res.status(500).json({
          title: 'Error saving document',
          error: err
        });
      }
    });
});

router.patch('/:id', function (req, res, next) {

  var document;

  Document.find().populate("_id").exec(function (err, documents) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting documents',
        error: err
      });
    }

    for (var i in documents) {
      if (documents[i].id == req.params.id) {
        document = documents[i];
      }
    }

    document.name= req.body.name;
    document.id = req.body.id;
    document.description = req.body.description;
    document.url = req.body.url;
    document.save(function(err, result) {
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

  var document;

  Document.find().populate("_id").exec(function (err, documents) {
    if (err) {
      return res.status(500).json({
        title: 'Error getting documents',
        error: err
      });
    }

    for (var i in documents) {
      if (documents[i].id == req.params.id) {
        document = documents[i];
      }
    }

    document.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'Remove function error',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted Document',
        obj: result
      });
    });
  })
});

module.exports = router;
