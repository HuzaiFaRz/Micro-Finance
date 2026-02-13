# 💰 Micro-Finance

> A modern Micro Finance Management Web Application built using React 19 & Firebase.

🔗 **Live Demo:** https://huzaifamicrofinance.netlify.app/

Micro-Finance is a secure and user-friendly web application that allows users to apply for loans, manage installments, update profile information, and generate financial summaries — all in a clean and responsive UI.

---

## 📌 Project Overview

Micro-Finance is designed to simulate real-world microfinance operations including:

- Loan category selection
- Initial payment calculation
- Monthly installment generation
- Secure user authentication
- Profile & security management
- PDF loan report generation

This project focuses on **financial logic implementation**, **clean UX**, and **secure authentication using Firebase**.

---

## ✨ Key Features

### 👤 User Profile
- Update Full Name & CNIC
- View Phone Number & Account Number

### 🔐 Security
- Change Password functionality
- Shows last password update time
- Route protection using React Router
- Firebase Authentication handling

### 💰 Loan Management
- Library of loan categories
- Custom profit rate & duration logic
- Initial payment calculation
- Automatic monthly installment generation
- Dynamic UI cards for installments

### 📄 PDF Generation
- Download loan summary as PDF
- Clean financial breakdown
- Uses jsPDF

### ⚠️ Danger Zone
- Secure account deletion
- Confirmation-based action handling

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **React Router DOM v7**
- **Tailwind CSS v4**
- **Vite**

### Backend / Database
- **Firebase Authentication**
- **Firebase Firestore**

### UI + Utilities
- **PrimeReact**
- **Heroicons**
- **React Slick**
- **React Tooltip**
- **Lenis** (Smooth scrolling)
- **jsPDF** (PDF export)

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── firebase/
 ├── routes/
 ├── utils/
 └── assets/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/Micro-Finance.git
cd Micro-Finance
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Locally

```bash
npm run dev
```

---

## 🔐 Authentication & Security

- Email/password sign-in
- Protected routes
- Password change

---

## 📊 Financial Logic Explained

- Initial Payment = Loan Amount × Initial Percentage
- Monthly Installment = Remaining Amount ÷ Duration
- Profit Rate applied based on loan type
- JavaScript Date methods handle duration & due dates

---

## 🚀 Deployment

This project is deployed on Netlify:

Live demo 👉 https://huzaifamicrofinance.netlify.app/

---

## 🎯 Future Enhancements


- **Loan Approval Workflow**
- **Dashboard Analytics**

---

## 👨‍💻 About the Author

**Raza A**  
Accountant | Web Developer  
Building real-world financial systems with modern UI & secure logic.

---

## ⭐ Support & Stars

If you find this project useful or cool, don’t forget to ⭐ the repo!