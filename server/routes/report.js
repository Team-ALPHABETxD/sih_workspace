const express = require('express')
const {
  gLToMgL,
  findCd,
  findHei,
  findSafetyDeg,
  findPoluDeg,
  findHmpi,
  isCriticalToDrink
} = require('../middlewares/calculations')
const {
  predictFutureTrend,
  predictHeatmapCoords,
  analyseWithAI,
  predictAsss,
  getAiReplies
} = require('../middlewares/predictions')
const Reports = require('../models/Reports')
const fetchUser = require('../middlewares/auth')
const Users = require('../models/Users')

const router = express.Router()

// new report 
router.post('/new', fetchUser, async (req, res) => {
  try {
    const { coords, hms, src } = req.body

    // owner
    const userId = req.user.id
    const owner = await Users.findById(userId)
    if (!owner) return res.status(400).json({ flag: "invalid", msg: "User not found!" })

    // modify the heavy metal values => uniform all to mg/L unit
    let acc_hms = []
    for (const hm of hms) {
      let val = hm.val
      if (hm.unit === "g/L")
        val = gLToMgL(val)

      let mhm = {
        name: hm.name,
        val: val
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

    // external datas fetching
    const extFlds = await predictAsss(coords)

    // predictions
    const sampleForPreds = {
      lat: coords.lat,
      lon: coords.lon,
      year: 2025,
      state: sd,
      rain: extFlds.rain,
      soil_type: extFlds.st,
      soil_sus: extFlds.ss,
      source: src
    }

    const fut = await predictFutureTrend(sampleForPreds)
    const hmap = await predictHeatmapCoords(sampleForPreds)

    // analysis
    const anal = await analyseWithAI(acc_hms)

    // generate the report
    const report = {
      owner: userId,
      cd: cd,
      hei: hei,
      hmpi: hmpi,
      sd: sd,
      pd: pd,
      isCritical: isCritical,
      fut: fut,
      hmap: hmap,
      anal: anal,
      hmcs: acc_hms
    }

    // save report
    const saved_report = await Reports.create(report)

    return res.status(200).json({ flag: "success", report: saved_report })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ flag: "fail", msg: "Server error." })
  }
})

// fetch report by id
router.get('/get/:id', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await Users.findById(userId)
    if (!user) return res.status(400).json({ flag: "invalid", msg: "User not found!" })

    // find the report
    const id = req.params.id
    const target_report = await Reports.findById(id)
    if (!target_report) return res.status(404).json({ flag: "invalid", msg: "Not found!" })

    // auth verify
    if (userId.toString() != target_report.owner.toString())
      return res.status(200).json({ flag: "invalid", msg: "Not authenicated" })

    return res.status(200).json({ flag: "success", report: target_report })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ flag: "fail", msg: "Server error." })
  }
})

// fetch all reports of an user
router.get('/getall', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await Users.findById(userId)
    if (!user) return res.status(400).json({ flag: "invalid", msg: "User not found!" })

    // find all reports
    const reports = await Reports.find({ owner: userId })
    return res.status(200).json({ flag: "success", reports: reports })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ flag: "fail", msg: "Server error." })
  }
})

// get count of reports for the user
router.get('/count', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await Users.findById(userId)
    if (!user) return res.status(400).json({ flag: "invalid", msg: "User not found!" })

    // count reports
    const count = await Reports.countDocuments({ owner: userId })
    return res.status(200).json({ flag: "success", count: count })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ flag: "fail", msg: "Server error." })
  }
})

// Chat with AI on a specific report
router.post('/chat/:id', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await Users.findById(userId)
    if (!user) return res.status(400).json({ flag: "invalid", msg: "User not found!" })

    // find the report
    const id = req.params.id
    const target_report = await Reports.findById(id)
    if (!target_report) return res.status(404).json({ flag: "invalid", msg: "Not found!" })

    // auth verify
    if (userId.toString() != target_report.owner.toString())
      return res.status(200).json({ flag: "invalid", msg: "Not authenicated" })

    // take query
    const q = req.body.q
    const rep = await getAiReplies(target_report, q)
    return res.status(200).json({ flag: "success", rep: rep })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ flag: "fail", msg: "Server error." })
  }
})

module.exports = router
