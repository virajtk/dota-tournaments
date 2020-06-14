const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Getting all
router.get('/', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getUser , (req,res) => {
    res.json(res.user)
})

// Creating One
router.post('/', async (req,res) => {
    const user = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        contactNo: req.body.contactNo,
        steamURL: req.body.steamURL
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update One
router.put('/:id', function(req,res,next){
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        User.findOne({_id:req.params.id}).then(function(user){
            res.send(user);
        })
    });  
});

// Deleting One
router.delete('/:id', getUser , async (req,res) => {
    try{
        await res.user.remove()
        res.status(200).json({message: 'User Deleted'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getUser (req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if ( user == null ) {
            return res.status(404).json({ message: 'Cannot find User' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.user = user
    next()
}


module.exports = router;