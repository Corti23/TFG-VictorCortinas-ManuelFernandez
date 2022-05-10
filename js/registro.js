let logo = document.getElementById("logo");
logo.onclick = function(e) {
    e.preventDefault();
    window.location.href = "index.php";
}

let correo = document.getElementById("correo");
correo.addEventListener("input", verificarCorreo)

function verificarCorreo() {
    document.getElementById("correo").classList.remove("coinciden");
    document.getElementById("correo").classList.remove("noCoinciden");

    let validacionCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let valorCorreo = this.value;

    if (valorCorreo.length == 0) {
        document.getElementById("correo").classList.remove("coinciden");
        ocument.getElementById("correo").classList.remove("noCoinciden");
    } else {
        if (validacionCorreo.test(valorCorreo)) {
            document.getElementById("correo").classList.add("coinciden");
        } else {
            document.getElementById("correo").classList.add("noCoinciden");
        }
    }
}

let boton_registro = document.getElementById("registrar");
boton_registro.onclick = verificarPassword;

function verificarPassword(e) {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let correo = document.getElementById("correo").value;
    let direccion = document.getElementById("direccion").value;
    let clave1 = document.getElementById("clave_registro").value;
    let clave2 = document.getElementById("clave_confirma").value;

    if (nombre.length > 0 && apellidos.length > 0 && correo.length > 0 && direccion.length > 0 && clave1.length > 0 && clave2.length > 0) {
        if (clave1===clave2) {
            document.getElementById("clave_registro").classList.remove("noCoinciden");
            document.getElementById("clave_confirma").classList.remove("noCoinciden");
    
            let url = "./login.php";
            let param = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body : "nombre=" + nombre + "&apellidos=" + apellidos + "&correo=" + correo + "&direccion=" + direccion + "&clave_registro=" + clave1
            };
    
            fetch (url, param)
                .then (function (respuesta) {
                    return respuesta.text();
                })
                .then (function () {
                    document.getElementById("clave_registro").classList.add("coinciden");
                    document.getElementById("clave_confirma").classList.add("coinciden");
                    window.location.href = "iniciar_sesion.php";
                })
        } else {
            document.getElementById("clave_registro").classList.add("noCoinciden");
            document.getElementById("clave_confirma").classList.add("noCoinciden");
        }
    } else {
        alert("ERROR, hay campos en blanco!")
    }
}