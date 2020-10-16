/**
 * ------------------
 * VARIABLES GLOBALES
 * ------------------
 */
const seleccion = document.getElementById("seleccion");
const boton = document.getElementById("getData");
const filtro1 = document.getElementById("filtro1");
const filtro2 = document.getElementById("filtro2");
const boton1 = document.getElementById("filtrar");
const heroeFilt = document.getElementById("heroesFiltrados");
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
    createFiltro1(res);
    createFiltro2(res);

}
/**
 * -------------------------------------------------
 * FUNCION PARA CREAR EL PRIMER FILTRO POR ALIGNMENT
 * -------------------------------------------------
 */
const createFiltro1 = (res) =>{
    let alignment = [];
    for(heroe of res){
        if(alignment.length == 0 || !alignment.includes(heroe.Alignment)){
            let opcion = document.createElement("option");
            let texto =document.createTextNode(heroe.Alignment);
            opcion.setAttribute("name",heroe.Alignment);
            opcion.appendChild(texto);
            filtro1.appendChild(opcion);
            alignment.push(heroe.Alignment);
        }
    }
}
/**
 * -----------------------------------------------
 * FUNCION PARA CREAR EL SEGUNDO FILTRO POR GENERO
 *  ----------------------------------------------
 */
const createFiltro2 = (res) =>{
    let genders = [];
    for (heroe of res){
        if(genders.length == 0 || !genders.includes(heroe.Gender)){
            let valor = document.createElement("label");
            let boton = document.createElement("input");
            let texto = document.createTextNode(heroe.Gender);
            boton.setAttribute("type","radio");
            boton.setAttribute("name",heroe.Gender);
            valor.appendChild(boton);
            valor.appendChild(texto)
            filtro2.appendChild(valor);

            genders.push(heroe.Gender);
        } 
    }
    
}
/**
 * -------------------------------------------------------------------------------------
 * FUNCION PARA CREAR LAS FILAS CON LOS DATOS DEL HEROE OBTENIDOS CON LA CONSULTA POR ID 
 * -------------------------------------------------------------------------------------
 */
const createHeroeRow = (res) =>{
    let tabla = document.getElementById("tabla");
    let tablas = document.getElementsByTagName("table");
    let filas = document.getElementsByName("unica");

    console.log(filas.length)
    if(tablas.length > 1 &&filas.length==1){
        let columnas = document.getElementsByTagName("td");
        columnas[0].innerText = res[0].Name;
        columnas[1].innerText = res[0].Gender;
        columnas[2].innerText = res[0].Fighting_Skills;
    }
    else{

        let fila = document.createElement("tr");
        fila.setAttribute("name","unica");

    

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
 * ------------------------------------------------------------------------------------------------
 * FUNCION PARA CREAR LA TABLA CON LOS DATOS DEL HEROE OBTENIDOS CON LA CONSULTA POR ALIGN y GENDER 
 * ------------------------------------------------------------------------------------------------
 */
const createFiltHeroeTable = (res) => {

    let tablas = document.getElementsByTagName("table");

    if(tablas.length>1){
       heroeFilt.removeChild(tablas[1])
    }
    
    let tabla = document.createElement("table");
    tabla.setAttribute("border","1")
    tabla.setAttribute("id","tablaFilt")
    
    let filaPrincipal = document.createElement("tr");
    let colPName = document.createElement("th");
    let colPGender = document.createElement("th");
    let colPAlign = document.createElement("th");
    let colPNameText = document.createTextNode("Name");
    let colPGenderText = document.createTextNode("Gender");
    let colPAlignText = document.createTextNode("Alignment");

    colPName.appendChild(colPNameText);
    colPGender.appendChild(colPGenderText);
    colPAlign.appendChild(colPAlignText);

    filaPrincipal.appendChild(colPName);
    filaPrincipal.appendChild(colPGender);
    filaPrincipal.appendChild(colPAlign);

    tabla.appendChild(filaPrincipal);

    for(h of res){
        let fila = document.createElement("tr");

    let nombre = document.createElement("td");
    let textoNombre = document.createTextNode(h.Name);
    nombre.appendChild(textoNombre);

    let genero = document.createElement("td");
    let textoGenero = document.createTextNode(h.Gender);
    genero.appendChild(textoGenero);

    let alignment = document.createElement("td");
    let textoAlignment = document.createTextNode(h.Alignment);
    alignment.appendChild(textoAlignment);

    fila.appendChild(nombre);
    fila.appendChild(genero);
    fila.appendChild(alignment);

    tabla.appendChild(fila); 
    }
     
    heroeFilt.appendChild(tabla);
    
    
    

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
 * ----------------------------------------------------------
 * FUNCION PARA OBTENER EL ALIGNMENT DEL HEROE QUE SE VA A CONSULTAR
 * -----------------------------------------------------------
 */
const obtenerAlignment = () =>{

    let align = filtro1.value;

    console.log(align)
    return align;
}
/**
 * ----------------------------------------------------------
 * FUNCION PARA OBTENER EL GENDER DEL HEROE QUE SE VA A CONSULTAR
 * -----------------------------------------------------------
 */
const obtenerGender = () =>{

    let inputs = document.getElementsByTagName("input");
    let gen;
    console.log(inputs)
    for (i of inputs){
        if(i.checked){
            gen = i.name;
            
        }
        i.checked = false;
    }

    console.log(gen)
    return gen;
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
 * ---------------------------------------------------------------------------------
 * FUNCION QUE NOS DEVUELVE UNA LISTA DE HEROES A PARTIR DE SU ALIGNMENT Y SU GENDER 
 * --------------------------------------------------------------------------------- 
 */
const getDataFilter = (align, gen) =>{

    fetch('/marvel/marvel.php/?alignment='+"\""+align+"\""+'&gender='+"\""+gen+"\"")
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => createFiltHeroeTable(res))
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
 * ------------------------------------------------------
 * BOTON PARA LLAMAR A LA PETICION POR ALIGNMENT Y GENDER
 * ------------------------------------------------------
 */
boton1.addEventListener("click", ()=>{
    getDataFilter(obtenerAlignment(),obtenerGender());
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

