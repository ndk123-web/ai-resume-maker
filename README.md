# 🧠 AI Resume Builder

An AI-powered resume builder that enables users to generate tailored, downloadable resumes via a chat-based interface. The app uses Gemini API for content generation and an internal Python service for PDF creation, following a microservices architecture.

---

## 🛠️ Tech Stack

### 🔹 Frontend

- **React** (with Vite)
- **Tailwind CSS**
- **Redux Toolkit** + **Redux Persist**
- **React-Redux**
- **Framer Motion**, **Lucide Icons**

### 🔹 Backend

- **Auth Service**: Node.js + Express
- **Resume Generation Service**: Python + FastAPI

> Note: PDF rendering is handled internally and details of the Python libraries used are intentionally abstracted.

### 🔹 Authentication

- **Firebase Authentication**

  - Google Sign-In
  - GitHub Sign-In

- JWT-secured protected routes

### 🔹 AI Integration

- **Gemini API**: Generates dynamic, prompt-based resume content

---

## 🧱 Architecture

This application follows a **Microservices Architecture**:

- React frontend
- Node.js Auth Service
- FastAPI Resume Generator Service

Each service communicates via RESTful APIs secured with JWT.

---

## 🗂️ Data & File Storage

- **MongoDB Atlas**: Stores users, sessions, prompts, and resume metadata
- **Cloudinary**: Hosts the generated PDF resumes

---

## ⛔️ Not Included Yet

- Payment integration
- Production deployment
- CI/CD pipeline

> These are planned after DevOps training.

---

## ⚙️ Features

- Secure authentication with Firebase (Google + GitHub)
- AI-powered resume suggestions via chat
- Multiple downloadable resume templates
- Resume stored in Cloudinary
- Session-based chat history
- Fully responsive UI

---

## 🧪 Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourname/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Auth Backend (Node.js)

```bash
cd backend-auth
npm install
npm run dev
```

### 4. Resume Generator (FastAPI)

```bash
cd backend-resume
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📷 Screenshots

| Chat UI                                                                                                   | Resume Output | Auth UI                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| ![chat](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Desktop_Dashboard.png) |               | ![auth](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Desktop_SignIn.png) |

| Desktop Dashboard                                                                                                      | Desktop Home                                                                                                 | Desktop SignIn                                                                                                   | Desktop Template                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| ![Desktop_Dashboard](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Desktop_Dashboard.png) | ![Desktop_Home](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Desktop_Home.png) | ![Desktop_SignIn](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Desktop_SignIn.png) | ![Desktop_Template](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Desktop_Template.png) |

| Light Desktop Home                                                                                                       | Light Mobile Home                                                                                                      | Mobile Dashboard                                                                                                     | Mobile Home                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![Light_Desktop_Home](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Light_Desktop_Home.png) | ![Light_Mobile_Home](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Light_Mobile_Home.png) | ![Mobile_Dashboard](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Mobile_Dashboard.png) | ![Mobile_Home](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Mobile_Home.png) |

| Mobile SignIn                                                                                                  | React SVG |
| -------------------------------------------------------------------------------------------------------------- | --------- |
| ![Mobile_SignIn](https://github.com/ndk123-web/ai-resume-maker/raw/main/frontend/src/assets/Mobile_SignIn.png) |

## 📌 Roadmap

- [ ] Add Stripe payment integration
- [ ] Add Docker + Kubernetes support
- [ ] CI/CD with GitHub Actions
- [ ] Serverless deployment of PDF generator

> These are planned after DevOps training.

---

## 🙋‍♂️ Author

Built with dedication by _Navnath Kadam_ (https://www.linkedin.com/in/navnath-kadam-883a57288/)

---

## 👍 Final Thoughts

This project marks the completion of a full-stack SaaS system using modern architecture and tools. It's the foundation for future DevOps, cloud-native deployments, and professional scaling.

**Next Steps:**

- Learn DevOps
- Dockerize services
- Automate deployment
- Implement analytics & monitoring

> Ready for production once templates are integrated properly.
