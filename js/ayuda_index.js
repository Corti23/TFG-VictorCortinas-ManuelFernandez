let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");
let pagina_principal = document.getElementById("pagina_principal");
let contacto = document.getElementById("contacto");

let iniciar_sesion = document.getElementById("iniciar_sesion");
let registrarse = document.getElementById("registrarse");

menu.onclick = function () {
    this.classList.toggle("lista");
};

pagina_principal.onclick = function (e) {
    e.preventDefault();
    window.location.href = "pagina_principal.php";
};

contacto.onclick = function (e) {
    e.preventDefault();
    window.location.href = "contacto_index.php";
};

iniciar_sesion.onclick = function (e) {
    e.preventDefault();
    window.location.href = "iniciar_sesion.php";
};

registrarse.onclick = function (e) {
    e.preventDefault();
    window.location.href = "registrarse.php";
};