const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'newdatabase';

// Create a new MongoClient
const client = new MongoClient(url);

//Find doc
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('usuario');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('usuario');
  // Insert some documents
  collection.insertMany([
    {nombre : "carlos"}, {nombre : "javi"}, {apellidos : "trujillo"}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocumentsFilter = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('usuario');
  // Find some documents
  collection.find({'nombre': 'javi'}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('usuario');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ "nombre" : "javi" }
    , { $set: { "nombre" : "paco" }}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
};

//hacerlo asincrono
const getUsers = function(callback){
    client.connect(function(err) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      
      const db = client.db(dbName);
      findDocuments(db, function(users) {
        callback(JSON.stringify(users));
        client.close();

      });
    });
};

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  getUsers(function(users){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(users);
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
