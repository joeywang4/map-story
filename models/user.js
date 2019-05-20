const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
	user: {
		type: String,
		required: [true, 'Name field is required.']
	},
	pwdHash: {
		type: String,
		required: [true, 'Password hash field is required.']
    },
    email: {
		type: String,
		required: [true, 'Email field is required.']
    },
    icon: {
        type: String,
        required: [false]
    }
});

// Creating a table within database with the defined schema
const User = mongoose.model('User', UserSchema);

// Exporting table for querying and mutating
module.exports = User