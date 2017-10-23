const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/mean-tutorial', (err, db) => {
    if (err) {
      console.log('Error Occured while connecting to mongodb', err);
    }
    closure(db);
  });
};

const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

//Response Handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users api
router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err);
      });
  });
});

// Retrieve based on User Id
router.get('/users/:userId', (req, res) => {
  console.log("Received User id " + req.params.userId);
  response.data = req.params.userId;
  res.json(response);
});

module.exports = router;
