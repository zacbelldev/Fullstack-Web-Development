var express = require('express');
var router = express.Router();
var Contact = require("../models/contact");
var sequenceGenerator = require('./sequenceGenerator');

var getContacts = function (res) {
  Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
      if (err) {
        return res.status(500).json({
          title: 'an error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Contacts fetched successfully',
        contacts: contacts
      });
    })
}

var saveContact = function (res, contact) {
  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }
  contact.save(function (err, res) {
    res.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
        title: 'an error occurred',
        error: err
      });
    }
    getContacts(contact);
  });
}


var deleteContact = function (res, contact) {
  // deleteContact((req, res) => {
  Contact.remove(req.params.id, (err, contact) => {
    if (err)
      res.status(500).json({
        contact: 'Error'
      });
    getContacts(contact);
  });
}

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


module.exports = router;
