const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        type: String
    },
    about: {
        type: String
    },
    postData: {
        type: Array
    }
}, { timestamps: true });

const loominateUser = mongoose.model("tan", userSchema);

const postWithUsernameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    posts: [{
        content: {
            type: String,
            required: true
        }
    }],
    image: {
        data: Buffer,
        type: String
    },
});

const PostWithUsername = mongoose.model('PostWithUsername', postWithUsernameSchema);

module.exports = { loominateUser, PostWithUsername };
