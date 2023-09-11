document.getElementById("login").addEventListener("click", async (event) => {
  event.preventDefault();
  let data = {
    mail: document.querySelector("#mail").value,
    password: document.querySelector("#password").value,
  };
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch("/api/auth/login", config);
    response = await response.json();
    alert(response.response);
    if (response.status === 200) {
      window.location.replace("/products.html");
    }
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("signout").addEventListener("click", async (event) => {
  event.preventDefault();
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem('token')
    },
  };
  try {
    let response = await fetch("/api/auth/signout", config);
    response = await response.json();
    console.log(response);
    alert(response.response);
    if (response.status === 200) {
      window.location.replace("/index.html");
    }
  } catch (error) {
    console.log(error);
    alert('invalid credentials')
  }
});
