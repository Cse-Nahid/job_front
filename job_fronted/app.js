
const loadServices = () => {
    fetch("https://testing-8az5.onrender.com/services/")
      .then((res) => res.json())
      .then((data) => displayService(data))
      .catch((err) => console.log(err));
  };
  
  const displayService = (services) => {
    //   console.log(services);
    services.forEach((service) => {
      const parent = document.getElementById("service-container");
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="card shadow h-100">
                  <div class="ratio ratio-16x9">
                    <img
                      src=${service.image}
                      class="card-img-top"
                      loading="lazy"
                      alt="..."
                    />
                  </div>
                  <div class="card-body p-3 p-xl-5">
                    <h3 class="card-title h5">${service.name}</h3>
                    <p class="card-text">
                      ${service.description.slice(0, 140)}
                    </p>
                    <a href="#" class="btn btn-primary">Details</a>
                  </div>
                </div>
        `;
      parent.appendChild(li);
    });
  };




  const loadDoctors = (search) => {
    document.getElementById("doctors").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    console.log(search);
    fetch(
      `https://testing-8az5.onrender.com/employer/list/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.results.length > 0) {
          document.getElementById("spinner").style.display = "none";
          document.getElementById("nodata").style.display = "none";
          displyDoctors(data?.results);
        } else {
          document.getElementById("doctors").innerHTML = "";
          document.getElementById("spinner").style.display = "none";
          document.getElementById("nodata").style.display = "block";
        }
      });
  };
  
  const displyDoctors = (doctors) => {
    doctors?.forEach((doctor) => {
      // console.log(doctor);
      const parent = document.getElementById("doctors");
      const div = document.createElement("div");
      div.classList.add("doc-card");
      div.innerHTML = `
          <img class="doc-img" src=${doctor.image} alt="" />
                <h4>${doctor?.full_name}</h4>
                <h6>${doctor?.designation[0]}</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                  numquam!
                </p>
               
                <p>
                
                ${doctor?.specialization?.map((item) => {
                  return `<button>${item}</button>`;
                })}
                </p>
  
                <button > <a target="_blank" href="docDetails.html?doctorId=${
                  doctor.id
                }">Details</a> </button>
          `;
  
      parent.appendChild(div);
    });
  };
  
//   Calling Functions

loadServices();
loadDoctors();
  

const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  if (password === confirm_password) {
    document.getElementById("error").innerText = "";
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (passwordRegex.test(password)) {
      console.log(info);

      fetch("https://testing-8az5.onrender.com/patient/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    } else {
      document.getElementById("error").innerText =
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.";
    }
  } else {
    document.getElementById("error").innerText =
      "Password and confirm password do not match.";
    alert("Password and confirm password do not match.");
  }
};
