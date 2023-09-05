document.getElementById("login").addEventListener("click", (event) => {
  //prevenir la recarga
  event.preventDefault();
  //componer el objeto a enviar al servidor
  let data = {
    mail: document.querySelector("#mail").value,
    password: document.querySelector("#password").value,
  };
  //componer el objeto de configuración de la petición POST para loguear
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  //fetchar y manejar la respuesta
  fetch("/api/auth/login", config)
    .then((res) => res.json())
    .then((res) => console.log(res.user))
    //.then((res) => localStorage.setItem('token',res.token))		//se guarda en una cookie
    .catch((err) => console.log(err));
  //window.location.replace('/products.html')
});

document.getElementById("signout").addEventListener("click", (event) => {
  //prevenir la recarga
  event.preventDefault();
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  //fetchar y manejar la respuesta
  fetch("/api/auth/signout", config)
    .then((res) => res.json())
    .then((res) => console.log(res))
    //.then((res) => localStorage.setItem('token',res.token))		//se guarda en una cookie
    .catch((err) => console.log(err));
});
