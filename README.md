🧠 AI Diabetic Retinopathy Detection – Frontend

A production-ready React web application for real-time diabetic retinopathy screening using deep learning.

This application connects to a FastAPI backend powered by a DenseNet-based CNN model to classify retinal fundus images into 5 severity stages.

🚀 Live Demo

Frontend (Deploy link – add after Vercel deployment)
Backend API (HuggingFace Spaces):

👉 https://github.com/Ashu777767/retinopathy-backend

📌 Project Overview

Diabetic Retinopathy (DR) is a diabetes complication that affects the eyes.
Early detection is critical to prevent vision loss.

This project provides:

📤 Image Upload Prediction

📷 Live Camera Real-Time Screening

📊 Confidence Score Visualization

🩺 Severity-Based Risk Guidance

🔁 Clear Report + Reset Functionality

⚡ Automatic Camera Lifecycle Handling

🏗 System Architecture
User (Browser)
     ↓
React Frontend (UI)
     ↓
Axios API Call
     ↓
FastAPI Backend
     ↓
DenseNet CNN Model
     ↓
Prediction + Confidence
     ↓
UI Visualization

🛠 Tech Stack
🎨 Frontend

React.js

Tailwind CSS

Axios

Lucide Icons

HTML5 MediaDevices API (Camera Access)

⚙ Backend

FastAPI

TensorFlow / Keras

DenseNet-based CNN

Python

HuggingFace Spaces (Deployment)

🧠 Model Details
Architecture:

DenseNet-based Convolutional Neural Network

Why DenseNet?

Strong gradient flow

Efficient parameter usage

Better feature reuse

High performance on medical imaging

Classification Categories:

No Diabetic Retinopathy

Mild NPDR

Moderate NPDR

Severe NPDR

Proliferative DR

✨ Key Features

✅ Upload high-resolution fundus image
✅ Live camera real-time detection
✅ Confidence percentage visualization
✅ Risk level display
✅ Medical recommendation suggestion
✅ Clear report without page reload
✅ Camera auto-stop when switching mode
✅ Responsive modern UI

📂 Folder Structure (Frontend)
retinopathy-frontend/
│
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md

⚙️ Installation & Local Setup
1️⃣ Clone Repository
git clone https://github.com/Ashu777767/retinopathy-frontend.git
cd retinopathy-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm start


Application will run at:

http://localhost:3000

🔗 Backend Setup

Backend repository:

👉 https://github.com/Ashu777767/retinopathy-backend

Follow backend README instructions for running locally or use deployed API endpoint.

🌐 Deployment

Frontend recommended deployment:

Vercel

Netlify

Backend deployed on:

HuggingFace Spaces

📊 Future Improvements

Add Grad-CAM visualization

Add Model Accuracy metrics

Add Confusion Matrix

Add Authentication system

Add Image history tracking

Add Multi-language support



👨‍💻 Author

Ashutosh Kumar Jha

If you found this project useful, please consider giving it a ⭐ star.
