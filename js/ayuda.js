let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");

var home = document.getElementById("divHome");
var perfil = document.getElementById("perfil");
var pedir_cita = document.getElementById("pedir_cita");
var carrito = document.getElementById("carrito");
var contacto = document.getElementById("contacto");
var cerrar_sesion = document.getElementById("cerrar_sesion");

perfil.style.display = "block";
cerrar_sesion.style.display = "block";

menu.onclick = function () {
    this.classList.toggle("lista");
};

home.onclick = function(e) {
    e.preventDefault();
    window.location.href = "pagina_principal.php";
}

perfil.onclick = function(e) {
    e.preventDefault();
    window.location.href = "perfil.php";
}

pedir_cita.onclick = function(e) {
    e.preventDefault();
    window.location.href = "pedir_cita.php";
}

carrito.onclick = function(e) {
    e.preventDefault();
    window.location.href = "carrito_personal.php";
}

contacto.onclick = function(e) {
    e.preventDefault();
    window.location.href = "contacto.php";
}

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

// let iniciar_sesion = document.getElementById("iniciar_sesion");
// let registrarse = document.getElementById("registrarse");

// iniciar_sesion.onclick = function (e) {
//     e.preventDefault();
//     window.location.href = "iniciar_sesion.php";
// };

// registrarse.onclick = function (e) {
//     e.preventDefault();
//     window.location.href = "registrarse.php";
// };