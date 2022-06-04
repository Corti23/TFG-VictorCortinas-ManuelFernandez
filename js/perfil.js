let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");

var home = document.getElementById("divHome");
var pedir_cita = document.getElementById("pedir_cita");
var carrito = document.getElementById("carrito");
var contacto = document.getElementById("contacto");
var ayuda = document.getElementById("ayuda");
var cerrar_sesion = document.getElementById("cerrar_sesion");

cerrar_sesion.style.display = "block";

menu.onclick = function () {
    this.classList.toggle("lista");
};

home.onclick = function(e) {
    e.preventDefault();
    window.location.href = "pagina_principal.php";
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

ayuda.onclick = function(e) {
    e.preventDefault();
    window.location.href = "ayuda.php";
}

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

cargarDatosUsuario();
cargarReservasUsuario();
cargarPedidosUsuario();

let boton_modificar = document.getElementById("boton_modificar");
boton_modificar.addEventListener("click", modificarDatos);

function modificarDatos(e) {
    e.preventDefault();

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_modificar = document.createElement("div");
    caja_modificar.setAttribute("class", "caja_modificar");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Modifica tus datos:";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario");

    let formulario_modificar = document.createElement("form");
    formulario_modificar.setAttribute("id", "formulario_modificar");

    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");
    div4.setAttribute("id", "caja_claves");

    let borde_nombre = document.createElement("fieldset");

    let legend_nombre = document.createElement("legend");
    legend_nombre.setAttribute("class", "legend");
    legend_nombre.innerHTML = "Cambiar nombre:";

    let input_nombre = document.createElement("input");
    input_nombre.setAttribute("id", "input_nombre");
    input_nombre.setAttribute("class", "input");
    input_nombre.setAttribute("type", "text");
    input_nombre.setAttribute("name", "nombre");
    input_nombre.setAttribute("pattern", "^[A-Za-z]+$");
    input_nombre.setAttribute("required", "");

    let borde_apellidos = document.createElement("fieldset");
    
    let legend_apellidos = document.createElement("legend");
    legend_apellidos.setAttribute("class", "legend");
    legend_apellidos.innerHTML = "Cambiar apellidos:";

    let input_apellidos = document.createElement("input");
    input_apellidos.setAttribute("id", "input_apellidos");
    input_apellidos.setAttribute("class", "input");
    input_apellidos.setAttribute("type", "text");
    input_apellidos.setAttribute("name", "apellidos");
    input_apellidos.setAttribute("pattern", "^[A-Za-z]+$");
    input_apellidos.setAttribute("required", "");

    let borde_correo = document.createElement("fieldset");

    let legend_correo = document.createElement("legend");
    legend_correo.setAttribute("class", "legend");
    legend_correo.innerHTML = "Cambiar correo:";

    let input_correo = document.createElement("input");
    input_correo.setAttribute("id", "input_correo");
    input_correo.setAttribute("class", "input");
    input_correo.setAttribute("type", "email");
    input_correo.setAttribute("name", "correo");
    input_correo.setAttribute("required", "");
    input_correo.addEventListener("input", verificarCorreo);

    let span = document.createElement("span");
    span.setAttribute("id", "info_correo")

    let borde_direccion = document.createElement("fieldset");

    let legend_direccion = document.createElement("legend");
    legend_direccion.setAttribute("class", "legend");
    legend_direccion.innerHTML = "Cambiar dirección:";

    let input_direccion = document.createElement("input");
    input_direccion.setAttribute("id", "input_direccion");
    input_direccion.setAttribute("class", "input");
    input_direccion.setAttribute("type", "text");
    input_direccion.setAttribute("name", "direccion");
    input_direccion.setAttribute("required", "");

    let boton_cambiar_clave = document.createElement("button");
    boton_cambiar_clave.setAttribute("type", "submit");
    boton_cambiar_clave.setAttribute("id", "boton_cambiar_clave");
    boton_cambiar_clave.innerHTML = "Cambiar contraseña";
    boton_cambiar_clave.onclick = function() {
        this.classList.toggle("claves");
        caja_modificar.classList.toggle("claves");
        caja_botones.classList.toggle("claves");
    }

    let borde_clave1 = document.createElement("fieldset");
    borde_clave1.setAttribute("id", "borde_clave1");

    let legend_clave1 = document.createElement("legend");
    legend_clave1.setAttribute("class", "legend");
    legend_clave1.innerHTML = "Introduzca la nueva contraseña:";

    let input_clave1 = document.createElement("input");
    input_clave1.setAttribute("id", "clave1");
    input_clave1.setAttribute("class", "input");
    input_clave1.setAttribute("type", "password");
    input_clave1.setAttribute("name", "clave1");
    input_clave1.setAttribute("minlength", "6");
    input_clave1.setAttribute("maxlength", "8");
    input_clave1.setAttribute("required", "");
    input_clave1.addEventListener("input", verificarValoresContraseñaRegistro);

    let info_clave1 = document.createElement("div");
    info_clave1.setAttribute("id", "info_clave1");
    info_clave1.innerHTML = "La contraseña debe tener entre 6 y 8 caracteres, un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.";

    let borde_clave2= document.createElement("fieldset");
    borde_clave2.setAttribute("id", "borde_clave2");

    let legend_clave2 = document.createElement("legend");
    legend_clave2.setAttribute("class", "legend");
    legend_clave2.innerHTML = "Repite la nueva contraseña:";

    let input_clave2 = document.createElement("input");
    input_clave2.setAttribute("id", "clave2");
    input_clave2.setAttribute("class", "input");
    input_clave2.setAttribute("type", "password");
    input_clave2.setAttribute("name", "clave2");
    input_clave2.setAttribute("minlength", "6");
    input_clave2.setAttribute("maxlength", "8");
    input_clave2.setAttribute("required", "");
    input_clave2.addEventListener("input", verificarValoresContraseñaConfirma);

    let info_clave2 = document.createElement("div");
    info_clave2.setAttribute("id", "info_clave2");
    info_clave2.innerHTML = "La contraseña debe tener entre 6 y 8 caracteres, un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.";
    
    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_confirmar");
    boton_confirmar.innerHTML = "MODIFICAR";
    boton_confirmar.addEventListener("click", confirmarCambios);

    let boton_confirmar_clave = document.createElement("button");
    boton_confirmar_clave.setAttribute("type", "submit");
    boton_confirmar_clave.setAttribute("id", "boton_confirmar_clave");
    boton_confirmar_clave.innerHTML = "MODIFICAR";
    boton_confirmar_clave.addEventListener("click", confirmarCambiosClave);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaModificar);

    caja_modificar.appendChild(titulo); 

    borde_nombre.appendChild(input_nombre);
    borde_nombre.appendChild(legend_nombre);
    div1.appendChild(borde_nombre);

    input_correo.appendChild(span);
    borde_correo.appendChild(input_correo);
    borde_correo.appendChild(legend_correo);
    div1.appendChild(borde_correo);

    borde_apellidos.appendChild(input_apellidos);
    borde_apellidos.appendChild(legend_apellidos);
    div2.appendChild(borde_apellidos);

    borde_direccion.appendChild(input_direccion);
    borde_direccion.appendChild(legend_direccion);
    div2.appendChild(borde_direccion);

    div3.appendChild(boton_cambiar_clave);

    borde_clave1.appendChild(input_clave1);
    borde_clave1.appendChild(info_clave1);
    borde_clave1.appendChild(legend_clave1);
    div4.appendChild(borde_clave1);

    borde_clave2.appendChild(input_clave2);
    borde_clave2.appendChild(info_clave2);
    borde_clave2.appendChild(legend_clave2);
    div4.appendChild(borde_clave2);

    div3.appendChild(div4);

    caja_formulario.appendChild(div1);
    caja_formulario.appendChild(div2);
    caja_modificar.appendChild(caja_formulario);

    caja_modificar.appendChild(div3);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_confirmar_clave);
    caja_botones.appendChild(boton_cancelar);
    caja_modificar.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_modificar);
    document.body.appendChild(div_bloqueo);

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
                input_direccion.setAttribute("value", dato[3]);
            }
        })
}

