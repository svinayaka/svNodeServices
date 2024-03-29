const express = require('express');
const path = require('path');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../../staticUrl').MONGO_URL_SVTECH;

router.get('/', (req, res, next) => {
    JSON.stringify(req.headers)
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if(err) { res.send('Error').statusCode(400) }
        const collection = client.db('svtech').collection('about');
        const find = collection.find();
        find.forEach((doc, err) => {
            if (err) { res.send('Error').statusCode(400) }
            else { res.json(doc) }
        });
        client.close();
    });
})

module.exports = router;