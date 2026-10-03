const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");
const rememberMe = document.getElementById("rememberMe");
const forgotPassword = document.getElementById("forgotPassword");
const signupLink = document.getElementById("signupLink");

// Toggle password visibility
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁️";
    }
});

// Login form
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    message.textContent = "";
    message.style.color = "";

    if (email === "" || password === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "#dc3545";
        return;
    }

    // Demo authentication
    const demoEmail = "user@example.com";
    const demoPassword = "123456";

    if (email === demoEmail && password === demoPassword) {
        message.textContent = "Login successful! Welcome back.";
        message.style.color = "#198754";

        if (rememberMe.checked) {
            localStorage.setItem("rememberedEmail", email);
        } else {
            localStorage.removeItem("rememberedEmail");
        }
    } else {
        message.textContent = "Invalid email or password.";
        message.style.color = "#dc3545";
    }
});

// Load remembered email
window.addEventListener("DOMContentLoaded", () => {
    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }
});

// Forgot password
forgotPassword.addEventListener("click", (event) => {
    event.preventDefault();

    message.textContent = "Password reset feature is for demonstration.";
    message.style.color = "#667eea";
});

// Create account
signupLink.addEventListener("click", (event) => {
    event.preventDefault();

    message.textContent = "Account registration feature is for demonstration.";
    message.style.color = "#667eea";
});