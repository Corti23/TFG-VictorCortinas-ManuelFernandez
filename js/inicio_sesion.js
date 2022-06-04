let logo = document.getElementById("logo");
logo.onclick = function(e) {
    e.preventDefault();
    window.location.href = "index.php";
}

let boton_login = document.getElementById("entrar");
boton_login.onclick = login;

function login(){	    
    let usuario = document.getElementById("usuario").value;
    let clave = document.getElementById("clave").value;
    
    let url = "./login.php";
    let params = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "usuario=" + usuario + "&clave=" + clave
    };
    
    fetch(url, params)
    .then(function (respuesta) {
        return respuesta.text();
    })
    .then (function (datos) {
        if (datos === "FALSE") {
            alertaErrores();
        } else if (datos === "ADMIN") {
            window.location.href = "pagina_admin.php";
        } else {
            window.location.href = "pagina_principal.php";
        }
    })
    return false;
}

function alertaErrores() {    
    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo_error");
    div_bloqueo.setAttribute("onKeyDown", "return false");

    let caja_alerta = document.createElement("div");
    caja_alerta.setAttribute("class", "caja_alerta_error");
    
    let h2 = document.createElement("h2");
    h2.innerHTML = "Revise usuario y contraseña";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones_error");

    let boton_continuar = document.createElement("button");
    boton_continuar.setAttribute("type", "submit");
    boton_continuar.setAttribute("id", "boton_continuar_error");
    boton_continuar.innerHTML = "ACEPTAR";
    boton_continuar.addEventListener("click", cerrarCajaAlertaErrores);

    caja_alerta.appendChild(h2);

    caja_botones.appendChild(boton_continuar);
    caja_alerta.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_alerta);
    document.body.appendChild(div_bloqueo);
}

function cerrarCajaAlertaErrores() {
    this.parentNode.parentNode.parentNode.remove();
}