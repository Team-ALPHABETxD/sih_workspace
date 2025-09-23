from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
import shap
from flask_cors import CORS
from accs import validate_sample


app = Flask(__name__)
CORS(app)



@app.route('/predict/anomalyRegs', methods=['POST'])
def predict_anomaly():
    try:
       # requested data
        data = request.get_json()
        print(f"data: {data}")
        
        # dataframe
        sample_df = pd.DataFrame([data])

        res = validate_sample(sample_df)
        return jsonify({
            "anoms" : res
        })
    except Exception as e:
        print("Something went wrong: ", e)
        return jsonify({
            'error': "Server not working",
        })


@app.route('/predict/futureTrends', methods=['POST'])
def predict_future():
    try:
        # requested data
        data = request.get_json()
        print(f"data: {data}")
        
        # dataframe
        sample_df = pd.DataFrame([data])
        print(sample_df.columns)
        
        # model fetch
        model = joblib.load('../model/future_predict_model.joblib')
        
        # predictions
        preds = model.predict(sample_df)
        print(f"preds: {preds}")
        
        # Reshape back: (5 years, n_states)
        pred_probs = preds.reshape(6, 3)
        
        # SHAP analysis
        try:  
            output_idx = 3  # e.g., 1-year ahead, Moderate state
            estimator = model.estimators_[output_idx]
            explainer = shap.TreeExplainer(estimator)
            shap_vals = explainer.shap_values(sample_df)
            shap_vals = shap_vals + 0.01
            
            shap_dict = {
                feat: float(round(shap_vals[0,i], 3)) for i, feat in enumerate(sample_df.columns)
            }
            
            print(f"shap: {shap_dict}")
            
        except:
            print("SHAP error")
            
        # response send
        return jsonify({
            'prediction': pred_probs.tolist(),
            'shap': shap_dict
        })
    except:
        print("Something went wrong")
        return jsonify({
            'error': "Server not working",
        })
    



if __name__ == '__main__':
    app.run(debug = True)