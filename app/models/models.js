var mongoose = require('mongoose');
const schema = mongoose.Schema({email:String, password:String, username:String, phoneno:Number},{timestamps:true})
module.exports = mongoose.model('Login',schema);