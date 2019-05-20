const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
		required: [true, 'Name field is required.']
	},
	content: {
		type: String,
		required: [true, 'Password hash field is required.']
    },
    latlng: {
		type: [Number, Number],
		required: [true, 'Email field is required.']
    },
    time: {
        type: Number,
        required: [false]
    }
});

const Post = mongoose.model('Post', PostSchema);

// Exporting table for querying and mutating
module.exports = Post;