// const handlelogOut = () => {
//     const token = localStorage.getItem("token");
  
//     fetch("https://jobhunt-backend-r224.onrender.com/candidate/logout", {
//       method: "POST",
//       headers: {
//         Authorization: `Token ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user_id");
//       });
//   };
  