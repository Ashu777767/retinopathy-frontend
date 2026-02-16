# 🧠 AI Diabetic Retinopathy Detection — Frontend

Production-ready React web application for real-time diabetic retinopathy screening powered by a DenseNet-based deep learning model.

---

## 🚀 Live Application

🌐 Frontend (Vercel):  
https://retinopathy-frontend-sigma.vercel.app

🧠 Backend API (HuggingFace Spaces):  
https://github.com/Ashu777767/retinopathy-backend

---

## 📌 Project Overview

Diabetic Retinopathy (DR) is a diabetes complication that affects the retina and may lead to blindness if untreated.

This frontend provides a modern, responsive interface for:

- 📤 Uploading retinal fundus images
- 📷 Real-time live camera screening
- 📊 Confidence score visualization
- 🩺 Severity-based medical guidance
- 🔁 Instant report clearing without page reload
- ⚡ Intelligent camera lifecycle management

---

## 🏗 System Architecture

```
User (Browser)
        ↓
React Frontend (UI)
        ↓
Axios API Call (POST /predict)
        ↓
FastAPI Backend
        ↓
DenseNet CNN Model
        ↓
Prediction + Confidence Score
        ↓
Result Visualization in UI
```

---

## 🛠 Tech Stack

### 🎨 Frontend
- React.js
- Tailwind CSS
- Axios
- Lucide Icons
- HTML5 MediaDevices API

### ⚙ Backend
- FastAPI
- TensorFlow / Keras
- DenseNet-based CNN
- Python
- HuggingFace Spaces (Deployment)

---

## 🧠 Model Details

### Architecture:
DenseNet-based Convolutional Neural Network

### Why DenseNet?
- Strong gradient flow
- Efficient parameter usage
- Feature reuse across layers
- High performance on medical imaging tasks

### Classification Categories:

1. No Diabetic Retinopathy
2. Mild NPDR
3. Moderate NPDR
4. Severe NPDR
5. Proliferative DR

---

## ✨ Key Features

✅ High-resolution fundus image upload  
✅ Live camera real-time detection  
✅ Confidence percentage progress bar  
✅ Risk level classification display  
✅ Severity-based recommendation guidance  
✅ Clear report without page reload  
✅ Camera auto-stop when switching mode  
✅ Fully responsive modern UI  

---

## 📂 Project Structure

```
retinopathy-frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/Ashu777767/retinopathy-frontend.git
cd retinopathy-frontend
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Start Development Server

```
npm start
```

Application runs at:

```
http://localhost:3000
```

---

## 🔗 Backend Setup

Backend Repository:

https://github.com/Ashu777767/retinopathy-backend

You can:

- Run backend locally using its README instructions
OR
- Use deployed HuggingFace API endpoint (already configured)

---

## 🌐 Deployment

### Frontend Deployment:
- Vercel (Recommended)
- Netlify

### Backend Deployment:
- HuggingFace Spaces

Deployment is fully CI/CD enabled — pushing to `main` branch automatically triggers redeployment.

---

## 📊 Future Improvements

- Grad-CAM heatmap visualization
- Model accuracy dashboard
- Confusion matrix integration
- Authentication system
- Patient history tracking
- PDF medical report export
- Multi-language support

---


---

## 👨‍💻 Author

Ashutosh Kumar Jha  
B.E Computer Science

If you found this project useful, please consider giving it a ⭐ star.
