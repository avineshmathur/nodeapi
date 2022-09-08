var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes/routes.js')(app);
const crypto = require("crypto");

const id = crypto.randomBytes(16).toString("hex");

console.log(id);
var mongoose = require('mongoose');
var dbConfig = require('./config/config.js');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/getApp',(req,res)=>{
    res.json({ message: "welcome to my application" });
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
