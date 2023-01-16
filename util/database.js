const mongodb = require("mongodb");
const MongoCLient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoCLient.connect(
    "mongodb+srv://ZorroBoi:9843906165suhel@cluster0.bpzt95d.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "NO database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
