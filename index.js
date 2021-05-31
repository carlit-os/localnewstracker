var express = require('express')
var app = express();

const articles = require("./article_parse.js")
const Build = require('newspaperjs').Build;
//const Article = require('newspaperjs').Article

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB
mongoose.connect('mongodb+srv://amoran2800:4oIiFHy8TZyIiWzr@cluster0.pvbev.mongodb.net/localnewstracker?retryWrites=true&w=majority', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
    name: String,
    type: Schema.Types.Mixed
});

// Mongoose Model definition
var Json = mongoose.model('JString', JsonSchema, 'elpaso');

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

var path = require ('path');
app.use(express.static(path.join(__dirname + '/public')));

// views is directory for all template files
app.set('views', path.join(__dirname + '/views/pages'));
app.set('view engine', 'pug');
//app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//routes/index.js
/* GET layers json data. */
app.get('/maplayers', function (req, res) {
  Json.find({},{'name': 1}, function (err, docs) { //fetch name of document
      //res.json(docs);
      Json.findOne({name:docs[0].name},{},function(err, docs) {  //query it
        res.json(docs)
      })
      
  });




});

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET json data. */
app.get('/mapjson/:name', function (req, res) {
    if (req.params.name) {
        Json.findOne({ name: req.params.name },{}, function (err, docs) {
            res.json(docs);
        });
    }
});
 
/* GET Map page. */
app.get('/map', function(req,res) {
  var db = req.db;
  
  articles.test().then((stories)=>{
    Json.find({},{}, function(err,docs){
      res.render('map', {
          "jmap" : docs,
          lat : 40.7848,
          lng : -73.9598,
          articles: stories //story.title
      });

  });
  })  
  
});

app.get('/test', async function(req,res) {
  // var db = req.db;
  
 
  // articles.test().then((story)=>{
  //   res.send(story.title)
  //   console.log(story)
  // })
  
  // Article('https://www.nytimes.com/2017/06/10/us/politics/sessions-senate-russia-election.html')
  // .then(result=>{
  //   console.log(result);
  //   res.send(result)
  // }).catch(reason=>{
  //   console.log(reason);  
  // })

  // Build.getCategoriesUrl('https://www.nytimes.com', ['politics', 'sports', 'technology']).then(categories=>{
  //   console.log(categories); 
  //   res.send(categories)
  // }).catch(reason=>{
  //   console.log(reason);
  // })
  Build.getArticlesUrl('https://www.ktsm.com').then(result=>{
    console.log(result);
    res.send(result)
  }).catch(reason=>{
    console.log(reason)
  })


});

module.exports = app;

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});