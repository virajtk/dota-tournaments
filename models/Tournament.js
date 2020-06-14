const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    gamemode: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pricepool: {
        type: Number
    },
    date: {
        type: Date,
    },
    time:{
        type:String,
    },
    server: {
        type: String,
        default: "SE Asia",
    },
    hostUser:{
        type: String
    }
})

module.exports = mongoose.model('Tournament', tournamentSchema)