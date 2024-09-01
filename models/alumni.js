const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true
    },
    industry: String,
    location: String,
    profilePicture: String, // Store the path to the image
    bio: String, // Short biography or description
    dateJoined: {
        type: Date,
        default: Date.now
    }
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
