// // Register Part
// const handleRegister = async (event) => {
//     event.preventDefault();
//     const form = document.getElementById("register-form");
//     const formData = new FormData(form);
  
//     const registerData = {
//       username: formData.get("username"),
//       first_name: formData.get("first_name"),
//       last_name: formData.get("last_name"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//       confirm_password: formData.get("confirm_password"),
//     };
  
    
//     try {
//       console.log("registration data", JSON.stringify(registerData));
//       const res = await fetch("https://job-backend-1s1n.onrender.com/employer/register/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(registerData),
        
//       });
  
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.detail || "Registration failed");
//       }
//       else{
//         alert("Registration successful. Please check your email for confirmation.");
//         window.location.href = "./login.html";
//       }
  
//     } catch (err) {
//        console.error("Registration error", err.message);
//        alert("Registration failed: " + err.message);
//     }
//     // console.log(JSON.stringify(registerData)); 
//   };
  
//   // Login Part
//   const handleLogin = async (event) => {
//     event.preventDefault();
//     const form = document.getElementById("login-form");
//     const formData = new FormData(form);
  
//     const loginData = {
//       username: formData.get("username"),
//       password: formData.get("password"),
//     };
  
//     try {
//       const res = await fetch("https://job-backend-1s1n.onrender.com/accounts/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//       });
  
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.detail || "Login failed");
//       }
  
//       const data = await res.json();
//       if (data.is_disabled) {
//         alert("Your account is disabled.");
//         return;
//       }
  
//       console.log("Auth token received:", data.token);
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("user_id", data.user_id);
//       window.location.href = "./home.html";
  
//     } catch (err) {
//       console.error("Login error", err.message);
//       alert("Login failed: " + err.message);
//     }
//   };
  
//   // Logout Part
//   // const handleLogout = () => {
//   //   if (confirm("Are you sure you want to logout?")) {
//   //     const token = localStorage.getItem("authToken");
//   //     if (!token) {
//   //       alert("You are not logged in.");
//   //       return;
//   //     }
  
//   //     fetch("https://jobhunt-backend-r224.onrender.com/candidate/logout/", {
//   //       method: "GET",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Token ${token}`,
//   //       },
//   //     })
//   //       .then((res) => {
//   //         if (res.ok) {
//   //           localStorage.removeItem("authToken");
//   //           localStorage.removeItem("user_id");
//   //           window.location.href = "./login.html";
//   //         } else {
//   //           console.log("Logout failed");
//   //           alert("Logout failed. Please try again.");
//   //         }
//   //       })
//   //       .catch((err) => console.log("Logout Error", err));
//   //   }
//   // };
  
//   // // Event Listeners
//   // document.getElementById("logoutButton").addEventListener("click", handleLogout);
//   // Logout Part
//   const handleLogout = () => {
//     if (confirm("Are you sure you want to logout?")) {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         alert("You are not logged in.");
//         return;
//       }
  
//       fetch("https://job-backend-1s1n.onrender.com/accounts/logout/", {
//         method: "POST", // Change to POST
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`,
//         },
//       })
//         .then((res) => {
//           console.log("Response status:", res.status); // Log response status
//           return res.json(); // Parse response to JSON
//         })
//         .then((data) => {
//           if (data.success) { // Assuming your API returns a success property
//             localStorage.removeItem("authToken");
//             localStorage.removeItem("user_id");
//             window.location.href = "./login.html";
//           } else {
//             console.log("Logout failed:", data.message); // Log any error message
//             alert("Logout failed. Please try again.");
//           }
//         })
//         .catch((err) => console.log("Logout Error", err));
//     }
//   };
  
//   // Event Listeners
//   document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("logoutButton").addEventListener("click", handleLogout);
//   });
 



// Register Part
// Register Part
const handleRegister = async (event) => {
  event.preventDefault();
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  const registerData = {
      username: formData.get("username"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      company_name: formData.get("company_name"),
      company_address: formData.get("company_address"),
      business_info: formData.get("business_info"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
  };

  // Check if required fields are not null or empty
  for (const [key, value] of Object.entries(registerData)) {
      if (!value) {
          alert(`${key.replace('_', ' ')} cannot be empty`);
          return;
      }
  }

  try {
      console.log("Registration data", JSON.stringify(registerData));
      const res = await fetch("https://job-backend-1s1n.onrender.com/employer/register/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
      });

      const errorData = await res.json(); // Parse response to JSON first
      console.log("Full error response:", errorData); // Log the error response

      if (!res.ok) {
          console.error("Registration error data:", errorData);
          throw new Error(errorData.business_info ? errorData.business_info[0] : errorData.detail || "Registration failed");
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

      const data = await res.json(); // Parse response once

      if (!res.ok) {
          throw new Error(data.detail || "Login failed");
      }

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
              if (!res.ok) {
                  throw new Error("Logout failed");
              }
              return res.json();
          })
          .then((data) => {
              if (data.success) {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("user_id");
                  window.location.href = "./login.html";
              } else {
                  console.log("Logout failed:", data.message);
                  alert("Logout failed. Please try again.");
              }
          })
          .catch((err) => console.log("Logout Error", err));
  }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) { // Check if the button exists
      logoutButton.addEventListener("click", handleLogout);
  }
});