function verificarCorreo() {
    let info_correo = document.getElementById("info_correo");

    document.getElementById("input_correo").classList.remove("coinciden");
    document.getElementById("input_correo").classList.remove("noCoinciden");

    let validacionCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let valorCorreo = this.value;

    if (valorCorreo.length == 0) {
        document.getElementById("input_correo").classList.remove("coinciden");
        ocument.getElementById("input_correo").classList.remove("noCoinciden");
    } else {
        if (validacionCorreo.test(valorCorreo)) {
            document.getElementById("input_correo").classList.add("coinciden");
            info_correo.innerHTML = "✔️";
            info_correo.style.fontSize = "12.5px";
        } else {
            document.getElementById("input_correo").classList.add("noCoinciden");
            info_correo.innerHTML = "❌";
            info_correo.style.fontSize = "12.5px";
        }
    }
}

function verificarValoresContraseñaRegistro() {
    let info_clave = document.getElementById("info_clave1");
    
    document.getElementById("clave1").classList.remove("coinciden");
    document.getElementById("clave2").classList.remove("noCoinciden");

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
    
    document.getElementById("clave1").classList.remove("coinciden");
    document.getElementById("clave2").classList.remove("noCoinciden");

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

function confirmarCambios(e) {
    e.preventDefault();

    let nombre = document.getElementById("input_nombre").value;
    let nombre_sin_numeros = nombre.replace(/\d/g,"");
    let quitar_espacios = nombre_sin_numeros.replace(/\s/g, '');
    
    let apellidos = document.getElementById("input_apellidos").value;
    let apellidos_sin_numeros = apellidos.replace(/\d/g,"");
    let quitar_espacios_iniciales = apellidos_sin_numeros.replace(/^\s*|\s*$/g, '');

    let correo = document.getElementById("input_correo").value;
    let quitar_espacios_iniciales_correo = correo.replace(/^\s*|\s*$/g, '');

    let info_correo = document.getElementById("info_correo").innerHTML;

    let direccion = document.getElementById("input_direccion").value;
    let quitar_espacios_iniciales_direccion = direccion.replace(/^\s*|\s*$/g, '');

    if (quitar_espacios.length > 0 && quitar_espacios_iniciales.length > 0 && correo.length > 0 && direccion.length > 0) {
        if (info_correo == "✔️") {
            let url = "./actualizar_datos_usuario.php";
            let param = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body : "nombre=" + quitar_espacios + "&apellidos=" + quitar_espacios_iniciales + "&correo=" + quitar_espacios_iniciales_correo + "&direccion=" + quitar_espacios_iniciales_direccion
            };

            fetch (url, param)
                .then (function (respuesta) {
                    return respuesta.text();
                })
                .then (function (datos) {
                    if (datos == "TRUE") {
                        document.getElementById("div_bloqueo").remove();
                        cargarDatosUsuario();
                    } else {
                        let mensaje = "Ha ocurrido un error al modificar los datos";
                        alertaErrores(mensaje);
                    }
                })
        } else {
            let mensaje = "El correo no es válido";
            alertaErrores(mensaje);
        }
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function confirmarCambiosClave(e) {
    e.preventDefault();

    let nombre = document.getElementById("input_nombre").value;
    let nombre_sin_numeros = nombre.replace(/\d/g,"");
    let quitar_espacios = nombre_sin_numeros.replace(/\s/g, '');
    
    let apellidos = document.getElementById("input_apellidos").value;
    let apellidos_sin_numeros = apellidos.replace(/\d/g,"");
    let quitar_espacios_iniciales = apellidos_sin_numeros.replace(/^\s*|\s*$/g, '');

    let correo = document.getElementById("input_correo").value;
    let quitar_espacios_iniciales_correo = correo.replace(/^\s*|\s*$/g, '');

    let info_correo = document.getElementById("info_correo").innerHTML;

    let direccion = document.getElementById("input_direccion").value;
    let quitar_espacios_iniciales_direccion = direccion.replace(/^\s*|\s*$/g, '');

    let clave1 = document.getElementById("clave1").value;
    let clave2 = document.getElementById("clave2").value;

    let info_clave1 = document.getElementById("info_clave1").innerHTML;
    let info_clave2 = document.getElementById("info_clave2").innerHTML;

    if (quitar_espacios.length > 0 && quitar_espacios_iniciales.length > 0 && quitar_espacios_iniciales_correo.length > 0 && quitar_espacios_iniciales_direccion.length > 0 && clave1.length > 0 && clave2.length > 0) {
        if (info_correo == "✔️") {
            if (info_clave1 == "Contraseña válida" && info_clave2 == "Contraseña válida") {
                if (clave1 === clave2) {
                    document.getElementById("clave1").classList.remove("noCoinciden");
                    document.getElementById("clave2").classList.remove("noCoinciden");
            
                    let url = "./actualizar_datos_usuario_clave.php";
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
                        .then (function (datos) {
                            if (datos == "TRUE") {
                                document.getElementById("div_bloqueo").remove();
                                cargarDatosUsuario();
                            } else {
                                let mensaje = "Ha ocurrido un error al modificar los datos";
                                alertaErrores(mensaje);
                            }
                        })
                } else {
                    let mensaje = "Las contraseñas no coinciden";
                    alertaErrores(mensaje);

                    document.getElementById("clave1").classList.add("noCoinciden");
                    document.getElementById("clave2").classList.add("noCoinciden");
                }
            } else {
                let mensaje = "Las contraseñas no son válidas";
                alertaErrores(mensaje);
            }
        } else {
            let mensaje = "El correo no es válido";
            alertaErrores(mensaje);
        }
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cargarDatosUsuario() {
    let nombre = document.getElementById("nombre");
    let correo = document.getElementById("correo");
    let direccion = document.getElementById("direccion");

    let url = "./cargar_datos_usuarios.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            for (let dato of datos) {
                nombre.innerHTML = dato[0] + " " + dato[1];
                correo.innerHTML = dato[2];
                direccion.innerHTML = dato[3];
            }
        })
}

function cargarReservasUsuario() {
    let caja_reservas = document.getElementById("caja_reservas");

    let url = "./cargar_reservas.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            for (let dato of datos) {
                let reservas = document.createElement("div");
                reservas.setAttribute("class", "reservas");

                let servicio = document.createElement("div");
                servicio.setAttribute("class", "producto");

                let nombre_servicio = document.createElement("h4");
                nombre_servicio.innerHTML = dato[0];

                let precio = document.createElement("div");
                precio.setAttribute("class", "precio");

                let precio_servicio = document.createElement("h4");
                precio_servicio.innerHTML = dato[1] + "€";

                let fecha = document.createElement("div");
                fecha.setAttribute("class", "fecha");

                let fecha_servicio = document.createElement("h4");
                fecha_servicio.innerHTML = dato[3];

                let hora = document.createElement("div");
                
                let hora_servicio = document.createElement("h4");
                hora_servicio.innerHTML = dato[2];

                let hr = document.createElement("hr");

                servicio.appendChild(nombre_servicio);
                reservas.appendChild(servicio);

                precio.appendChild(precio_servicio);
                reservas.appendChild(precio);

                fecha.appendChild(fecha_servicio);
                reservas.appendChild(fecha);

                hora.appendChild(hora_servicio);
                reservas.appendChild(hora);

                let diaHoy = new Date();
                let fecha_actual = diaHoy.toISOString().split('T')[0];

                if (fecha_actual < fecha_servicio.innerHTML) {
                    let cancelar = document.createElement("h4");
                    cancelar.setAttribute("id", dato[4]);
                    cancelar.setAttribute("class", "cancelar");
                    cancelar.setAttribute("title", "Cancelar");
                    cancelar.innerHTML = "❌";
                    cancelar.addEventListener("click", alertaCancelar);

                    reservas.appendChild(cancelar);
                }

                caja_reservas.appendChild(reservas);
                caja_reservas.appendChild(hr);
            }
        })
}

