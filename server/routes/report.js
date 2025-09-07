const express = require('express')
const { gLToMgL, findCd, findHei, findSafetyDeg, findPoluDeg, findHmpi, isCriticalToDrink } = require('../middlewares/calculations')
const { predictFutureTrend, predictHeatmapCoords } = require('../middlewares/predictions')

const router = express.Router()

router.post('/new', async (req, res) => {
    try {
        const {coords, hms} = req.body
        
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
            state: sd
        }
        const fut= await predictFutureTrend(sampleForPreds)
        const hmap = await predictHeatmapCoords(sampleForPreds)

        // generate the report
        const report = {
            cd: cd,
            hei: hei,
            hmpi: hmpi,
            sd: sd,
            pd: pd,
            isCritical: isCritical,
            fut: fut,
            hmap: hmap
        }


        return res.status(200).json({ flag: "success", report: report})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ flag: "fail", msg: "Server error."})
    }

})

module.exports = router