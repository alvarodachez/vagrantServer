const botonPostProduct = document.getElementById("postProduct");
const botonGetProduct = document.getElementById("getProduct");
const botonUpdateProduct = document.getElementById("updateProduct");
const listado = document.getElementById("listar");

const listarProductos = (res) =>{

    
    
        
    }

botonPostProduct.addEventListener("click", () =>{

    const product ={

        id: 1,
        name: "FRIENDS",
        description: "Comedy",
        rent: "GOLD",
        cat: "SERIE"
    }

    fetch('http://localhost:8080/jacalix/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            "Content-type": "application/json"
        }
        })
  .then(response => response.json())
  .then(json => console.log(json))
})

botonGetProduct.addEventListener("click", () => {


    fetch('http://localhost:8080/jacalix/products')
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => listarProductos(res))
    //.then(res => console.log(res))
    .catch(err => console.log(err))
        
    
})