function alertaCancelar() {
    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    div_bloqueo.setAttribute("onKeyDown", "return false");

    let caja_alerta = document.createElement("div");
    caja_alerta.setAttribute("class", "caja_alerta");
    caja_alerta.setAttribute("id", this.id)
    
    let h2 = document.createElement("h2");
    h2.innerHTML = "¿Estás seguro de que quieres cancelar la cita?";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_eliminar = document.createElement("button");
    boton_eliminar.setAttribute("type", "submit");
    boton_eliminar.setAttribute("id", "boton_eliminar");
    boton_eliminar.innerHTML = "ELIMINAR";
    boton_eliminar.addEventListener("click", cancelarCita);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_atras");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaCancelar);

    caja_alerta.appendChild(h2);

    caja_botones.appendChild(boton_eliminar);
    caja_botones.appendChild(boton_cancelar);
    caja_alerta.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_alerta);
    document.body.appendChild(div_bloqueo);
}

function cancelarCita(e) {
    e.preventDefault();

    let id_cita = this.parentNode.parentNode.getAttribute("id");

    let url = "./cancelar_cita.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id_cita=" + id_cita
    };

    fetch(url, param)
        .then (function (respuesa) {
            return respuesa.text();
        })
        .then (function (datos) {
            if (datos == "TRUE") {
                window.location.reload();
            } else {
                let mensaje = "Ha ocurrido un error al cancelar la cita";
                alertaErrores(mensaje);
            }
        })
}

