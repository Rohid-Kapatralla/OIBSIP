// ===============================
// SecureAuth - Login Authentication
// Oasis Infobyte Level 2 Task 4
// ===============================

const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const forgotPage = document.getElementById("forgotPage");
const dashboardPage = document.getElementById("dashboardPage");

// Login elements
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginToggle = document.getElementById("loginToggle");
const loginMessage = document.getElementById("loginMessage");
const rememberMe = document.getElementById("rememberMe");

// Register elements
const registerForm = document.getElementById("registerForm");
const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const registerToggle = document.getElementById("registerToggle");
const confirmToggle = document.getElementById("confirmToggle");
const registerMessage = document.getElementById("registerMessage");

// Forgot password elements
const forgotForm = document.getElementById("forgotForm");
const forgotEmail = document.getElementById("forgotEmail");
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");
const newPasswordToggle = document.getElementById("newPasswordToggle");
const forgotMessage = document.getElementById("forgotMessage");

// Navigation
const forgotLink = document.getElementById("forgotLink");
const signupLink = document.getElementById("signupLink");
const backToLogin = document.getElementById("backToLogin");
const forgotBackLogin = document.getElementById("forgotBackLogin");

// Dashboard
const welcomeName = document.getElementById("welcomeName");
const welcomeEmail = document.getElementById("welcomeEmail");
const logoutBtn = document.getElementById("logoutBtn");


// ===============================
// Utility Functions
// ===============================

function showPage(page) {
    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active");
    });

    page.classList.add("active");
    clearMessages();
}

function clearMessages() {
    document.querySelectorAll(".message").forEach(message => {
        message.textContent = "";
        message.className = "message";
    });
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
}


// ===============================
// Password Hashing
// ===============================

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


// ===============================
// Password Validation
// ===============================

function isValidPassword(password) {
    return password.length >= 8 && /\d/.test(password);
}


// ===============================
// User Storage
// ===============================

function getUsers() {
    return JSON.parse(localStorage.getItem("secureAuthUsers")) || [];
}

function saveUsers(users) {
    localStorage.setItem("secureAuthUsers", JSON.stringify(users));
}


// ===============================
// Create Demo Account
// ===============================

async function createDemoAccount() {
    const users = getUsers();

    const demoEmail = "user@example.com";

    const alreadyExists = users.some(
        user => user.email.toLowerCase() === demoEmail
    );

    if (!alreadyExists) {
        const demoPasswordHash = await hashPassword("Demo1234");

        users.push({
            name: "Demo User",
            email: demoEmail,
            passwordHash: demoPasswordHash
        });

        saveUsers(users);
    }
}


// ===============================
// Password Show / Hide
// ===============================

function togglePasswordVisibility(input, button) {
    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
    } else {
        input.type = "password";
        button.textContent = "👁️";
    }
}

loginToggle.addEventListener("click", () => {
    togglePasswordVisibility(loginPassword, loginToggle);
});

registerToggle.addEventListener("click", () => {
    togglePasswordVisibility(registerPassword, registerToggle);
});

confirmToggle.addEventListener("click", () => {
    togglePasswordVisibility(confirmPassword, confirmToggle);
});

newPasswordToggle.addEventListener("click", () => {
    togglePasswordVisibility(newPassword, newPasswordToggle);
});


// ===============================
// Navigation
// ===============================

signupLink.addEventListener("click", () => {
    showPage(registerPage);
});

backToLogin.addEventListener("click", () => {
    showPage(loginPage);
});

forgotLink.addEventListener("click", () => {
    showPage(forgotPage);
});

forgotBackLogin.addEventListener("click", () => {
    showPage(loginPage);
});


