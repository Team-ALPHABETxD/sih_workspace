import pandas as pd
import numpy as np
import joblib

POLLUTANTS = ['cd', 'cr', 'pb', 'fe', 'mn', 'co', 'ni', 'zn', 'cu']
# mg/L
GUIDES = {
 'cd': 0.003, 'cr': 0.05, 'pb': 0.05, 'fe': 0.3,
 'mn': 0.1,   'co': 0.05, 'ni': 0.02, 'zn': 3.0, 'cu': 0.05
}
SAFE_MEANS = {
    'cd': 0.0008, 'cr': 0.01, 'pb': 0.01, 'fe': 0.05,
    'mn': 0.02,   'co': 0.005, 'ni': 0.004, 'zn': 0.5, 'cu': 0.01
}
SAFE_STDS = {
    metal: max(0.1 * mean, mean * 0.05)  # 10% of mean, or 5% if mean is very small
    for metal, mean in SAFE_MEANS.items()
}
LOGNORMAL_MEANS = {
    metal: np.log(g * 2) 
    for metal, g in GUIDES.items()
}
INSANE_RANGES = {
    metal: (10 * val, 100 * val)
    for metal, val in GUIDES.items()
}




def validate_sample(sample):
    reasons = []
    decision = "accept"

    # 1) Hard rules
    for m in POLLUTANTS:
        if m not in sample:
            return {"decision": "reject", "reasons": [f"Missing value for {m}"]}
        
        val = sample.iloc[0][m]
        if pd.isna(val):
            return {"decision": "reject", "reasons": [f"{m} is empty"]}
        if val < 0:
            return {"decision": "reject", "reasons": [f"{m} cannot be negative ({val})"]}
        if val > INSANE_RANGES[m][1]:
            return {"decision": "reject", "reasons": [f"{m} value: {val} is greater than plausible maximum ({INSANE_RANGES[m][1]})"]}
        if val > GUIDES[m]:
            reasons.append(f"{m} ({val} mg/L) exceeds regulatory/warning threshold ({GUIDES[m]} mg/L)")
            decision = "warn"


    # 2) AI anomally detection
    iso = joblib.load("../model/anomaly_detector_iso_model.joblib")

    iso_pred = iso.predict(sample)
    if iso_pred == -1:
        reasons.append("Anomaly detector: sample is statistically unusual compared to training data.")
    if decision != "reject":
        decision = "warn"

    # 3) Regression dependency checks
    for t in POLLUTANTS:
        X = sample[[m for m in POLLUTANTS if m != t]]
        y = sample.iloc[0][t]
        rf = joblib.load(f"../model/regs_{t}.joblib")

        pred = rf.predict(X)[0]

        # find regression shift 
        denom = max(abs(pred), 1e-9)
        rel_diff = abs(pred - y) / denom

        if rel_diff > 3:
            reasons.append(f"{t} inconsistent with normal cases (it should be ~ {pred:.4g}, but it is actually ~ {y}, difference ~ {rel_diff:.2f})")
            if decision != "reject":
                decision = "warn"

    if not reasons:
        reasons.append("Passed all checks (within expected ranges & relationships).")
        decision = "accept"

    return {"decision": decision, "reasons": reasons}