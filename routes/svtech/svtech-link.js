const express = require('express');
const router = express.Router();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../../staticUrl').MONGO_URL_SVTECH;

router.get('/', (req, res, next) => {
    MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
        const collection = client.db("svtech").collection("links");
        const find = collection.find();
        // res.json({"key": "empty"})
        find.forEach((eachLink, err) => {
            if(err) return res.send("Error in fetching links");
            else res.json(eachLink);
        });
    });
});

module.exports = router;
