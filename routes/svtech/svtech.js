const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = `mongodb://siddhi:siddhi123@ds056559.mlab.com:56559/svtech`;



// mongoose.connect(MONGO_URL, { useNewUrlParser: true }, (error) => { console.log(error); if(!error) { console.log('Connected to DB')}  })
// const htmlSchema = new mongoose.Schema({
//   title: String,
//   content: String
// })
// const html = mongoose.model('html', htmlSchema);
// html.find({}, (err, res) => {
//   if (err) {  console.log(err); }
//   else {
//     console.log(res)
//   }
// })
/* GET home page. */
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
