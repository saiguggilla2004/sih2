const mongoose = require('mongoose');
const successStorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false }
});

const SuccessStory = mongoose.model('SuccessStory', successStorySchema);
module.exports = SuccessStory;
