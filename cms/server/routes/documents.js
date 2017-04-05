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
  Document.findById(req.params.id, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {message: 'Document not found'}
      });
    }
    document.content = req.body.content;
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

  console.log("---in the delete router file---");
  console.log(req.params.id);

  Document.findById(req.params.id, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {message: 'document not found'}
      });
    }
    document.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted Document',
        obj: result
      });
    });
  });
});

module.exports = router;
