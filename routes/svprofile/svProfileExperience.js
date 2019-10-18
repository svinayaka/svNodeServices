const express = require('express');
const path = require('path');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../../staticUrl').MONGO_URL_SVPROFILE;

router.get('/', (req, res, next) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if(err) { res.send('Error').statusCode(400) }
        const collection = client.db('ksv').collection('svWorkExp');
        const find = collection.find();
        find.forEach((doc, err) => {
            if(err) { res.send('Error in getting svContact file').statusCode(400) }
            else { res.json(doc) }
        });
        client.close();
    })
})

module.exports = router; 