const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../../staticUrl').MONGO_URL_SVTECH;

router.get('/', function(req, res, next) {
  MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
    const collection = client.db("svtech").collection("html");
    const find = collection.find();
    find.forEach((doc, err) => {
      if (err) { res.send('Error!').statusCode(401) }
      else { res.json(doc); }
    })
    client.close();
  });
});

module.exports = router;
