document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://127.0.0.1:5000";

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showRegister = document.getElementById("showRegister");
  const message = document.getElementById("message");
  const registerMessage = document.getElementById("registerMessage");

  console.log("app.js loaded!");
  console.log("loginForm:", loginForm);
  console.log("registerForm:", registerForm);

  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        message.textContent = data.message;
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } catch (err) {
      message.textContent = "Cannot connect to server.";
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    registerMessage.textContent = "";

    const name = document.getElementById("name").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      registerMessage.textContent = data.message;

      if (res.ok) {
        setTimeout(() => {
          registerForm.classList.add("hidden");
          loginForm.classList.remove("hidden");
        }, 1000);
      }
    } catch (err) {
      registerMessage.textContent = "Cannot connect to server.";
    }
  });
});