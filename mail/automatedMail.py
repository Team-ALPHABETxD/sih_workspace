import json
import smtplib
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from flask import Flask, request, jsonify, send_file
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import encoders
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Image, Spacer, Paragraph
from reportlab.lib.pagesizes import A4

app = Flask(__name__)

def send_email(receiver_email, pdf_filename):
    sender_email = "@gmail.com"
    password = ""  

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "Heavy Metal Report"
    msg.attach(MIMEText("Please find attached the heavy metal concentration report.\nThis is a system generated email. Kindly do not respond to this email."
    "This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.", "plain"))

    with open(pdf_filename, "rb") as f:
        mime = MIMEBase("application", "octet-stream")
        mime.set_payload(f.read())
        encoders.encode_base64(mime)
        mime.add_header("Content-Disposition", f"attachment; filename={pdf_filename}")
        msg.attach(mime)

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, password)
        server.send_message(msg)

#API
@app.route("/automail", methods=["POST"])
def generate_report():
    try:
        data = request.json

        # --- 1. Bar Chart for Heavy Metals ---
        metals = {m["name"]: m["val"] for m in data["hmcs"]}
        plt.figure()
        plt.bar(metals.keys(), metals.values(), color="steelblue")
        plt.title("Heavy Metal Concentrations")
        plt.ylabel("Concentration (mg/L)")
        plt.savefig("bar_chart.png")
        plt.close()

        # --- 2. Heatmap (Geospatial clusters from hmap) ---
        hmap = data.get("hmap", {})
        plt.figure(figsize=(6, 6))
        for level, color in zip(["high", "modarate", "low"], ["red", "orange", "green"]):
            points = hmap.get(level, [])
            if points:
                lats = [p["lat"] for p in points]
                lons = [p["lon"] for p in points]
                plt.scatter(lons, lats, c=color, label=level.capitalize(),
                            alpha=0.7, edgecolors="k")
        plt.xlabel("Longitude")
        plt.ylabel("Latitude")
        plt.title("Heatmap Clusters (Lat/Lon)")
        plt.legend()
        plt.grid(True)
        plt.savefig("heatmap.png")
        plt.close()

        # --- 3. PDF Report ---
        pdf_file = "report.pdf"
        doc = SimpleDocTemplate(pdf_file, pagesize=A4)
        elements = []
        styles = getSampleStyleSheet()
        title_style = styles["Title"]
        normal_style = styles["Normal"]

        elements.append(Paragraph("Heavy Metal Concentration Report", title_style))
        elements.append(Spacer(1, 20))

        # Indices
        elements.append(Paragraph("Indices Summary", styles["Heading2"]))
        elements.append(Paragraph(f"Contamination Degree (Cd): {data['cd']:.3f}", normal_style))
        elements.append(Paragraph(f"Health Exposure Index (HEI): {data['hei']:.3f}", normal_style))
        elements.append(Paragraph(f"Heavy Metal Pollution Index (HMPI): {data['hmpi']:.3f}", normal_style))
        elements.append(Spacer(1, 20))

        # Bar Chart
        elements.append(Paragraph("Heavy Metal Concentrations", styles["Heading2"]))
        elements.append(Image("bar_chart.png", width=400, height=300))
        elements.append(Spacer(1, 20))

        # Heatmap
        elements.append(Paragraph("Heatmap Analysis", styles["Heading2"]))
        elements.append(Image("heatmap.png", width=400, height=300))
        elements.append(Spacer(1, 20))

        # Anomalies
        anoms = data.get("anoms", {})
        elements.append(Paragraph("Anomaly Detection", styles["Heading2"]))
        elements.append(Paragraph(f"Decision: {anoms.get('decision','N/A')}", normal_style))
        for reason in anoms.get("reasons", []):
            elements.append(Paragraph(f"- {reason}", normal_style))
        elements.append(Spacer(1, 20))

        # Health impacts & precautions
        anal = data.get("anal", {})
        elements.append(Paragraph("Health Impacts", styles["Heading2"]))
        for d in anal.get("deseases", []):
            elements.append(Paragraph(f"- {d}", normal_style))
        elements.append(Spacer(1, 20))

        elements.append(Paragraph("Precautions", styles["Heading2"]))
        for p in anal.get("precautions", []):
            elements.append(Paragraph(f"- {p}", normal_style))
        elements.append(Spacer(1, 20))

        pdf_file = "report.pdf"
        doc.build(elements)

        return send_file(pdf_file, as_attachment=True, download_name="report.pdf", mimetype="application/pdf")

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})



if __name__ == "__main__":
    app.run(debug=True, port = 8080)
