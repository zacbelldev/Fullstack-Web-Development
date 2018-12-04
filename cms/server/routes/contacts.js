var express = require('express');
var router = express.Router();
var Contact = require("../models/contact");

getContacts((req, res) => {
  Contact.find(req.params.id, (err, contact) => {
    if (err)
      res.status(500).json({
        contact: 'Error'
      });
    else
      res.status(200).json({
        contact: 'Added successfully'
      });
  });
});

saveContact((req, res) => {
  Contact.save(req.params.id, (err, contact) => {
    if (err)
      res.status(500).json({
        contact: 'Error'
      });
    getContacts(contact);
  });
});

deleteContact((req, res) => {
  Contact.remove(req.params.id, (err, contact) => {
    if (err)
      res.status(500).json({
        contact: 'Error'
      });
    getContacts(contact);
  });
});

router.get('/', function (req, res) {
  getContacts(res);
});

router.post('/', function (req, res) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveContact(res, contact);
});

router.patch('/:id', function (req, res) {
  Contact.findOne({
    id: req.params.id
  }, function (err, contact) {
    if (err || !contact) {
      return res.status(500).json({
        title: 'No contact found',
        error: {
          contact: 'contact not found'
        }
      });
    }
    contact.name = req.body.name;
    contact.description = req.body.description;
    contact.url = req.body.url;
    saveContact(res, contact);
  });
});

router.delete('/:id', function (req, res) {
  var query = {
    id: req.params.id
  };

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'no contact found',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'no contact found',
        error: {
          contactId: req.params.id
        }
      });
    }
    deleteContact(res, contact);
  });
});
