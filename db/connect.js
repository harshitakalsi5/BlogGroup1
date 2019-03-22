const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb://hello:world@cluster0-shard-00-00-sny2j.gcp.mongodb.net:27017,cluster0-shard-00-01-sny2j.gcp.mongodb.net:27017,cluster0-shard-00-02-sny2j.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true});
    }
    catch (err) {
        
      console.log(err);
    }
}

module.exports = connectToDb;