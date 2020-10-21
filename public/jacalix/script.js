const botonPostProduct = document.getElementById("postProduct");
const botonGetProduct = document.getElementById("getProduct");
const botonUpdateProduct = document.getElementById("updateProduct");
const listado = document.getElementById("listar");

const listarProductos = (res) =>{

    let tabla = document.getElementById("productos");

    let cuerpoAntiguo = document.getElementById("cuerpo");

    let cuerpoTabla = document.createElement("tbody");
    cuerpoTabla.setAttribute("id","cuerpo");

    for(p of res){
        let fila = document.createElement("tr");
        let colid = document.createElement("td");
        let colnombre = document.createElement("td");
        let coldes = document.createElement("td");
        let colrent = document.createElement("td");
        let colcat = document.createElement("td");

        let idtext = document.createTextNode(p.id);
        let nombretext = document.createTextNode(p.name);
        let destext = document.createTextNode(p.description);
        let renttext = document.createTextNode(p.rent);
        let cattext = document.createTextNode(p.cat);

        colid.appendChild(idtext);
        colnombre.appendChild(nombretext);
        coldes.appendChild(destext);
        colrent.appendChild(renttext);
        colcat.appendChild(cattext);

        fila.appendChild(colid);
        fila.appendChild(colnombre);
        fila.appendChild(coldes);
        fila.appendChild(colrent);
        fila.appendChild(colcat);

        cuerpoTabla.appendChild(fila);
    }

    tabla.replaceChild(cuerpoTabla,cuerpoAntiguo);
    }

const rellenarForm = (res) =>{
    let productname = document.getElementById("name");
    let productdescription = document.getElementById("description");
    let seleccionRent = document.getElementById("sub");
    let seleccionCat = document.getElementById("category");

    
        productname.value = res.name;
        productdescription.value = res.description;
        seleccionRent.value = res.rent;
        seleccionCat.value = res.cat;
    

}

botonPostProduct.addEventListener("click", () =>{

    let productid = document.getElementById("id").value;
    let productname = document.getElementById("name").value;
    let productdescription = document.getElementById("description").value;
    let seleccionRent = document.getElementById("sub").value;
    let seleccionCat = document.getElementById("category").value;
    const product ={

        id: parseInt(productid,10),
        name: productname,
        description: productdescription,
        rent: seleccionRent,
        cat: seleccionCat
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

botonUpdateProduct.addEventListener("click", () =>{

    let productid = document.getElementById("id").value;

    fetch('http://localhost:8080/jacalix/products/?id='+parseInt(productid,10))
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => rellenarForm(res))
})