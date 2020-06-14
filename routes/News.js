const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Getting all
router.get('/', async (req,res) => {
    try{
        const news = await News.find()
        res.json(news)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getNews , (req,res) => {
    res.json(res.news)
})

// Creating One
router.post('/', async (req,res) => {
    const news = new News({
        title: req.body.title,
        description: req.body.description,
        type:req.body.type
    })

    try{
        const newNews = await news.save()
        res.status(201).json(newNews)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function getNews (req, res, next) {
    let news
    try {
        news = await News.findById(req.params.id)
        if ( news == null ) {
            return res.status(404).json({ message: 'Cannot find News' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.news = news
    next()
}


module.exports = router;