const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    imageUrl: { type: String, default: '' },
    status: { type: String, default: 'Available' }
});

module.exports = mongoose.model('Book', bookSchema);