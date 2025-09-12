import json
import smtplib
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from flask import Flask, request, jsonify
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import encoders
from reportlab.platypus import SimpleDocTemplate, Image, Spacer
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
@app.route("", methods=["POST"])
def generate_report():
    try:
        data = request.json
        recipient_email = data["recipient"]
        metals = data["metals"]
        results = data["results"]
        heatmap_data = np.array(data["heatmap"])

        # Bar Graph
        plt.figure()
        plt.bar(metals.keys(), metals.values(), color="steelblue")
        plt.title("Heavy Metal Concentrations")
        plt.ylabel("Concentration")
        plt.savefig("bar_chart.png")
        plt.close()

        # Pie Chart
        plt.figure()
        plt.pie(results.values(), labels=results.keys(), autopct="%1.1f%%", startangle=90)
        plt.title("Results Distribution")
        plt.savefig("pie_chart.png")
        plt.close()

        # Heatmap
        plt.figure()
        sns.heatmap(heatmap_data, annot=True, cmap="coolwarm", cbar=True)
        plt.title("Heatmap Data")
        plt.savefig("heatmap.png")
        plt.close()

        # Create PDF
        pdf_file = "report.pdf"
        doc = SimpleDocTemplate(pdf_file, pagesize=A4)
        elements = []
        styles = getSampleStyleSheet()
        title_style = styles["Title"]
        normal_style = styles["Normal"]


        elements.append(Paragraph("Heavy Metal Concentration Report", title_style))
        elements.append(Spacer(1, 20))

        elements.append(Paragraph(
            "This report provides an overview of the measured concentrations of heavy metals found in the water sample"
            "along with categorized results and a heatmap visualization for further analysis.",
            normal_style
        ))
        elements.append(Spacer(1, 20))


        elements.append(Paragraph("1. Heavy Metal Concentrations", styles["Heading2"]))
        elements.append(Image("bar_chart.png", width=400, height=300))
        elements.append(Spacer(1, 20))


        elements.append(Paragraph("2. Results Distribution", styles["Heading2"]))
        elements.append(Image("pie_chart.png", width=400, height=300))
        elements.append(Spacer(1, 20))

        elements.append(Paragraph("3. Heatmap Analysis", styles["Heading2"]))
        elements.append(Image("heatmap.png", width=400, height=300))
        elements.append(Spacer(1, 20))


        elements.append(Paragraph(
            "Conclusion: For further analaysis refer to the standard permisible limit by World Health Organis=zation",
            normal_style
        ))

        doc.build(elements)

        # Send Email
        send_email(recipient_email, pdf_file)

        return jsonify({"status": "success", "message": f"Report sent to {recipient_email}"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(host="", port=)
