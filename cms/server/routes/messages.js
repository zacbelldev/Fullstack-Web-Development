var express = require('express');
var router = express.Router();
var Message = require("../models/message");

var getMessages = function (req, res) {
  // getMessages((req, res) => {
  Message.find(req.params.id, (err, message) => {
    if (err)
      res.status(500).json({
        message: 'Error'
      });
    else
      res.status(200).json({
        message: 'Added successfully'
      });
  });
}

var saveMessage = function (req, res) {
  // saveMessage((req, res) => {
  Message.save(req.params.id, (err, message) => {
    if (err)
      res.status(500).json({
        message: 'Error'
      });
    getMessages(message);
  });
}

var deleteMessage = function (req, res) {
  // deleteMessage((req, res) => {
  Message.remove(req.params.id, (err, message) => {
    if (err)
      res.status(500).json({
        message: 'Error'
      });
    getMessages(message);
  });
}

router.get('/', function (req, res) {
  getMessages(res);
});

router.post('/', function (req, res) {
  var maxMessageId = sequenceGenerator.nextId("messages");

  var message = new Message({
    id: maxMessageId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveMessage(res, message);
});

router.patch('/:id', function (req, res) {
  Message.findOne({
    id: req.params.id
  }, function (err, message) {
    if (err || !message) {
      return res.status(500).json({
        title: 'No message found',
        error: {
          message: 'message not found'
        }
      });
    }
    message.name = req.body.name;
    message.description = req.body.description;
    message.url = req.body.url;
    saveMessage(res, message);
  });
});

router.delete('/:id', function (req, res) {
  var query = {
    id: req.params.id
  };

  Message.findOne(query, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'no message found',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'no message found',
        error: {
          messageId: req.params.id
        }
      });
    }
    deleteMessage(res, message);
  });
});
