const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// Get all the Books - API - GET
router.get('/', async (req, res) => {
    try{
        const books = await Book.find()
        res.status(200).json({books})
    } catch(err){
        res.status(500).json({msg: err.message});
    }
})

// Get one book by its id
router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const requiredBook = await Book.findById(id)
        res.status(200).json(requiredBook)
    } catch(err){
        res.status(500).json({msg: err.message});
    }
})


// Add a new Book
router.post('/', async (req, res) => {
    const {title, author, year} = req.body
    const book = new Book({
        title: title,
        author: author,
        year: year
    })
    try{
        const newBook = await book.save()
        res.status(200).json(newBook)
    } catch(err){
        res.status(500).json({msg: err.messsage})
    }
})

// Update a Book
router.put('/:id', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.year){
            return res.status(400).send({
                msg: 'Send all the required fields'
            })
        }
        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)
        if(!result){
            return res.status(404).json({msg: 'Book not found'})
        }
        return res.status(200).json(result)
    } catch(err){
        res.status(500).json({msg: err.messsage})
    }
})

// Delete a Book
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id, req.body)
        if(!result){
            return res.status(404).json({msg: 'Book not found'})
        }
        res.status(200).json({msg: 'Book Deleted Successfully'})
    } catch(err){
        res.status(500).json({msg: err.messsage})
    }
})

module.exports = router