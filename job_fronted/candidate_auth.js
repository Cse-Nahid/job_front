// register
const handleRegister = async (event) => {
  event.preventDefault();
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  const registerData = {
    username: formData.get("username"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    father_name: formData.get("father_name"),
    mother_name: formData.get("mother_name"),
    address: formData.get("address"),
    contact_no: formData.get("contact_no"),
    sex: formData.get("sex"),
    age: formData.get("age"),
    education: formData.get("education"),
    experience: formData.get("experience"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  try {
    console.log("Registration data:", JSON.stringify(registerData));
    const res = await fetch("http://127.0.0.1:8000//jobseeker/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server responded with:", errorData); // Log the detailed server response
      throw new Error(errorData.detail || "Registration failed");
    } else {
      alert("Registration successful. Please check your email for confirmation.");
      window.location.href = "./login.html";
    }

  } catch (err) {
    console.error("Registration error", err.message);
    alert("Registration failed: " + err.message);
  }
};


// Login Part
const handleLogin = async (event) => {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    const res = await fetch("https://job-backend-1s1n.onrender.com/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail || "Login failed");
    }

    const data = await res.json();
    if (data.is_disabled) {
      alert("Your account is disabled.");
      return;
    }

    console.log("Auth token received:", data.token);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user_id", data.user_id);
    window.location.href = "./home.html";

  } catch (err) {
    console.error("Login error", err.message);
    alert("Login failed: " + err.message);
  }
};

// Logout Part
const handleLogout = () => {
  if (confirm("Are you sure you want to logout?")) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    fetch("https://job-backend-1s1n.onrender.com/accounts/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Response status:", res.status); // Log response status
      return res.json(); // Parse response to JSON
    })
    .then((data) => {
      if (data.success) { // Assuming your API returns a success property
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        window.location.href = "./login.html";
      } else {
        console.log("Logout failed:", data.message); // Log any error message
        alert("Logout failed. Please try again.");
      }
    })
    .catch((err) => console.log("Logout Error", err));
  }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});
