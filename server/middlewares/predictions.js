const { GoogleGenAI } = require('@google/genai')
require('dotenv').config()

const PREDICTION_SERVER_API = 'http://localhost:5000/predict/futureTrends'
const GOOGLE_GEN_AI_API_KEY = process.env.GEN_AI_API

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
        const genai = new GoogleGenAI({ apiKey: GOOGLE_GEN_AI_API_KEY })
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


const analyseWithAI = async (sample) => {
    
}

module.exports = { predictFutureTrend, predictHeatmapCoords }