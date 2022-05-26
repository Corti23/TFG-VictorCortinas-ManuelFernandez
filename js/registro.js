let logo = document.getElementById("logo");
logo.onclick = function(e) {
    e.preventDefault();
    window.location.href = "index.php";
}

let correo = document.getElementById("correo");
correo.addEventListener("input", verificarCorreo);

let clave_registro = document.getElementById("clave_registro");
clave_registro.addEventListener("input", verificarValoresContraseñaRegistro);

let clave_confirma = document.getElementById("clave_confirma");
clave_confirma.addEventListener("input", verificarValoresContraseñaConfirma);

function verificarCorreo() {
    let info_correo = document.getElementById("info_correo");

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
            info_correo.innerHTML = "✔️";
            info_correo.style.fontSize = "12.5px";
        } else {
            document.getElementById("correo").classList.add("noCoinciden");
            info_correo.innerHTML = "❌";
            info_correo.style.fontSize = "12.5px";
        }
    }
}

function verificarValoresContraseñaRegistro() {
    let info_clave = document.getElementById("info_clave1");
    
    document.getElementById("clave_registro").classList.remove("coinciden");
    document.getElementById("clave_registro").classList.remove("noCoinciden");

    let validacionContraseña = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,8}$/;
    let valorContraseña = this.value;

    if (valorContraseña.length == 0) {
        info_clave.innerHTML = "La contraseña debe tener entre 6 y 8 caracteres, un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.";
        info_clave.style.color = "darkkhaki";
    } else {
        if (validacionContraseña.test(valorContraseña)) {
            info_clave.innerHTML = "Contraseña válida";
            info_clave.style.color = "#23FF00";
            info_clave.style.fontSize = "12.5px";
        } else {
            info_clave.innerHTML = "Contraseña inválida";
            info_clave.style.color = "#FE2E2E";
            info_clave.style.fontSize = "12.5px";
        }
    }
}

function verificarValoresContraseñaConfirma() {
    let info_clave = document.getElementById("info_clave2");
    
    document.getElementById("clave_confirma").classList.remove("coinciden");
    document.getElementById("clave_confirma").classList.remove("noCoinciden");

    let validacionContraseña = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,8}$/;
    let valorContraseña = this.value;

    if (valorContraseña.length == 0) {
        info_clave.innerHTML = "La contraseña debe tener entre 6 y 8 caracteres, un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.";
        info_clave.style.color = "darkkhaki";
        info_clave.style.fontSize = "0.6em";
    } else {
        if (validacionContraseña.test(valorContraseña)) {
            info_clave.innerHTML = "Contraseña válida";
            info_clave.style.color = "#23FF00";
            info_clave.style.fontSize = "12.5px";
        } else {
            info_clave.innerHTML = "Contraseña inválida";
            info_clave.style.color = "#FE2E2E";
            info_clave.style.fontSize = "12.5px";
        }
    }
}

let boton_registro = document.getElementById("registrar");
boton_registro.onclick = verificarPassword;

function verificarPassword(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let nombre_sin_numeros = nombre.replace(/\d/g, '');
    let quitar_espacios = nombre_sin_numeros.replace(/\s/g, '');
    
    let apellidos = document.getElementById("apellidos").value;
    let apellidos_sin_numeros = apellidos.replace(/\d/g, '');
    let quitar_espacios_iniciales = apellidos_sin_numeros.replace(/^\s*|\s*$/g, '');

    let correo = document.getElementById("correo").value;
    let quitar_espacios_iniciales_correo = correo.replace(/^\s*|\s*$/g, '');

    let info_correo = document.getElementById("info_correo").innerHTML;

    let direccion = document.getElementById("direccion").value;
    let quitar_espacios_iniciales_direccion = direccion.replace(/^\s*|\s*$/g, '');

    let clave1 = document.getElementById("clave_registro").value;
    let clave2 = document.getElementById("clave_confirma").value;

    let info_clave1 = document.getElementById("info_clave1").innerHTML;
    let info_clave2 = document.getElementById("info_clave2").innerHTML;


    if (quitar_espacios.length > 0 && quitar_espacios_iniciales.length > 0 && quitar_espacios_iniciales_correo.length > 0 && quitar_espacios_iniciales_direccion.length > 0 && clave1.length > 0 && clave2.length > 0) {
        if (info_correo == "✔️") {
            if (info_clave1 == "Contraseña válida" && info_clave2 == "Contraseña válida") {
                if (clave1 === clave2) {
                    document.getElementById("clave_registro").classList.remove("noCoinciden");
                    document.getElementById("clave_confirma").classList.remove("noCoinciden");
            
                    let url = "./login.php";
                    let param = {
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/x-www-form-urlencoded"
                        },
                        body : "nombre=" + quitar_espacios + "&apellidos=" + quitar_espacios_iniciales + "&correo=" + quitar_espacios_iniciales_correo + "&direccion=" + quitar_espacios_iniciales_direccion + "&clave_registro=" + clave1
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
                alert("Las contraseñas no son válidas!");
            }
        } else {
            alert("El correo no es válido!");
        }
    } else {
        alert("ERROR, hay campos en blanco!");
    }
}