function cerrarCajaCancelar() {
    this.parentNode.parentNode.parentNode.remove();
}

function cargarPedidosUsuario() {
    let caja_compras = document.getElementById("caja_compras");

    let url = "./cargar_pedidos.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            for (let dato of datos) {
                let compras = document.createElement("div");
                compras.setAttribute("class", "compras");

                let producto = document.createElement("div");
                producto.setAttribute("class", "producto");

                let nombre_producto = document.createElement("h4");
                nombre_producto.innerHTML = dato[0];

                let cantidad = document.createElement("div");
                cantidad.setAttribute("class", "cantidad");
                
                let cantidad_producto = document.createElement("h4");
                cantidad_producto.innerHTML = dato[1];

                let precio = document.createElement("div");
                precio.setAttribute("class", "precio");

                let precio_producto = document.createElement("h4");
                precio_producto.innerHTML = dato[2] + "€";

                let fecha = document.createElement("div");
                fecha.setAttribute("class", "fecha");

                let fecha_producto = document.createElement("h4");
                fecha_producto.innerHTML = dato[3];

                let hr = document.createElement("hr");

                producto.appendChild(nombre_producto);
                compras.appendChild(producto);

                
                cantidad.appendChild(cantidad_producto);
                compras.appendChild(cantidad);

                precio.appendChild(precio_producto);
                compras.appendChild(precio);

                fecha.appendChild(fecha_producto);
                compras.appendChild(fecha);

                caja_compras.appendChild(compras);
                caja_compras.appendChild(hr);
            }
        })
}

function cerrarCajaModificar() {
    this.parentNode.parentNode.parentNode.remove();
}

function alertaErrores(mensaje) {  
    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo_error");
    div_bloqueo.setAttribute("onKeyDown", "return false");

    let caja_alerta = document.createElement("div");
    caja_alerta.setAttribute("class", "caja_alerta_error");
    
    let h2 = document.createElement("h2");
    h2.innerHTML = mensaje;

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