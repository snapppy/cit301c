var express = require('express');
var router = express.Router();

var Document = require('../models/document');
var Sequence = require('../models/sequence');


var getMaxId = function () {
    maxDocumentId = Sequence.findOne()
        .exec(function (err, sequence) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            sequenceId = sequence._id;
            maxDocumentId = sequence.maxDocumentId;
            sequence.maxDocumentId = maxDocumentId;

        });
};

var sequenceId = null;
var maxDocumentId = getMaxId();

router.get('/', function (req, res, next) {
    Document.find()
        .exec(function (err, documents) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                document: 'Documents success retrieved',
                obj: documents
            });
        })
});


router.delete('/:id', function (req, res, next) {
    var query = {id: req.params.id};

    Document.findOne(query, function (err, document) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!document) {
            return res.status(500).json({
                title: 'No Document Found!',
                error: {documentId: req.params.id}
            });
        }

        document.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                document: 'Document deleted',
                obj: result
            });
        });
    });
});


router.post('/', function (req, res, next) {
    maxDocumentId++;
    console.log("router.post: req.obj = " + JSON.stringify(req.obj))
    Sequence.update({_id: sequenceId}, {$set: {maxDocumentId: maxDocumentId}},
        function (err, sequence) {
            if (err) {
                console.log("update error = " + err);
                return res.status(500).json({
                    title: 'Error updating sequence',
                    error: err
                });
            }

            var document = new Document({
                id: maxDocumentId,
                name: req.body.name,
                description: req.body.description,
                url: req.body.url
            });

            saveDocument(res, document);
        });


});


router.patch('/:id', function (req, res, next) {
    Document.findOne({id: req.params.id}, function (err, document) {
        if (err || !document) {
            return res.status(500).json({
                title: 'No Document Found!',
                error: {document: 'Document not found'}
            });
        }

        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;

        saveDocument(res, document);
    })
});


var saveDocument = function (response, document) {
    document.save(function (err, result) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            return response.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        return response.status(200).json({
            title: 'Document saved',
            obj: document
        });

    });
}


module.exports = router;