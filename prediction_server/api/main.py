from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)

@app.route('/predict/futureTrends', methods=['POST'])
def predict_future():
    try:
        # requested data
        data = request.get_json()
        print(f"data: {data}")
        
        # extract the feilds
        lat = data.get('lat')
        lon = data.get('lon')
        yr = data.get('year')
        state = data.get('state')
        
        # create sample to predict
        sample = {
        'lat': lat,
        'lon': lon,
        'year': yr,
        'state': state
        }
        
        # dataframe
        sample_df = pd.DataFrame([sample])
        
        # model fetch
        model = joblib.load('../model/future_predict_model.joblib')
        
        # predictions
        preds = model.predict(sample_df)
        print(f"preds: {preds}")
        
        # Reshape back: (5 years, n_states)
        pred_probs = preds.reshape(6, 3)
        
        
        # response send
        return jsonify({
            'prediction': pred_probs.tolist()
        })
    except:
        print("Something went wrong")

if __name__ == '__main__':
    app.run(debug = True)