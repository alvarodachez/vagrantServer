/**
 * ------------------
 * VARIABLES GLOBALES
 * ------------------
 */
const seleccion = document.getElementById("seleccion");
const boton = document.getElementById("getData");
/**
 * --------------------------------------------------------------------------------
 * FUNCION PARA RELLENAR LOS SELECT CON LOS DATOS OBTENIDOS DE LA CONSULTA COMPLETA 
 * --------------------------------------------------------------------------------
 */
const createSelect = (res) => {

    //console.log(res)
    for(heroe of res){
        let opcion = document.createElement("option");
        let texto = document.createTextNode(heroe.Name);
        opcion.setAttribute("name",heroe.ID);
        opcion.appendChild(texto);
        seleccion.appendChild(opcion);
    }

}
/**
 * -------------------------------------------------------------------------------------
 * FUNCION PARA CREAR LAS FILAS CON LOS DATOS DEL HEROE OBTENIDOS CON LA CONSULTA POR ID 
 * -------------------------------------------------------------------------------------
 */
const createHeroeRow = (res) =>{
    let tabla = document.getElementById("tabla");

    let filas = document.getElementsByTagName("tr");
   
    if(filas.length>1){

        let columnas = document.getElementsByTagName("td");
        columnas[0].innerText = res[0].Name;
        columnas[1].innerText = res[0].Gender;
        columnas[2].innerText = res[0].Fighting_Skills;

    }else{

        let fila = document.createElement("tr");

    

        let nombre = document.createElement("td");
        let textoNombre = document.createTextNode(res[0].Name);
        nombre.appendChild(textoNombre);

        let genero = document.createElement("td");
        let textoGenero = document.createTextNode(res[0].Gender);
        genero.appendChild(textoGenero);

        let skill = document.createElement("td");
        let textoSkill = document.createTextNode(res[0].Fighting_Skills);
        skill.appendChild(textoSkill);

        fila.appendChild(nombre);
        fila.appendChild(genero);
        fila.appendChild(skill);

        tabla.appendChild(fila);    
    }
    
    
}
/**
 * ----------------------------------------------------------
 * FUNCION PARA OBTENER EL ID DEL HEROE QUE SE VA A CONSULTAR
 * -----------------------------------------------------------
 */
const obtenerId = () =>{

    let seleccion = document.getElementById("seleccion").value;
    let opciones = document.getElementsByTagName("option");
    let idHeroe;
    //console.log(opciones)

    for(opcion of opciones){
        //console.log(opcion.attributes.name.nodeValue)
        if(opcion.outerText == seleccion){
            idHeroe = opcion.attributes.name.nodeValue;
        }
    }
    return idHeroe;
}
/**
 * -----------------------------------------------------------------------
 * FUNCION QUE NOS DEVUELVE EL HEROE A PARTIR DE SU ID EN LA BASE DE DATOS 
 * -----------------------------------------------------------------------
 */
const getData = (idHeroe) =>{

    fetch('/marvel/marvel.php/?id='+idHeroe)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => createHeroeRow(res))
}
/**
 * --------------------------------------
 * BOTON PARA LLAMAR A LA PETICION POR ID
 * --------------------------------------
 */
boton.addEventListener("click", ()=>{
    //console.log(seleccion)
    getData(obtenerId());
    
})
/**
 * -------------------------------------------------------------------------------
 * PETICION CUANDO SE CARGA LA PAGINA DE TODOS LOS HEROES PARA AÑADIRLOS AL SELECT
 * -------------------------------------------------------------------------------
 */
window.onload = ()=>{
    fetch('./marvel.php')
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => createSelect(res))
}

