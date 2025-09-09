const { GoogleGenAI } = require('@google/genai')
require('dotenv').config()

const PREDICTION_SERVER_API = 'http://localhost:5000/predict/futureTrends'
const GOOGLE_GEN_AI_API_KEY = process.env.GEN_AI_API

const genai = new GoogleGenAI({ apiKey: GOOGLE_GEN_AI_API_KEY })


const predictFutureTrend = async (sample) => {
    try {
        const res = await fetch(PREDICTION_SERVER_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sample)
        })

        data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

const predictHeatmapCoords = async (sample) => {
    try {
        const prompt = `
        The provided water sample is collected from lat: ${sample.lat}, lon: ${sample.lon} and its contamination degree is ${sample.state}

        contamination degree guidlines: 0->low 1->modarate 2->high contaminated

        Give me atleast 5 coordinates nearby the sample where low, modarate and high contaminated water can be found, so that i can generate a heatmap.

        **FORMAT FOR RESPONSE**
        {
            "high" : [{lat: , lon: }, {lat: , lon: }, ...] (Put nearby highly contaminated areas here)
            "modarate" : [{lat: , lon: }, {lat: , lon: }, ...] (Put nearby modarate contaminated areas here)
            "low" : [{lat: , lon: }, {lat: , lon: }, ...] (Put nearby low contaminated areas here)
        }

        **Instruction**
        1. Return ONLY the JSON-formatted string. No markdown, no code fences, no additional text.
        2. Ensure all property names are double-quoted.
        3. All string values must be double-quoted.
        `

        const response = await genai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        // Extract the text response
        const responseText = response.text;
        console.log(response.text)

        // Clean the response to extract just the JSON portion
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}') + 1;
        const jsonString = responseText.slice(jsonStart, jsonEnd);

        // Parse the JSON
        const data = JSON.parse(jsonString)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}


const analyseWithAI = async (hms) => {
    try {
        
        const prompt = `
        The water has 
        Cd: ${hms[0].val} mg/L
        Pb: ${hms[1].val} mg/L
        Fe: ${hms[2].val} mg/L
        Co: ${hms[3].val} mg/L
        Mn: ${hms[4].val} mg/L
        Ni: ${hms[5].val} mg/L
        Cu: ${hms[6].val} mg/L
        Zn: ${hms[7].val} mg/L
        
        Predict the following :
        {
            deseases: [String, ...] (Put the probable deaseases with which one might be affected, with one liner description, (eg, The High cadmium (Cd) levels in water can cause a range of health problems, most notably kidney damage, osteomalacia and osteoporosis.) Only sentences should be in the list not dictionary or anything else)
    
            precautions: [String, ...] (Put the precautions one should take before taking the water)
        }
    
        **Instruction**
        1. Return ONLY the JSON-formatted string. No markdown, no code fences, no additional text.
        2. Ensure all property names are double-quoted.
        3. All string values must be double-quoted.
        `
        const response = await genai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        // Extract the text response
        const responseText = response.text;
        console.log(response.text)
    
        // Clean the response to extract just the JSON portion
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}') + 1;
        const jsonString = responseText.slice(jsonStart, jsonEnd);
    
        // Parse the JSON
        const data = JSON.parse(jsonString)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)   
    }
}

module.exports = { predictFutureTrend, predictHeatmapCoords, analyseWithAI }