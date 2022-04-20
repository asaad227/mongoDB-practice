import pkg from 'mongodb';
const {MongoClient} = pkg;
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

export async function connectToServer(callback) {
  await client.connect(function (err, db) {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db('sample_airbnb');
    console.log('Successfully connected to MongoDB.');

    return callback();
  });
}
export async function getDb() {
  return await dbConnection;
}
