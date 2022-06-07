let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");

var home = document.getElementById("divHome");
var perfil = document.getElementById("perfil");
var pedir_cita = document.getElementById("pedir_cita");
var carrito = document.getElementById("carrito");
var ayuda = document.getElementById("ayuda");
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

ayuda.onclick = function(e) {
    e.preventDefault();
    window.location.href = "ayuda.php";
}

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

let input_nombre = document.getElementById("input_nombre");
let input_apellidos = document.getElementById("input_apellidos");
let input_correo = document.getElementById("input_correo");

let url = "./cargar_datos_usuarios.php";

fetch(url)
    .then (function (respuesa) {
        return respuesa.json();
    })
    .then (function (datos) { 
        for (let dato of datos) {
            input_nombre.setAttribute("value", dato[0]);
            input_apellidos.setAttribute("value", dato[1]);
            input_correo.setAttribute("value", dato[2]);
        }
    })
