var express = require('express');
var router = express.Router();

router.route('/document/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/document/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'document': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new document');
        });
});
