# 🔐 Login Authentication System

A professional and responsive Login Authentication System developed as part of the **Oasis Infobyte Web Development & Designing Internship – Level 2, Task 4**.

The application provides user registration, secure password hashing, login validation, password reset, session management, protected dashboard access, and logout functionality.

---

## 📌 About the Project

This project demonstrates a client-side authentication system using HTML, CSS, and JavaScript.

Users can:

- Create a new account
- Log in using registered credentials
- Reset their password
- Show or hide passwords
- Stay logged in using Remember Me
- Access a protected dashboard after successful authentication
- Log out securely

Passwords are hashed using the **SHA-256 Web Crypto API** before being stored in browser local storage.

> **Note:** This is an internship/demo project using browser localStorage and sessionStorage. It is not intended for production authentication.

---

## ✨ Features

### 👤 User Registration

- Full name registration
- Email validation
- Password validation
- Minimum 8-character password requirement
- At least one number required in the password
- Confirm password validation
- Duplicate email protection

### 🔑 Login System

- Email and password authentication
- Invalid credential handling
- Remember Me functionality
- Password visibility toggle
- Automatic dashboard access after successful login

### 🔄 Password Reset

- Registered email verification
- New password creation
- Password confirmation
- Password validation
- Password hashing
- Successful reset notification

### 🛡️ Authentication & Security

- SHA-256 password hashing
- Session management
- Protected dashboard
- Logout functionality
- Duplicate account prevention
- Client-side form validation

### 📊 Dashboard

After successful authentication, users can see:

- Authenticated status
- User name
- Registered email
- Account status
- Security status
- Current session status
- Logout button

### 📱 Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Crypto API
- Local Storage
- Session Storage

---

## 📂 Project Structure

```text
WebDev-L2-LoginAuthentication/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── login-demo.png