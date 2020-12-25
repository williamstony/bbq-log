const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    time: {
        type: String,
        trim: true
    },
    currentCookerTemp: {
        type: Number
    },
    currentMeatTemp: {
        type: Number
    },
    airTemp: {
        type: Number
    },
    tempUnits: {
        type: String,
        enum: ["Fahrenheit", "Celsius"],
        default: "Fahrenheit"
    },
    ventPercent: {
        type: Number
    },
    addedFuel: {
        type: Boolean,
        default: false
    },
    addedWood: {
        type: Boolean,
        default: false
    },
    addedWater: {
        type: Boolean,
        default: false
    },
    comment: {
        type: String,
        trim: true
    }
})


const cookSchema = new mongoose.Schema({
    meatType: {
        type: String,
        trim: true,
        index: true
    },
    brand: {
        type: String,
        trim: true
    },
    weight: {
        type: Number
    },
    prep: {
        type: String,
        trim: true
    },
    rubs: {
        type: String,
        trim: true
    },
    sauceGlaze: {
        type: String,
        trim: true
    },
    woodPellets: {
        type: String,
        trim: true
    },
    cookerTemp: {
        type: Number
    },
    meatTemp: {
        type: Number
    },
    preCookComments: {
        type: String,
        trim: true
    },
    weather: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    cookLog: [logSchema],
    appearance: {
        type: String,
        trim: true
    },
    smokeRing: {
        type: String,
        trim: true
    },
    tenderness: {
        type: String,
        trim: true
    },
    flavor: {
        type: String,
        trim: true
    },
    postCookComments: {
        type: String,
        trim: true
    },
    notesForNextCook: {
        type: String,
        trim: true
    }
})


module.exports = mongoose.models.Cook || mongoose.model('Cook', cookSchema)