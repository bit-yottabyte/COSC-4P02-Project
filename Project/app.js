const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://one:one@museumdb.bvh1jvz.mongodb.net/test?authMechanism=DEFAULT';

MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected successfully to MongoDB server');

  const collection = client.db("test").collection("users");

  // Perform database operations here

  client.close();
});