document.querySelector('#add-to-cart').addEventListener('click',async()=>{
    let selector = document.querySelector('input[type="number"]')
    let quantity = selector.value
    if (quantity>0) {
        let pid = selector.id
        try {
            let response = await fetch(`/api/carts/1/product/${pid}/${quantity}`, {
                method: 'PUT'
            })
            response = await response.json()
            if (response.status===200) {
                socket.emit('upd_cart',null)
                location.replace('/carts/1')
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        alert('Insert units!')
    }
})