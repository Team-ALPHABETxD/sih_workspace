const express = require('express')
const { gLToMgL, findCd, findHei, findSafetyDeg, findPoluDeg, findHmpi, isCriticalToDrink } = require('../middlewares/calculations')
const { predictFutureTrend, predictHeatmapCoords, analyseWithAI } = require('../middlewares/predictions')
const Reports = require('../models/Reports')

const router = express.Router()

// new report 
router.post('/new', async (req, res) => {
    try {
        const {coords, hms, src} = req.body
        
        // modify the heavy metal values => uniform all to mg/L unit
        let acc_hms = []
        for( const hm of hms) {
            let val = hm.val
            if(hm.unit === "g/L") 
                val = gLToMgL(val)

            let mhm = {
                name: hm.name,
                val : val
            }

            acc_hms.push(mhm)
        }

        // calculate the separate indices
        const cd = findCd(acc_hms)
        const hei = findHei(acc_hms)
        const sd = findSafetyDeg(acc_hms)
        const pd = findPoluDeg(acc_hms)
        const hmpi = findHmpi(acc_hms)
        const isCritical = isCriticalToDrink(acc_hms)

        // predictions
        const sampleForPreds = {
            lat: coords.lat,
            lon: coords.lon,
            year: 2025,
            state: sd,
            rain: 44.21,
            soil_type: 1,
            soil_sus: 4,
            source: src
        }
        const fut= await predictFutureTrend(sampleForPreds)
        const hmap = await predictHeatmapCoords(sampleForPreds)

        // analysis
        const anal = await analyseWithAI(acc_hms)

        // generate the report
        const report = {
            owner: "Owner",
            cd: cd,
            hei: hei,
            hmpi: hmpi,
            sd: sd,
            pd: pd,
            isCritical: isCritical,
            fut: fut,
            hmap: hmap,
            anal: anal
        }

        // save report
        const saved_report = await Reports.create(report)

        return res.status(200).json({ flag: "success", report: saved_report }) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({ flag: "fail", msg: "Server error."})
    }
})

// fetch report by id
router.get('/get/:id', async (req, res) => {
    try {
        // auth verify

        // find the report
        const id = req.params.id
        const target_report = await Reports.findById(id)
        if(!target_report) return res.status(404).json({ flag: "invalid", msg: "Not found!" })

        return res.status(200).json({ flag: "success", report: target_report })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ flag: "fail", msg: "Server error."})
    }
})

module.exports = router