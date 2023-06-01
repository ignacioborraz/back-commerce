document.querySelectorAll('.add-units').forEach(each=> each.addEventListener('click',async()=>{
    let pid = each.id.slice(1)
    try {
        let response = await fetch(`/api/carts/1/product/${pid}/1`, {
            method: 'PUT'
        })
        response = await response.json()
        //console.log(response);
        if (response.status===200) {
            location.replace('/carts/1')
        }else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}))

document.querySelectorAll('.quit-units').forEach(each=> each.addEventListener('click',async()=>{
    let pid = each.id.slice(1)
    try {
        let response = await fetch(`/api/carts/1/product/${pid}/1`, {
            method: 'DELETE'
        })
        response = await response.json()
        //console.log(response);
        if (response.status===200) {
            location.replace('/carts/1')
        }else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}))