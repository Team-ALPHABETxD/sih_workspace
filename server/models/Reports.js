const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ReportSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cd: Number,
    hei: Number,
    hmpi: Number,
    sd: Number,
    pd: Number,
    isCritical: Number,
    fut: {
        prediction: [[Number]],
        shap: {
            lat: Number,
            lon: Number,
            rain: Number,
            soil_sus: Number,
            soil_type: Number,
            source: Number,
            state: Number,
            year: Number
        }
    },
    hmap: {
        high: [{
            lat: Number,
            lon: Number
        }],
        modarate: [{
            lat: Number,
            lon: Number
        }],
        low: [{
            lat: Number,
            lon: Number
        }]
    },
    anal: {
        deseases: [String],
        precautions: [String]
    },
    hmcs: [{
        name: String,
        val: Number
    }]
})

module.exports = model('Report', ReportSchema)