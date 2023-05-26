const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ritikapatel290:1234@cluster0.1svrelj.mongodb.net/mydatabase?retryWrites=true&w=majority"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("connected sucessfully to mongo"))
    .catch((err) => console.log("error connecting to mongo", err));
}

module.exports = connectToMongo;

