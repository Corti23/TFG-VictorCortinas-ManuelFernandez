let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");

var perfil = document.getElementById("perfil");	

menu.onclick = function () {
    this.classList.toggle("lista");
};

let iniciar_sesion = document.getElementById("iniciar_sesion");
let registrarse = document.getElementById("registrarse");

iniciar_sesion.onclick = function (e) {
    e.preventDefault();
    window.location.href = "iniciar_sesion.php";
};

registrarse.onclick = function (e) {
    e.preventDefault();
    window.location.href = "registrarse.php";
};