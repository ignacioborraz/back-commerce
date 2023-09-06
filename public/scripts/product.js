const params = new URLSearchParams(location.search);
//console.log(params)
const id = params.get("id");
//console.log(id)

fetch("/api/products/" + id)
  .then((res) => res.json())
  //.then(res=>console.log(res))
  .then((res) => {
    let template = `
        <div class="card d-flex flex-column justify-content-center align-items-center m-2">
            <img src="${res.response.url_photo}" class="card-img-top p-3 w-100" style="height: 30vh" alt="${res.response.title}">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title text-center mb-2">${res.response.title}</h5>
                <p class="card-text text-center mb-2">U$D${res.response.price}</p>
                <p class="card-text text-center mb-2">${res.response.stock} units in stock</p>
                <p class="card-text text-center mb-2">${res.response.description}</p>
                <input type="number" class="text-center" style="width: 150px" value="0" min="0" max=${res.response.stock} name="quantity" id=${res.response.pid}>
                <input id="add-to-cart" type="button" onclick='addToCart()' style="width: 150px" class="btn btn-primary mt-2" value="add to cart!">
            </div>
        </div>
        `;
    document.getElementById("product").innerHTML = template;
  })
  .catch((err) => console.log(err));

async function addToCart() {
  //let token = localStorage.getItem('token')
  let token = document.cookie.includes('token=')
  if (token) {
    let selector = document.querySelector('input[type="number"]');
    let quantity = selector.value;
    if (quantity > 0) {
      let pid = selector.id;
      try {
        let response = await fetch(`/api/carts/1/product/${pid}/${quantity}`, {
          method: "PUT",
        });
        response = await response.json();
        if (response.status === 200) {
          //socket.emit('upd_cart',null)
          location.replace("/cart.html?cid=1");
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Insert units!");
    }
  } else {
    alert("Log In please!");
  }
}
