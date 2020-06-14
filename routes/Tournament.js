const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// Getting all
router.get('/', async (req,res) => {
    try{
        const tournament = await Tournament.find()
        res.json(tournament)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getTournament , (req,res) => {
    res.json(res.tournament)
})

// Creating One
router.post('/', async (req,res) => {
    const tournament = new Tournament({
        title: req.body.title,
        gamemode: req.body.gamemode,
        description: req.body.description,
        pricepool: req.body.pricepool,
        date: Date.parse(req.body.date),
        time:req.body.time,
        server: req.body.server
    })

    try{
        const newTournament = await tournament.save()
        res.status(201).json(newTournament)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update One
router.put('/:id', function(req,res,next){
    Tournament.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Tournament.findOne({_id:req.params.id}).then(function(tournament){
            res.send(tournament);
        })
    });  
});

// Deleting One
router.delete('/:id', getTournament , async (req,res) => {
    try{
        await res.tournament.remove()
        res.status(200).json({message: 'Tournament Deleted'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getTournament (req, res, next) {
    let tournament
    try {
        tournament = await Tournament.findById(req.params.id)
        if ( tournament == null ) {
            return res.status(404).json({ message: 'Cannot find Tournament' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.tournament = tournament
    next()
}


module.exports = router;