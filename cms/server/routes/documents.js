var express = require('express');
var router = express.Router();
var Document = require("../models/document");

getDocuments((req, res) => {
  Document.find(req.params.id, (err, document) => {
    if (err)
      res.status(500).json({
        document: 'Error'
      });
    else
      res.status(200).json({
        document: 'Added successfully'
      });
  });
});

saveDocument((req, res) => {
  Document.save(req.params.id, (err, document) => {
    if (err)
      res.status(500).json({
        document: 'Error'
      });
    getDocuments(document);
  });
});

deleteDocument((req, res) => {
  Document.remove(req.params.id, (err, document) => {
    if (err)
      res.status(500).json({
        document: 'Error'
      });
    getDocuments(document);
  });
});

router.get('/', function (req, res) {
  getDocuments(res);
});

router.post('/', function (req, res) {
  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveDocument(res, document);
});

router.patch('/:id', function (req, res) {
  Document.findOne({
    id: req.params.id
  }, function (err, document) {
    if (err || !document) {
      return res.status(500).json({
        title: 'No document found',
        error: {
          document: 'document not found'
        }
      });
    }
    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;
    saveDocument(res, document);
  });
});

router.delete('/:id', function (req, res) {
  var query = {
    id: req.params.id
  };

  Document.findOne(query, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'no document found',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'no document found',
        error: {
          documentId: req.params.id
        }
      });
    }
    deleteDocument(res, document);
  });
});
