![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Stripe](https://img.shields.io/badge/Payments-Stripe-blueviolet)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![React](https://img.shields.io/badge/Frontend-React-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Build](https://img.shields.io/badge/Build-Passing-success)

# 🩺 HealthAxisApp

**HealthAxisApp** is a full-stack healthcare web application designed to streamline patient-centric workflows such as secure authentication, health data management, appointment handling, online consultations, and payments using a modern client–server architecture.
The project is structured with separate frontend and backend modules to ensure scalability, maintainability, and clean separation of concerns.

---

## 📋 Table of Contents

* 🚀 Project Overview
* ✨ Features
* 🛠️ Tech Stack
* 📦 Setup & Installation

  * Backend
  * Frontend
  * Environment Variables
* 🧑‍🤝‍🧑 Collaborators
* 📌 Contributing
* 📄 License

---

## 🚀 Project Overview

HealthAxisApp provides an intuitive digital healthcare platform where users can:

* Register and authenticate securely
* Manage personal and medical information
* Book and manage appointments
* Attend online video consultations
* Make secure online payments
* Receive email notifications for important events

The project follows a **client–server architecture**:

* **client** — Frontend web application
* **server** — Spring Boot REST API
* `.vscode` — Development and editor configurations

---

## ✨ Features

* ✅ Secure user authentication & authorization
* 🗂 Patient profile and medical data management
* 📅 Appointment booking and scheduling
* 🎥 Online video consultation using **Flying Sauce Video Call API**
* 💳 Payment integration using **Stripe**
* 📧 Automated email notifications (appointment confirmation, reminders, etc.)
* 🔐 Secure API access using JWT & role-based access control
* 📊 Scalable backend architecture with service-based design

---

## 🛠️ Technology Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Frontend       | JavaScript (React.js)           |
| Backend        | **Spring Boot (Java)**          |
| Database       | **MongoDB**                     |
| Authentication | JWT, Spring Security            |
| Payments       | **Stripe API**                  |
| Video Calls    | **Flying Sauce Video Call API** |
| Notifications  | Java Mail Sender                |
| Build Tools    | Maven                           |
| Environment    | Node.js, npm, Java JDK          |

---

## 📦 Setup & Installation

### 🧠 Prerequisites

Make sure you have the following installed:

* Java JDK 17+
* Maven
* Node.js (>= 14.x)
* npm or yarn
* MongoDB (local or cloud)

---

### ⚙️ Backend Setup (Spring Boot)

1. Navigate to the backend folder:

   ```bash
   cd server
   ```

2. Configure application properties:

   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/healthaxis
   server.port=8080

   jwt.secret=your_jwt_secret
   stripe.api.key=your_stripe_secret_key
   mail.username=your_email
   mail.password=your_email_password
   ```

3. Run the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

Backend will start at:

```
http://localhost:8080
```

---

### 🖥️ Frontend Setup

1. Navigate to the client folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

4. Open your browser:

   ```
   http://localhost:3000
   ```

---

## 🔧 Environment Variables

### Backend (`application.properties` or `.env`)

```
MONGODB_URI=mongodb://localhost:27017/healthaxis
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
MAIL_USERNAME=example@gmail.com
MAIL_PASSWORD=your_password
```

### Frontend (`.env`)

```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## 👥 Collaborators

### 🏅 Main Contributors

**Paras Bhardwaj** — *Full-Stack Developer*
Lead developer responsible for system architecture, frontend–backend integration, and core feature development.
🔗 GitHub: [https://github.com/ParasBhardwaj77](https://github.com/ParasBhardwaj77)

**Tejasvi Vermani** — *Co-Developer*
Contributed to backend development, microservices, API integrations, testing, and overall system enhancements.
🔗 GitHub: [https://github.com/tejasvi001](https://github.com/tejasvi001)

---

## 📌 Contributing

Contributions are welcome!

1. Fork the repository
2. Clone your fork
3. Create a new branch:

   ```bash
   git checkout -b feat/your-feature
   ```
4. Commit your changes:

   ```bash
   git commit -m "Add feature"
   ```
5. Push and open a Pull Request

---