// ===============================
// Registration
// ===============================

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = registerName.value.trim();
    const email = registerEmail.value.trim().toLowerCase();
    const password = registerPassword.value;
    const confirm = confirmPassword.value;

    if (!name || !email || !password || !confirm) {
        showMessage(
            registerMessage,
            "Please fill in all fields.",
            "error"
        );
        return;
    }

    if (!isValidPassword(password)) {
        showMessage(
            registerMessage,
            "Password must contain at least 8 characters and 1 number.",
            "error"
        );
        return;
    }

    if (password !== confirm) {
        showMessage(
            registerMessage,
            "Passwords do not match.",
            "error"
        );
        return;
    }

    const users = getUsers();

    const existingUser = users.find(
        user => user.email.toLowerCase() === email
    );

    if (existingUser) {
        showMessage(
            registerMessage,
            "An account with this email already exists.",
            "error"
        );
        return;
    }

    const passwordHash = await hashPassword(password);

    users.push({
        name,
        email,
        passwordHash
    });

    saveUsers(users);

    showMessage(
        registerMessage,
        "Account created successfully! Redirecting to login...",
        "success"
    );

    registerForm.reset();

    setTimeout(() => {
        showPage(loginPage);
        loginEmail.value = email;
    }, 1200);
});


// ===============================
// Login
// ===============================

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    if (!email || !password) {
        showMessage(
            loginMessage,
            "Please enter your email and password.",
            "error"
        );
        return;
    }

    const users = getUsers();

    const user = users.find(
        account => account.email.toLowerCase() === email
    );

    if (!user) {
        showMessage(
            loginMessage,
            "Invalid email or password.",
            "error"
        );
        return;
    }

    const passwordHash = await hashPassword(password);

    if (passwordHash !== user.passwordHash) {
        showMessage(
            loginMessage,
            "Invalid email or password.",
            "error"
        );
        return;
    }

    const sessionData = {
        name: user.name,
        email: user.email
    };

    if (rememberMe.checked) {
        localStorage.setItem(
            "secureAuthSession",
            JSON.stringify(sessionData)
        );
    } else {
        sessionStorage.setItem(
            "secureAuthSession",
            JSON.stringify(sessionData)
        );
    }

    localStorage.setItem("rememberedEmail", email);

    showDashboard(user);
});


// ===============================
// Dashboard
// ===============================

function showDashboard(user) {
    welcomeName.textContent = `Welcome, ${user.name}!`;
    welcomeEmail.textContent = user.email;

    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active");
    });

    dashboardPage.classList.add("active");
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("secureAuthSession");
    sessionStorage.removeItem("secureAuthSession");

    loginForm.reset();

    showPage(loginPage);
});


// ===============================
// Forgot Password / Reset
// ===============================

forgotForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = forgotEmail.value.trim().toLowerCase();
    const password = newPassword.value;
    const confirm = confirmNewPassword.value;

    if (!email || !password || !confirm) {
        showMessage(
            forgotMessage,
            "Please fill in all fields.",
            "error"
        );
        return;
    }

    if (!isValidPassword(password)) {
        showMessage(
            forgotMessage,
            "New password must contain at least 8 characters and 1 number.",
            "error"
        );
        return;
    }

    if (password !== confirm) {
        showMessage(
            forgotMessage,
            "Passwords do not match.",
            "error"
        );
        return;
    }

    const users = getUsers();

    const userIndex = users.findIndex(
        user => user.email.toLowerCase() === email
    );

    if (userIndex === -1) {
        showMessage(
            forgotMessage,
            "No account found with this email.",
            "error"
        );
        return;
    }

    users[userIndex].passwordHash = await hashPassword(password);

    saveUsers(users);

    showMessage(
        forgotMessage,
        "Password reset successfully! Redirecting to login...",
        "success"
    );

    forgotForm.reset();

    setTimeout(() => {
        showPage(loginPage);
        loginEmail.value = email;
    }, 1200);
});


// ===============================
// Remembered Email
// ===============================

window.addEventListener("DOMContentLoaded", async () => {
    await createDemoAccount();

    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
        loginEmail.value = savedEmail;
        rememberMe.checked = true;
    }

    const savedSession =
        localStorage.getItem("secureAuthSession") ||
        sessionStorage.getItem("secureAuthSession");

    if (savedSession) {
        const session = JSON.parse(savedSession);

        welcomeName.textContent = `Welcome, ${session.name}!`;
        welcomeEmail.textContent = session.email;

        document.querySelectorAll(".page").forEach(section => {
            section.classList.remove("active");
        });

        dashboardPage.classList.add("active");
    }
});