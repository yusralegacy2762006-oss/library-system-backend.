const Book = require('../models/book');
const Transaction = require('../models/Transaction');

exports.addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({ message: "Added Successfully" });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllBooks = async (req, res) => {
    try { res.json(await Book.find()); } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.borrowBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        await new Transaction({ bookId, userId }).save();
        await Book.findByIdAndUpdate(bookId, { status: 'Issued' });
        res.json({ message: "Borrowed" });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getHistory = async (req, res) => {
    try { res.json(await Transaction.find({ userId: req.params.userId }).populate('bookId')); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateStatus = async (req, res) => {
    try { await Book.findByIdAndUpdate(req.params.id, { status: req.body.status }); res.json({message:"OK"}); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteBook = async (req, res) => {
    try { await Book.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};