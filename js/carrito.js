let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");
let perfil = document.getElementById("perfil");

var home = document.getElementById("divHome");
var pedir_cita = document.getElementById("pedir_cita");
var cerrar_sesion = document.getElementById("cerrar_sesion");

perfil.style.display = "block";
cerrar_sesion.style.display = "block";

menu.onclick = function () {
    this.classList.toggle("lista");
};

home.onclick = function(e) {
    e.preventDefault();
    window.location.href = "index.php";
}

perfil.onclick = function(e) {
    e.preventDefault();
    window.location.href = "perfil.php";
}

pedir_cita.onclick = function(e) {
    e.preventDefault();
    window.location.href = "pedir_cita.php";
}

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

// let borrar = document.getElementById("borrar");
// borrar.onclick = borrarProductoCarrito;

// function borrarProductoCarrito() {
//     this.parentNode.remove();
// }