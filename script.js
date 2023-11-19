document.getElementById("fichaDeEntrada").style.display = "none";

btnAgregar.onclick = function mostrar() {
  document.getElementById("fichaDeEntrada").style.display = "block";
  document.getElementById("encabezado").style.display = "none";
  
};

btnAtras.onclick = function atras() {
window.location.reload();
};



//trasformamos los datos de los imput en constantes.
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const reading = document.getElementById('reading');
const botonAceptar = document.getElementById('btnAceptar')

const listadoDeLibros = document.getElementById("ulBook"); //trasformamos el contenedor de las fichan en constante.

const baseDeDatos = window.localStorage // genera una variable en local storage para guardar datos.

btnAceptar.onclick = function libro() {  //toma los datos del imput y los trasforma en objeto.
  let entradaDeLibro = {
    id: Math.random(1, 100), // genera un numero randon que sera el ID unico del registro
    title: title.value,
    author: author.value,
    pages: pages.value,
    reading: reading.checked
  };

guardarLibro(baseDeDatos, entradaDeLibro); //llama a la funcion para guardar el libro en la dase de datos

}

cargarLibros(baseDeDatos,listadoDeLibros); //carga el libro desde la base de datos para mostrarlo luego en la Html


function guardarLibro(baseDeDatos, entradaDeLibro) {  //indicamos como guardar y que guardar
  baseDeDatos.setItem(entradaDeLibro.id, JSON.stringify(entradaDeLibro)); // tomamos los datos del objeto original para guardar en la base de datos
  window.location.reload(); //con setItem guardamos los daos ID y un string con los datos ya que el objeto no se puede guardar como tal . con reload, refrescamos la pagina
}

function cargarLibros(baseDeDatos, parentNode) {  // recuperamos los datos enteriormente guardados desde la base de datos
  let claves = Object.keys(baseDeDatos); // aqui ingreso a la base de dato solo para obtener la clave que se guardara en un array
  for (i of claves) {    //recorremos el Array de claves generado para poder obtener los datos guardados en el Sting
    let librosDeBaseDeDatos = JSON.parse(baseDeDatos.getItem(i)); //transformamos el String nuevamente en objeto con la opcion PARSEy tomamos los datos de la base con getItem
    crearLibroEnHtml(parentNode, librosDeBaseDeDatos, baseDeDatos); //cargamos la funcion para cargar elementos en el HTLM
  }
}

function crearLibroEnHtml(parentNode, librosDeBaseDeDatos, baseDeDatos) {
  //funcion para cargar los elementos a el html y generar los contenedores y elementos
  // crea elementos en el DOM
  let fichaDeLibro = document.createElement("li");
  let tituloDelLibro = document.createElement("h3");
  let autorDelLibro = document.createElement("p");
  let paginasDelLibro = document.createElement("p");
  let preguntaLeido = document.createElement("p");
  let borrar = document.createElement("button");
  //asigna valor a los elementos desde la funcion cargar libro
  tituloDelLibro.innerHTML = "Libro: " + librosDeBaseDeDatos.title;
  autorDelLibro.innerHTML = "Autor: " + librosDeBaseDeDatos.author;
  paginasDelLibro.innerHTML = "Paginas: " + librosDeBaseDeDatos.pages;
  preguntaLeido.innerHTML = "leido?: " + librosDeBaseDeDatos.reading;
  borrar.innerHTML = "Borrar"; ///ver
  //crea clases a los elementos
  fichaDeLibro.classList.add("ficha");
  borrar.classList.add("delete");

  //indica donde encadenar los elementos creados
  fichaDeLibro.appendChild(tituloDelLibro);
  fichaDeLibro.appendChild(autorDelLibro);
  fichaDeLibro.appendChild(paginasDelLibro);
  fichaDeLibro.appendChild(preguntaLeido);
  fichaDeLibro.appendChild(borrar);
  parentNode.appendChild(fichaDeLibro); //parentNode se redefine en este punto listadoDeLibros

  borrar.onclick = function borrarId() {
    //funcion para borrar elemento de la base de datos
    baseDeDatos.removeItem(librosDeBaseDeDatos.id); // se le indica que desde la base de datos se remueva el item de ID al que pertenece la X
    window.location.reload(); // se recarga la pagina
  };
}