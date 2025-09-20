const { GoogleGenAI } = require('@google/genai')
const { query } = require('express-validator')
require('dotenv').config()

const PREDICTION_SERVER_API = 'http://localhost:5000/predict'
const GOOGLE_GEN_AI_API_KEY = process.env.GEN_AI_API

const genai = new GoogleGenAI({ apiKey: GOOGLE_GEN_AI_API_KEY })



const predictAnomalyRegs = async(sample) => {
    try {
        const res = await fetch(`${PREDICTION_SERVER_API}/anomalyRegs`, {
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

const predictFutureTrend = async (sample) => {
    try {
        const res = await fetch(`${PREDICTION_SERVER_API}/futureTrends`, {
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

const predictAsss = async (coords) => {
    try {
        const prompt = `
        The given latitude is: ${coords.lat} and longitutde is: ${coords.lon}.
        Predict the followings and give the response strictly maintaining the given format :
        {
            "rain" : Number (Predict the regression of rainfall trend of this area like -40.96),
            "st" : Number (Predict the soil type loamy->3, sandy->2, clayey->1),
            "ss" : Number (Predict the soil susceptibility value should be in 1, 2, 3, 4),
        }

        **Instruction**
        1. Return ONLY the JSON-formatted string. No markdown, no code fences, no additional text.
        2. Ensure all property names are double-quoted.
        3. All string values must be double-quoted.
        4. Use external resourses for better prediction.
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
    
            precautions: [String, ...] (Put the precautions one should take before taking the water, remeber the website is mostly used by reseachers and policy makers so the precaution suggestions should be meaningful to them.)
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


const getAiReplies = async (report, query) => {
    try {

        const prompt = `
       You are an expert environmental data analyst and public health advisor. 
        You are given a JSON object called report. 
        Use only the provided fields inside report to generate analysis, predictions, and advice. 
        Do not invent values outside the JSON.

        ---

        ### Report Data:

        📌 **Indices**
        - Cd (contamination degree): ${report.cd}
        - HEI (Heavy metal evaluation index): ${report.hei}
        - HMPI (Heavy metal pollution index): ${report.hmpi}
        - SD (severity degree): ${report.sd}
        - PD (pollution degree): ${report.pd}
        - isCritical: ${report.isCritical}

        📌 **Future Predictions (state probabilities over years)**
        Each row = [Low risk, Moderate risk, High risk]  
        Source: ${report.fut.prediction}

        📌 **Feature Importance (SHAP values)**
        - lat: ${report.fut.shap.lat}  
        - lon: ${report.fut.shap.lon}  
        - rain: ${report.fut.shap.rain}  
        - soil_sus: ${report.fut.shap.soil_sus}  
        - soil_type: ${report.fut.shap.soil_type}  
        - source: ${report.fut.shap.source}  
        - state: ${report.fut.shap.state } 
        - year: ${report.fut.shap.year}  

        📌 **Hotspot Zones**
        - High risk: ${report.hmap.high  }
        - Moderate risk: ${report.hmap.modarate } 
        - Low risk: ${report.hmap.low  }

        📌 **Heavy Metal Concentrations (mg/L)**
        Source: ${report.hmcs} → array of {name, val}

        📌 **Health Impacts**
        Source: ${report.anal.deseases}

        📌 **Precautions**
        Source: ${report.anal.precautions}

        📌 **Query**
        ${query}

        **Instructions**
        1. Answer the query clearly and concisely using both the report data and environmental reasoning.
        2. If report fields provide numeric support, reference them. 
        3. If explanation is needed (like "why" questions), use your expert knowledge to justify.
        4. Response must be 2–3 sentences max. No markdown, no code, only plain text.
        `

        const response = await genai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        // Extract the text response
        const responseText = response.text;
        return responseText
    } catch (error) {
        console.log(error)
    }
}


module.exports = { predictAnomalyRegs, predictFutureTrend, predictHeatmapCoords, analyseWithAI, predictAsss, getAiReplies }