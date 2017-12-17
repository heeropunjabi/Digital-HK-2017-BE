//Dependancies

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema

var productSchema =  new mongoose.Schema({
	url: String,
	name: String
});

//Return model

module.exports = mongoose.model('Products', productSchema);