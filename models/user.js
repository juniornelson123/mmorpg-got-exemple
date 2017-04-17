var mongoose = require("mongoose")

module.exports = function(app){
	var schema = mongoose.Schema({
		name:{
			type: String,
			required: true
		},

		email:{
			type: String,
			required: true,
			index:{
				unique: true
			}
		},

		password:{
			type: String,
			required: true 
		},

		house:{
			type: String,
			required: true
		}


	})

	return mongoose.model("User", schema)
}