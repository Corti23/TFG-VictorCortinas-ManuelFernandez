var cerrar_sesion = document.getElementById("cerrar_sesion");

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

let reservas = document.getElementById("reservas");
reservas.addEventListener("click", cargarTitulosReservas);

function cargarTitulosReservas(e) {
    e.preventDefault();
    this.style.backgroundColor = "khaki";
    pedidos.style.backgroundColor = "darkkhaki";
    usuarios.style.backgroundColor = "darkkhaki";
    empleados.style.backgroundColor = "darkkhaki";
    productos.style.backgroundColor = "darkkhaki";
    servicios.style.backgroundColor = "darkkhaki";
    ingresos.style.backgroundColor = "darkkhaki";

    let caja_principal = document.getElementById("caja_principal");

    if (caja_principal.children[0] && caja_principal.children[1]) {
        caja_principal.children[0].remove();
        caja_principal.lastChild.remove();
    }

    let caja_titulos = document.createElement("div");
    caja_titulos.setAttribute("class", "caja_titulos");

    let titulos = document.createElement("div");
    titulos.setAttribute("class", "titulos");

    let usuario = document.createElement("h3");
    usuario.setAttribute("class", "usuario");
    usuario.innerHTML = "Usuario";

    let producto = document.createElement("h3");
    producto.setAttribute("class", "producto");
    producto.innerHTML = "Servicio";

    let empleado = document.createElement("h3");
    empleado.setAttribute("class", "empleado");
    empleado.innerHTML = "Empleado";

    let precio = document.createElement("h3");
    precio.innerHTML = "Precio";

    let fecha = document.createElement("h3");
    fecha.innerHTML = "Fecha";

    let hora = document.createElement("h3");
    hora.innerHTML = "Hora";

    let caja_reservas = document.createElement("div");
    caja_reservas.setAttribute("id", "caja_reservas");

    titulos.appendChild(usuario);
    titulos.appendChild(producto);
    titulos.appendChild(empleado);
    titulos.appendChild(precio);
    titulos.appendChild(fecha);
    titulos.appendChild(hora);
    caja_titulos.appendChild(titulos);

    caja_principal.appendChild(caja_titulos);
    caja_principal.appendChild(caja_reservas);

    cargarReservas();
}

function cargarReservas() {
    let caja_reservas = document.getElementById("caja_reservas");

    let url = "./cargar_reservas_admin.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            for (let dato of datos) {
                let reservas = document.createElement("div");
                reservas.setAttribute("class", "reservas");

                let usuario = document.createElement("div");
                usuario.setAttribute("class", "usuario");

                let correo_usuario = document.createElement("h4");
                correo_usuario.innerHTML = dato[0];

                let servicio = document.createElement("div");
                servicio.setAttribute("class", "producto");

                let nombre_servicio = document.createElement("h4");
                nombre_servicio.innerHTML = dato[1];

                let empleado = document.createElement("div");
                empleado.setAttribute("class", "empleado");

                let nombre_empleado = document.createElement("h4");
                nombre_empleado.innerHTML = dato[2] + " " + dato[3];

                let precio = document.createElement("div");
                precio.setAttribute("class", "precio");

                let precio_servicio = document.createElement("h4");
                precio_servicio.innerHTML = dato[4] + "???";

                let fecha = document.createElement("div");
                fecha.setAttribute("class", "fecha");

                let fecha_servicio = document.createElement("h4");
                fecha_servicio.innerHTML = dato[6];

                let hora = document.createElement("div");
                
                let hora_servicio = document.createElement("h4");
                hora_servicio.innerHTML = dato[5];

                let hr = document.createElement("hr");

                usuario.appendChild(correo_usuario);
                reservas.appendChild(usuario);

                servicio.appendChild(nombre_servicio);
                reservas.appendChild(servicio);

                empleado.appendChild(nombre_empleado);
                reservas.appendChild(empleado);

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
                    cancelar.setAttribute("id", dato[7]);
                    cancelar.setAttribute("class", "cancelar");
                    cancelar.setAttribute("title", "Cancelar");
                    cancelar.innerHTML = "???";
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
    div_bloqueo.setAttribute("id", "div_bloqueo_cancelar");
    div_bloqueo.setAttribute("onKeyDown", "return false");

    let caja_alerta = document.createElement("div");
    caja_alerta.setAttribute("class", "caja_alerta_cancelar");
    caja_alerta.setAttribute("id", this.id)
    
    let h2 = document.createElement("h2");
    h2.innerHTML = "??Est??s seguro de que quieres cancelar la cita?";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones_cancelar");

    let boton_eliminar = document.createElement("button");
    boton_eliminar.setAttribute("type", "submit");
    boton_eliminar.setAttribute("id", "boton_eliminar_cita");
    boton_eliminar.innerHTML = "ELIMINAR";
    boton_eliminar.addEventListener("click", cancelarCita);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar_cita");
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

    let url = "./cancelar_cita_admin.php";
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

let pedidos = document.getElementById("pedidos");
pedidos.addEventListener("click", cargarTitulosPedidos);

function cargarTitulosPedidos(e) {
    e.preventDefault();
    this.style.backgroundColor = "khaki";
    reservas.style.backgroundColor = "darkkhaki";
    usuarios.style.backgroundColor = "darkkhaki";
    empleados.style.backgroundColor = "darkkhaki";
    productos.style.backgroundColor = "darkkhaki";
    servicios.style.backgroundColor = "darkkhaki";
    ingresos.style.backgroundColor = "darkkhaki";

    let caja_principal = document.getElementById("caja_principal");

    if (caja_principal.children[0] && caja_principal.children[1]) {
        caja_principal.children[0].remove();
        caja_principal.lastChild.remove();
    }

    let caja_titulos = document.createElement("div");
    caja_titulos.setAttribute("class", "caja_titulos");

    let titulos = document.createElement("div");
    titulos.setAttribute("class", "titulos");

    let usuario = document.createElement("h3");
    usuario.setAttribute("class", "usuario");
    usuario.innerHTML = "Usuario";

    let producto = document.createElement("h3");
    producto.setAttribute("class", "producto");
    producto.innerHTML = "Producto";

    let cantidad = document.createElement("h3");
    cantidad.innerHTML = "Cantidad";

    let precio = document.createElement("h3");
    precio.innerHTML = "Precio";

    let fecha = document.createElement("h3");
    fecha.innerHTML = "Fecha";

    let caja_compras = document.createElement("div");
    caja_compras.setAttribute("id", "caja_compras");

    titulos.appendChild(usuario);
    titulos.appendChild(producto);
    titulos.appendChild(cantidad);
    titulos.appendChild(precio);
    titulos.appendChild(fecha);
    caja_titulos.appendChild(titulos);

    caja_principal.appendChild(caja_titulos);
    caja_principal.appendChild(caja_compras);

    cargarPedidos();
}

function cargarPedidos() {
    let caja_compras = document.getElementById("caja_compras");

    let url = "./cargar_pedidos_admin.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            for (let dato of datos) {
                let pedidos = document.createElement("div");
                pedidos.setAttribute("class", "pedidos");

                let usuario = document.createElement("div");
                usuario.setAttribute("class", "usuario");

                let correo_usuario = document.createElement("h4");
                correo_usuario.innerHTML = dato[0];

                let producto = document.createElement("div");
                producto.setAttribute("class", "producto");

                let nombre_producto = document.createElement("h4");
                nombre_producto.innerHTML = dato[1];

                let cantidad = document.createElement("div");
                cantidad.setAttribute("class", "cantidad");

                let cantidad_producto = document.createElement("h4");
                cantidad_producto.innerHTML = dato[2];

                let precio = document.createElement("div");
                precio.setAttribute("class", "precio");

                let precio_producto = document.createElement("h4");
                precio_producto.innerHTML = dato[3] + "???";

                let fecha = document.createElement("div");
                fecha.setAttribute("class", "fecha");

                let fecha_producto = document.createElement("h4");
                fecha_producto.innerHTML = dato[4];

                let hr = document.createElement("hr");

                usuario.appendChild(correo_usuario);
                pedidos.appendChild(usuario);

                producto.appendChild(nombre_producto);
                pedidos.appendChild(producto);

                cantidad.appendChild(cantidad_producto);
                pedidos.appendChild(cantidad);

                precio.appendChild(precio_producto);
                pedidos.appendChild(precio);

                fecha.appendChild(fecha_producto);
                pedidos.appendChild(fecha);

                caja_compras.appendChild(pedidos);
                caja_compras.appendChild(hr);
            }
        })
}

let usuarios = document.getElementById("usuarios");
usuarios.addEventListener("click", cargarTitulosUsuarios);

function cargarTitulosUsuarios(e) {
    e.preventDefault();
    this.style.backgroundColor = "khaki";
    reservas.style.backgroundColor = "darkkhaki";
    empleados.style.backgroundColor = "darkkhaki";
    pedidos.style.backgroundColor = "darkkhaki";
    productos.style.backgroundColor = "darkkhaki";
    servicios.style.backgroundColor = "darkkhaki";
    ingresos.style.backgroundColor = "darkkhaki";

    let caja_principal = document.getElementById("caja_principal");

    if (caja_principal.children[0] && caja_principal.children[1]) {
        caja_principal.children[0].remove();
        caja_principal.lastChild.remove();
    }

    let caja_titulos = document.createElement("div");
    caja_titulos.setAttribute("class", "caja_titulos");

    let titulos = document.createElement("div");
    titulos.setAttribute("class", "titulos");

    let nombre = document.createElement("h3");
    nombre.setAttribute("class", "nombre_usuario");
    nombre.innerHTML = "Nombre";

    let apellidos = document.createElement("h3");
    apellidos.setAttribute("class", "apellidos_usuario");
    apellidos.innerHTML = "Apellidos";

    let correo = document.createElement("h3");
    correo.setAttribute("class", "correo_usuario");
    correo.innerHTML = "Correo";

    let direccion = document.createElement("h3");
    direccion.setAttribute("class", "direccion");
    direccion.innerHTML = "Direcci??n";

    let admin = document.createElement("h3");
    admin.innerHTML = "Admin";

    let caja_usuarios = document.createElement("div");
    caja_usuarios.setAttribute("id", "caja_usuarios");

    titulos.appendChild(nombre);
    titulos.appendChild(apellidos);
    titulos.appendChild(correo);
    titulos.appendChild(direccion);
    titulos.appendChild(admin);
    caja_titulos.appendChild(titulos);    

    caja_principal.appendChild(caja_titulos);
    caja_principal.appendChild(caja_usuarios);

    cargarUsuarios();
}

function cargarUsuarios() {
    let caja_usuarios = document.getElementById("caja_usuarios");

    let url = "./cargar_usuarios.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            if (datos) {
                for (let dato of datos) {
                    let usuarios = document.createElement("div");
                    usuarios.setAttribute("class", "usuarios");
    
                    let nombre = document.createElement("div");
                    nombre.setAttribute("class", "nombre");
    
                    let nombre_usuario = document.createElement("h4");
                    nombre_usuario.innerHTML = dato[1];
    
                    let apellidos = document.createElement("div");
                    apellidos.setAttribute("class", "apellidos");
    
                    let apellidos_usuario = document.createElement("h4");
                    apellidos_usuario.innerHTML = dato[2];
    
                    let correo = document.createElement("div");
                    correo.setAttribute("class", "correo");
    
                    let correo_usuario = document.createElement("h4");
                    correo_usuario.innerHTML = dato[3];

                    let direccion = document.createElement("div");
                    direccion.setAttribute("class", "direccion");
    
                    let direccion_usuario = document.createElement("h4");
                    direccion_usuario.innerHTML = dato[4];

                    let admin = document.createElement("div");
                    admin.setAttribute("class", "admin");
    
                    let admin_usuario = document.createElement("h4");
                    if (dato[5] == 0) {
                        admin_usuario.innerHTML = "No";
                    } else {
                        admin_usuario.innerHTML = "Si";
                    }
    
                    let boton_cambiar_clave = document.createElement("button");
                    boton_cambiar_clave.setAttribute("type", "submit");
                    boton_cambiar_clave.setAttribute("id", dato[0]);
                    boton_cambiar_clave.setAttribute("class", "editar_usuario");
                    boton_cambiar_clave.innerHTML = "Cambiar contrase??a";
                    boton_cambiar_clave.onclick = cambiarClave;
    
                    let boton_eliminar_usuario = document.createElement("button");
                    boton_eliminar_usuario.setAttribute("type", "submit");
                    boton_eliminar_usuario.setAttribute("id", dato[0]);
                    boton_eliminar_usuario.setAttribute("class", "baja_empleado");
                    boton_eliminar_usuario.innerHTML = "Eliminar";
                    boton_eliminar_usuario.onclick = eliminarUsuario;
    
                    let hr = document.createElement("hr");
    
                    nombre.appendChild(nombre_usuario);
                    usuarios.appendChild(nombre);
    
                    apellidos.appendChild(apellidos_usuario);
                    usuarios.appendChild(apellidos);
    
                    correo.appendChild(correo_usuario);
                    usuarios.appendChild(correo);

                    direccion.appendChild(direccion_usuario);
                    usuarios.appendChild(direccion);

                    admin.appendChild(admin_usuario);
                    usuarios.appendChild(admin);
    
                    usuarios.appendChild(boton_cambiar_clave);
                    usuarios.appendChild(boton_eliminar_usuario);
    
                    caja_usuarios.appendChild(usuarios);
                    caja_usuarios.appendChild(hr);
                }
                let boton_crear_admin = document.createElement("button");
                boton_crear_admin.setAttribute("type", "submit");
                boton_crear_admin.setAttribute("id", "boton_alta");
                boton_crear_admin.setAttribute("class", "editar_empleado");
                boton_crear_admin.innerHTML = "Crear administrador";
                boton_crear_admin.onclick = crearAdmin;

                caja_usuarios.appendChild(boton_crear_admin);
            } else {
                let boton_crear_admin = document.createElement("button");
                boton_crear_admin.setAttribute("type", "submit");
                boton_crear_admin.setAttribute("id", "boton_alta");
                boton_crear_admin.setAttribute("class", "editar_empleado");
                boton_crear_admin.innerHTML = "Crear administrador";
                boton_crear_admin.onclick = crearAdmin;

                caja_usuarios.appendChild(boton_crear_admin);
            }
        })
}

function cambiarClave(e) {
    e.preventDefault();

    let id_usuario = this.getAttribute("id");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_editar = document.createElement("div");
    caja_editar.setAttribute("class", "caja_editar_usuario");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Cambiar contrase??a del usuario:";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario_usuario");

    let formulario_editar = document.createElement("form");
    formulario_editar.setAttribute("id", "formulario_editar");

    let borde_clave = document.createElement("fieldset");
    borde_clave.setAttribute("id", "borde_clave");

    let legend_clave = document.createElement("legend");
    legend_clave.setAttribute("class", "legend");
    legend_clave.innerHTML = "Introduzca la nueva contrase??a:";

    let input_clave = document.createElement("input");
    input_clave.setAttribute("id", "clave");
    input_clave.setAttribute("class", "input");
    input_clave.setAttribute("type", "password");
    input_clave.setAttribute("name", "clave");
    input_clave.setAttribute("minlength", "6");
    input_clave.setAttribute("maxlength", "8");
    input_clave.setAttribute("required", "");
    input_clave.addEventListener("input", verificarValoresContrase??aRegistro);

    let info_clave = document.createElement("div");
    info_clave.setAttribute("id", "info_clave");
    info_clave.innerHTML = "La contrase??a debe tener entre 6 y 8 caracteres, un d??gito, una min??scula, una may??scula y un caracter no alfanum??rico.";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_usuario);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "ACTUALIZAR";
    boton_confirmar.addEventListener("click", confirmarCambiarClave);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaCambiarClave);

    caja_editar.appendChild(titulo); 

    borde_clave.appendChild(input_clave);
    borde_clave.appendChild(info_clave);
    borde_clave.appendChild(legend_clave);
    caja_formulario.appendChild(borde_clave);

    caja_editar.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_editar.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_editar);
    document.body.appendChild(div_bloqueo);
}

function verificarValoresContrase??aRegistro() {
    let info_clave = document.getElementById("info_clave");
    
    let validacionContrase??a = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,8}$/;
    let valorContrase??a = this.value;

    if (valorContrase??a.length == 0) {
        info_clave.innerHTML = "La contrase??a debe tener entre 6 y 8 caracteres, un d??gito, una min??scula, una may??scula y un caracter no alfanum??rico.";
        info_clave.style.color = "darkkhaki";
    } else {
        if (validacionContrase??a.test(valorContrase??a)) {
            info_clave.innerHTML = "Contrase??a v??lida";
            info_clave.style.color = "#23FF00";
            info_clave.style.fontSize = "12.5px";
        } else {
            info_clave.innerHTML = "Contrase??a inv??lida";
            info_clave.style.color = "#FE2E2E";
            info_clave.style.fontSize = "12.5px";
        }
    }
}

function confirmarCambiarClave(e) {
    e.preventDefault();

    let id_usuario = this.getAttribute("id");

    let clave = document.getElementById("clave").value;
    let info_clave = document.getElementById("info_clave").innerHTML;

    if (clave.length > 0) {
        if (info_clave == "Contrase??a v??lida") {
            let url = "./actualizar_clave_usuario.php";
            let param = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body : "id=" + id_usuario + "&clave_registro=" + clave
            };

            fetch (url, param)
                .then (function (respuesta) {
                    return respuesta.text();
                })
                .then (function (datos) {
                    if (datos == "TRUE") {
                        window.location.reload();
                    } else {
                        let mensaje = "Ha ocurrido un error al cambiar la contrase??a";
                        alertaErrores(mensaje);
                    }
                })
        } else {
            let mensaje = "La contrase??a no es v??lida";
                alertaErrores(mensaje);
        }
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cerrarCajaCambiarClave() {
    document.getElementById("div_bloqueo").remove();
    this.parentNode.parentNode.remove();
}

function eliminarUsuario(e) {
    e.preventDefault();

    let id_usuario = this.getAttribute("id");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_baja = document.createElement("div");
    caja_baja.setAttribute("class", "caja_baja");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Eliminar usuario";

    let h2 = document.createElement("h2");
    h2.innerHTML = "??Est??s seguro de que quieres eliminar a este usuario?";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_usuario);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "ELIMINAR";
    boton_confirmar.addEventListener("click", confirmarEliminar);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaEliminar);

    caja_baja.appendChild(titulo); 
    caja_baja.appendChild(h2);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_baja.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_baja);
    document.body.appendChild(div_bloqueo);
}

function confirmarEliminar(e) {
    e.preventDefault();

    let id_usuario = this.getAttribute("id");

    let url = "./eliminar_usuario.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id=" + id_usuario
    };

    fetch (url, param)
        .then (function (respuesta) {
            return respuesta.text();
        })
        .then (function (datos) {
            if (datos == "TRUE") {
                window.location.reload();
            } else {
                let mensaje = "Ha ocurrido un error al eliminar al usuario";
                alertaErrores(mensaje);
            }
        })
}

function cerrarCajaEliminar() {
    this.parentNode.parentNode.parentNode.remove();
}

function crearAdmin(e) {
    e.preventDefault();

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_alta = document.createElement("div");
    caja_alta.setAttribute("class", "caja_crear_usuario");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Crear un nuevo administrador";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario_crear_usuario");

    let formulario_crear_usuario = document.createElement("form");
    formulario_crear_usuario.setAttribute("id", "formulario_crear_usuario");

    let div1 = document.createElement("div");
    let div2 = document.createElement("div");

    let borde_nombre = document.createElement("fieldset");

    let legend_nombre = document.createElement("legend");
    legend_nombre.setAttribute("class", "legend");
    legend_nombre.innerHTML = "Nombre:";

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
    legend_apellidos.innerHTML = "Apellidos:";

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
    legend_correo.innerHTML = "Correo:";

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
    legend_direccion.innerHTML = "Direcci??n:";

    let input_direccion = document.createElement("input");
    input_direccion.setAttribute("id", "input_direccion");
    input_direccion.setAttribute("class", "input");
    input_direccion.setAttribute("type", "text");
    input_direccion.setAttribute("name", "direccion");
    input_direccion.setAttribute("required", "");

    let borde_clave1 = document.createElement("fieldset");
    borde_clave1.setAttribute("id", "borde_clave1");

    let legend_clave1 = document.createElement("legend");
    legend_clave1.setAttribute("class", "legend");
    legend_clave1.innerHTML = "Introduzca una contrase??a:";

    let input_clave1 = document.createElement("input");
    input_clave1.setAttribute("id", "clave1");
    input_clave1.setAttribute("class", "input");
    input_clave1.setAttribute("type", "password");
    input_clave1.setAttribute("name", "clave1");
    input_clave1.setAttribute("minlength", "6");
    input_clave1.setAttribute("maxlength", "8");
    input_clave1.setAttribute("required", "");
    input_clave1.addEventListener("input", verificarValoresContrase??a);

    let info_clave1 = document.createElement("div");
    info_clave1.setAttribute("id", "info_clave1");
    info_clave1.innerHTML = "La contrase??a debe tener entre 6 y 8 caracteres, un d??gito, una min??scula, una may??scula y un caracter no alfanum??rico.";

    let borde_clave2= document.createElement("fieldset");
    borde_clave2.setAttribute("id", "borde_clave2");

    let legend_clave2 = document.createElement("legend");
    legend_clave2.setAttribute("class", "legend");
    legend_clave2.innerHTML = "Repite la contrase??a:";

    let input_clave2 = document.createElement("input");
    input_clave2.setAttribute("id", "clave2");
    input_clave2.setAttribute("class", "input");
    input_clave2.setAttribute("type", "password");
    input_clave2.setAttribute("name", "clave2");
    input_clave2.setAttribute("minlength", "6");
    input_clave2.setAttribute("maxlength", "8");
    input_clave2.setAttribute("required", "");
    input_clave2.addEventListener("input", verificarValoresContrase??aConfirma);

    let info_clave2 = document.createElement("div");
    info_clave2.setAttribute("id", "info_clave2");
    info_clave2.innerHTML = "La contrase??a debe tener entre 6 y 8 caracteres, un d??gito, una min??scula, una may??scula y un caracter no alfanum??rico.";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_insertar");
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "CREAR";
    boton_confirmar.addEventListener("click", confirmarCrear);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaCrear);

    caja_alta.appendChild(titulo); 

    borde_nombre.appendChild(input_nombre);
    borde_nombre.appendChild(legend_nombre);
    div1.appendChild(borde_nombre);

    input_correo.appendChild(span);
    borde_correo.appendChild(input_correo);
    borde_correo.appendChild(legend_correo);
    div1.appendChild(borde_correo);

    borde_clave1.appendChild(input_clave1);
    borde_clave1.appendChild(info_clave1);
    borde_clave1.appendChild(legend_clave1);
    div1.appendChild(borde_clave1);

    borde_apellidos.appendChild(input_apellidos);
    borde_apellidos.appendChild(legend_apellidos);
    div2.appendChild(borde_apellidos);

    borde_direccion.appendChild(input_direccion);
    borde_direccion.appendChild(legend_direccion);
    div2.appendChild(borde_direccion);

    borde_clave2.appendChild(input_clave2);
    borde_clave2.appendChild(info_clave2);
    borde_clave2.appendChild(legend_clave2);
    div2.appendChild(borde_clave2);

    formulario_crear_usuario.appendChild(div1);
    formulario_crear_usuario.appendChild(div2);
    caja_formulario.appendChild(formulario_crear_usuario);
    caja_alta.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_alta.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_alta);
    document.body.appendChild(div_bloqueo);
}

function confirmarCrear(e) {
    e.preventDefault();
    
    let nombre = document.getElementById("input_nombre").value;
    let nombre_sin_numeros = nombre.replace(/\d/g,"");
    let quitar_espacios = nombre_sin_numeros.replace(/^\s*|\s*$/g, '');
    
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
        if (info_correo == "??????") {
            if (info_clave1 == "Contrase??a v??lida" && info_clave2 == "Contrase??a v??lida") {
                if (clave1 === clave2) {            
                    let url = "./crear_admin.php";
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
                                window.location.reload();
                            } else {
                                let mensaje = "Ha ocurrido un error al crear al administrador";
                                alertaErrores(mensaje);
                            }
                        })
                } else {
                    let mensaje = "Las contrase??as no coinciden";
                    alertaErrores(mensaje);
                }
            } else {
                let mensaje = "Las contrase??as no son v??lidas";
                alertaErrores(mensaje);
            }
        } else {
            let mensaje = "El correo no es v??lido";
            alertaErrores(mensaje);
        }
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function verificarCorreo() {
    let info_correo = document.getElementById("info_correo");

    let validacionCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let valorCorreo = this.value;

    if (valorCorreo.length == 0) {
        info_correo.innerHTML = "???";
    } else {
        if (validacionCorreo.test(valorCorreo)) {
            info_correo.innerHTML = "??????";
            info_correo.style.fontSize = "12.5px";
        } else {
            info_correo.innerHTML = "???";
            info_correo.style.fontSize = "12.5px";
        }
    }
}

function verificarValoresContrase??a() {
    let info_clave = document.getElementById("info_clave1");
    
    let validacionContrase??a = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,8}$/;
    let valorContrase??a = this.value;

    if (valorContrase??a.length == 0) {
        info_clave.innerHTML = "La contrase??a debe tener entre 6 y 8 caracteres, un d??gito, una min??scula, una may??scula y un caracter no alfanum??rico.";
        info_clave.style.color = "darkkhaki";
    } else {
        if (validacionContrase??a.test(valorContrase??a)) {
            info_clave.innerHTML = "Contrase??a v??lida";
            info_clave.style.color = "#23FF00";
            info_clave.style.fontSize = "12.5px";
        } else {
            info_clave.innerHTML = "Contrase??a inv??lida";
            info_clave.style.color = "#FE2E2E";
            info_clave.style.fontSize = "12.5px";
        }
    }
}

function verificarValoresContrase??aConfirma() {
    let info_clave = document.getElementById("info_clave2");

    let validacionContrase??a = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,8}$/;
    let valorContrase??a = this.value;

    if (valorContrase??a.length == 0) {
        info_clave.innerHTML = "La contrase??a debe tener entre 6 y 8 caracteres, un d??gito, una min??scula, una may??scula y un caracter no alfanum??rico.";
        info_clave.style.color = "darkkhaki";
    } else {
        if (validacionContrase??a.test(valorContrase??a)) {
            info_clave.innerHTML = "Contrase??a v??lida";
            info_clave.style.color = "#23FF00";
            info_clave.style.fontSize = "12.5px";
        } else {
            info_clave.innerHTML = "Contrase??a inv??lida";
            info_clave.style.color = "#FE2E2E";
            info_clave.style.fontSize = "12.5px";
        }
    }
}

function cerrarCajaCrear() {
    this.parentNode.parentNode.parentNode.remove();
}

let empleados = document.getElementById("empleados");
empleados.addEventListener("click", cargarTitulosEmpleados);

function cargarTitulosEmpleados(e) {
    e.preventDefault();
    this.style.backgroundColor = "khaki";
    reservas.style.backgroundColor = "darkkhaki";
    pedidos.style.backgroundColor = "darkkhaki";
    usuarios.style.backgroundColor = "darkkhaki";
    productos.style.backgroundColor = "darkkhaki";
    servicios.style.backgroundColor = "darkkhaki";
    ingresos.style.backgroundColor = "darkkhaki";

    let caja_principal = document.getElementById("caja_principal");

    if (caja_principal.children[0] && caja_principal.children[1]) {
        caja_principal.children[0].remove();
        caja_principal.lastChild.remove();
    }

    let caja_titulos = document.createElement("div");
    caja_titulos.setAttribute("class", "caja_titulos");

    let titulos = document.createElement("div");
    titulos.setAttribute("class", "titulos");

    let nombre = document.createElement("h3");
    nombre.setAttribute("class", "nombre");
    nombre.innerHTML = "Nombre";

    let apellidos = document.createElement("h3");
    apellidos.setAttribute("class", "apellidos");
    apellidos.innerHTML = "Apellidos";

    let img = document.createElement("h3");
    img.innerHTML = "Imagen";

    let caja_empleados = document.createElement("div");
    caja_empleados.setAttribute("id", "caja_empleados");

    titulos.appendChild(nombre);
    titulos.appendChild(apellidos);
    titulos.appendChild(img);
    caja_titulos.appendChild(titulos);    

    caja_principal.appendChild(caja_titulos);
    caja_principal.appendChild(caja_empleados);

    cargarEmpleados();
}

function cargarEmpleados() {
    let caja_empleados = document.getElementById("caja_empleados");

    let url = "./cargar_empleados.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            if (datos) {
                for (let dato of datos) {
                    let empleados = document.createElement("div");
                    empleados.setAttribute("class", "empleados");
    
                    let nombre = document.createElement("div");
                    nombre.setAttribute("class", "nombre");
    
                    let nombre_empleado = document.createElement("h4");
                    nombre_empleado.innerHTML = dato[1];
    
                    let apellidos = document.createElement("div");
                    apellidos.setAttribute("class", "apellidos");
    
                    let apellidos_empleado = document.createElement("h4");
                    apellidos_empleado.innerHTML = dato[2];
    
                    let img = document.createElement("div");
                    img.setAttribute("class", "img");
    
                    let img_empleado = document.createElement("h4");
                    img_empleado.innerHTML = dato[3];
    
                    let boton_editar_empleado = document.createElement("button");
                    boton_editar_empleado.setAttribute("type", "submit");
                    boton_editar_empleado.setAttribute("id", dato[0]);
                    boton_editar_empleado.setAttribute("class", "editar_empleado");
                    boton_editar_empleado.innerHTML = "Cambiar foto";
                    boton_editar_empleado.onclick = editarEmpleado;
    
                    let boton_baja = document.createElement("button");
                    boton_baja.setAttribute("type", "submit");
                    boton_baja.setAttribute("id", dato[0]);
                    boton_baja.setAttribute("class", "baja_empleado");
                    boton_baja.innerHTML = "Dar de baja";
                    boton_baja.onclick = bajaEmpleado;
    
                    let hr = document.createElement("hr");
    
                    nombre.appendChild(nombre_empleado);
                    empleados.appendChild(nombre);
    
                    apellidos.appendChild(apellidos_empleado);
                    empleados.appendChild(apellidos);
    
                    img.appendChild(img_empleado);
                    empleados.appendChild(img);
    
                    empleados.appendChild(boton_editar_empleado);
                    empleados.appendChild(boton_baja);
    
                    caja_empleados.appendChild(empleados);
                    caja_empleados.appendChild(hr);
                }
                let boton_alta = document.createElement("button");
                boton_alta.setAttribute("type", "submit");
                boton_alta.setAttribute("id", "boton_alta");
                boton_alta.setAttribute("class", "editar_empleado");
                boton_alta.innerHTML = "Dar de alta empleado";
                boton_alta.onclick = altaEmpleado;

                caja_empleados.appendChild(boton_alta);
            } else {
                let boton_alta = document.createElement("button");
                boton_alta.setAttribute("type", "submit");
                boton_alta.setAttribute("id", "boton_alta");
                boton_alta.setAttribute("class", "editar_empleado");
                boton_alta.innerHTML = "Dar de alta empleado";
                boton_alta.onclick = altaEmpleado;

                caja_empleados.appendChild(boton_alta);
            }
        })
}

function editarEmpleado(e) {
    e.preventDefault();

    let id_empleado = this.getAttribute("id");
    let valor_img = this.parentNode.children[2].innerText;

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_editar = document.createElement("div");
    caja_editar.setAttribute("class", "caja_editar");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Cambiar imagen del empleado:";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario");

    let formulario_editar = document.createElement("form");
    formulario_editar.setAttribute("id", "formulario_editar");

    let borde_img = document.createElement("fieldset");

    let legend_img = document.createElement("legend");
    legend_img.setAttribute("class", "legend");
    legend_img.innerHTML = "Cambiar imagen:";

    let input_img = document.createElement("input");
    input_img.setAttribute("id", "input_img");
    input_img.setAttribute("class", "input");
    input_img.setAttribute("type", "file");
    input_img.setAttribute("accept", ".jpg,.png");
    input_img.setAttribute("name", "img");
    input_img.setAttribute("required", "");
    input_img.setAttribute("value", valor_img);

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_empleado);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "ACTUALIZAR";
    boton_confirmar.addEventListener("click", confirmarCambios);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaEditar);

    caja_editar.appendChild(titulo); 

    borde_img.appendChild(input_img);
    borde_img.appendChild(legend_img);
    caja_formulario.appendChild(borde_img);

    caja_editar.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_editar.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_editar);
    document.body.appendChild(div_bloqueo);
}

function confirmarCambios(e) {
    e.preventDefault();

    let id_empleado = this.getAttribute("id");

    let img = document.getElementById("input_img").value;
    let valor_img = img.substring(12, img.length);
    let ruta_completa_img = "./img/" + valor_img;

    if (img.length > 0) {
        let url = "./actualizar_empleado.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "id=" + id_empleado + "&url_img=" + ruta_completa_img
        };

        fetch (url, param)
            .then (function (respuesta) {
                return respuesta.text();
            })
            .then (function (datos) {
                if (datos == "TRUE") {
                    document.getElementById("div_bloqueo").remove();
                    window.location.reload();
                } else {
                    let mensaje = "Ha ocurrido un error al editar la foto";
                    alertaErrores(mensaje);
                }
            })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cerrarCajaEditar() {
    this.parentNode.parentNode.parentNode.remove();
}

function bajaEmpleado(e) {
    e.preventDefault();

    let id_empleado = this.getAttribute("id");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_baja = document.createElement("div");
    caja_baja.setAttribute("class", "caja_baja");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Dar de baja al empleado";

    let h2 = document.createElement("h2");
    h2.innerHTML = "??Est??s seguro de que quieres dar de baja a este empleado?";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_empleado);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "DAR DE BAJA";
    boton_confirmar.addEventListener("click", confirmarBaja);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaBaja);

    caja_baja.appendChild(titulo); 
    caja_baja.appendChild(h2);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_baja.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_baja);
    document.body.appendChild(div_bloqueo);
}

function confirmarBaja(e) {
    e.preventDefault();

    let id_empleado = this.getAttribute("id");

    let url = "./baja_empleado.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id=" + id_empleado
    };

    fetch (url, param)
        .then (function (respuesta) {
            return respuesta.text();
        })
        .then (function (datos) {
            if (datos == "TRUE") {
                document.getElementById("div_bloqueo").remove();
                window.location.reload();
            } else {
                let mensaje = "Ha ocurrido un error al dar de baja al empleado";
                alertaErrores(mensaje);
            }
        })
}

function cerrarCajaBaja() {
    this.parentNode.parentNode.parentNode.remove();
}

function altaEmpleado(e) {
    e.preventDefault();

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_alta = document.createElement("div");
    caja_alta.setAttribute("class", "caja_alta");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Dar de alta a un empleado";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario_alta");

    let formulario_alta = document.createElement("form");
    formulario_alta.setAttribute("id", "formulario_alta");

    let borde_nombre = document.createElement("fieldset");
    borde_nombre.setAttribute("class", "borde_nombre");

    let legend_nombre = document.createElement("legend");
    legend_nombre.setAttribute("class", "legend");
    legend_nombre.innerHTML = "Nombre:";

    let input_nombre = document.createElement("input");
    input_nombre.setAttribute("id", "input_nombre");
    input_nombre.setAttribute("class", "input");
    input_nombre.setAttribute("type", "text");
    input_nombre.setAttribute("name", "nombre");
    input_nombre.setAttribute("pattern", "^[A-Za-z]+$");
    input_nombre.setAttribute("required", "");

    let borde_apellidos = document.createElement("fieldset");
    borde_apellidos.setAttribute("class", "borde_apellidos");
    
    let legend_apellidos = document.createElement("legend");
    legend_apellidos.setAttribute("class", "legend");
    legend_apellidos.innerHTML = "Apellidos:";

    let input_apellidos = document.createElement("input");
    input_apellidos.setAttribute("id", "input_apellidos");
    input_apellidos.setAttribute("class", "input");
    input_apellidos.setAttribute("type", "text");
    input_apellidos.setAttribute("name", "apellidos");
    input_apellidos.setAttribute("pattern", "^[A-Za-z]+$");
    input_apellidos.setAttribute("required", "");

    let borde_img = document.createElement("fieldset");

    let legend_img = document.createElement("legend");
    legend_img.setAttribute("class", "legend");
    legend_img.innerHTML = "Imagen:";

    let input_img = document.createElement("input");
    input_img.setAttribute("id", "input_img");
    input_img.setAttribute("class", "input");
    input_img.setAttribute("type", "file");
    input_img.setAttribute("accept", ".jpg,.png");
    input_img.setAttribute("name", "img");
    input_img.setAttribute("required", "");

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_insertar");
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "DAR DE ALTA";
    boton_confirmar.addEventListener("click", confirmarAlta);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaAlta);

    caja_alta.appendChild(titulo); 

    borde_nombre.appendChild(input_nombre);
    borde_nombre.appendChild(legend_nombre);
    caja_formulario.appendChild(borde_nombre);

    borde_apellidos.appendChild(input_apellidos);
    borde_apellidos.appendChild(legend_apellidos);
    caja_formulario.appendChild(borde_apellidos);

    borde_img.appendChild(input_img);
    borde_img.appendChild(legend_img);
    caja_formulario.appendChild(borde_img);

    caja_alta.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_alta.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_alta);
    document.body.appendChild(div_bloqueo);
}

function confirmarAlta(e) {
    e.preventDefault();
    
    let nombre = document.getElementById("input_nombre").value;
    let nombre_sin_numeros = nombre.replace(/\d/g,"");
    let quitar_espacios = nombre_sin_numeros.replace(/\s/g, '');
    
    let apellidos = document.getElementById("input_apellidos").value;
    let apellidos_sin_numeros = apellidos.replace(/\d/g,"");
    let quitar_espacios_iniciales = apellidos_sin_numeros.replace(/^\s*|\s*$/g, '');

    let img = document.getElementById("input_img").value;
    let valor_img = img.substring(12, img.length);
    let ruta_completa_img = "./img/" + valor_img;

    if (quitar_espacios.length > 0 && quitar_espacios_iniciales.length > 0 && img.length > 0) {
        let url = "./insertar_empleado.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "nombre=" + nombre_sin_numeros + "&apellidos=" + apellidos_sin_numeros + "&url_img=" + ruta_completa_img
        };

        fetch (url, param)
            .then (function (respuesta) {
                return respuesta.text();
            })
            .then (function (datos) {
                if (datos == "TRUE") {
                    document.getElementById("div_bloqueo").remove();
                    window.location.reload();
                } else {
                    let mensaje = "Ha ocurrido un error al dar de alta al empleado";
                    alertaErrores(mensaje);
                }
            })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cerrarCajaAlta() {
    this.parentNode.parentNode.parentNode.remove();
}

let productos = document.getElementById("productos");
productos.addEventListener("click", cargarTitulosProductos);

function cargarTitulosProductos(e) {
    e.preventDefault();
    this.style.backgroundColor = "khaki";
    reservas.style.backgroundColor = "darkkhaki";
    pedidos.style.backgroundColor = "darkkhaki";
    usuarios.style.backgroundColor = "darkkhaki";
    empleados.style.backgroundColor = "darkkhaki";
    servicios.style.backgroundColor = "darkkhaki";
    ingresos.style.backgroundColor = "darkkhaki";

    let caja_principal = document.getElementById("caja_principal");

    if (caja_principal.children[0] && caja_principal.children[1]) {
        caja_principal.children[0].remove();
        caja_principal.lastChild.remove();
    }

    let caja_titulos = document.createElement("div");
    caja_titulos.setAttribute("class", "caja_titulos");

    let titulos = document.createElement("div");
    titulos.setAttribute("class", "titulos");

    let nombre = document.createElement("h3");
    nombre.setAttribute("class", "nombre_titulos");
    nombre.innerHTML = "Nombre";

    let descripcion = document.createElement("h3");
    descripcion.setAttribute("class", "descripcion");
    descripcion.innerHTML = "Descripcion";

    let precio = document.createElement("h3");
    precio.setAttribute("class", "precio");
    precio.innerHTML = "Precio";

    let stock = document.createElement("h3");
    stock.setAttribute("class", "stock");
    stock.innerHTML = "Stock";

    let veces_comprado = document.createElement("h3");
    veces_comprado.setAttribute("class", "veces_comprado");
    veces_comprado.innerHTML = "Veces comprado";

    let img = document.createElement("h3");
    img.setAttribute("class", "img")
    img.innerHTML = "Imagen";

    let caja_productos = document.createElement("div");
    caja_productos.setAttribute("id", "caja_productos");

    titulos.appendChild(nombre);
    titulos.appendChild(descripcion);
    titulos.appendChild(precio);
    titulos.appendChild(stock);
    titulos.appendChild(veces_comprado);
    titulos.appendChild(img);
    caja_titulos.appendChild(titulos);    

    caja_principal.appendChild(caja_titulos);
    caja_principal.appendChild(caja_productos);

    cargarProductos();
}

function cargarProductos() {
    let caja_productos = document.getElementById("caja_productos");

    let url = "./cargar_productos_admin.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            if (datos) {
                for (let dato of datos) {
                    let productos = document.createElement("div");
                    productos.setAttribute("class", "productos");
    
                    let nombre = document.createElement("div");
                    nombre.setAttribute("class", "nombre");
    
                    let nombre_producto = document.createElement("h4");
                    nombre_producto.innerHTML = dato[1];
    
                    let descripcion = document.createElement("div");
                    descripcion.setAttribute("class", "descripcion");
    
                    let descripcion_producto = document.createElement("h4");
                    descripcion_producto.innerHTML = dato[2];

                    let precio = document.createElement("div");
                    precio.setAttribute("class", "precio");
    
                    let precio_producto = document.createElement("h4");
                    precio_producto.innerHTML = dato[3] + "???";

                    let stock = document.createElement("div");
                    stock.setAttribute("class", "stock");
    
                    let stock_producto = document.createElement("h4");
                    stock_producto.innerHTML = dato[4];

                    let veces_comprado = document.createElement("div");
                    veces_comprado.setAttribute("class", "veces_comprado");
    
                    let veces_comprado_producto = document.createElement("h4");
                    veces_comprado_producto.innerHTML = dato[5];
    
                    let img = document.createElement("div");
                    img.setAttribute("class", "img");
    
                    let img_producto = document.createElement("h4");
                    img_producto.innerHTML = dato[6];
    
                    let boton_editar_producto = document.createElement("button");
                    boton_editar_producto.setAttribute("type", "submit");
                    boton_editar_producto.setAttribute("id", dato[0]);
                    boton_editar_producto.setAttribute("class", "editar_producto");
                    boton_editar_producto.innerHTML = "Editar";
                    boton_editar_producto.onclick = editarProducto;
    
                    let boton_retirar = document.createElement("button");
                    boton_retirar.setAttribute("type", "submit");
                    boton_retirar.setAttribute("id", dato[0]);
                    boton_retirar.setAttribute("class", "retirar_producto");
                    boton_retirar.innerHTML = "Retirar";
                    boton_retirar.onclick = retirarProducto;
    
                    let hr = document.createElement("hr");
    
                    nombre.appendChild(nombre_producto);
                    productos.appendChild(nombre);
    
                    descripcion.appendChild(descripcion_producto);
                    productos.appendChild(descripcion);

                    precio.appendChild(precio_producto);
                    productos.appendChild(precio);

                    stock.appendChild(stock_producto);
                    productos.appendChild(stock);

                    veces_comprado.appendChild(veces_comprado_producto);
                    productos.appendChild(veces_comprado);
    
                    img.appendChild(img_producto);
                    productos.appendChild(img);
    
                    productos.appendChild(boton_editar_producto);
                    productos.appendChild(boton_retirar);
    
                    caja_productos.appendChild(productos);
                    caja_productos.appendChild(hr);
                }
                let boton_a??adir = document.createElement("button");
                boton_a??adir.setAttribute("type", "submit");
                boton_a??adir.setAttribute("id", "boton_a??adir");
                boton_a??adir.setAttribute("class", "insertar_empleado");
                boton_a??adir.innerHTML = "A??adir producto";
                boton_a??adir.onclick = insertarProducto;

                caja_productos.appendChild(boton_a??adir);
            } else {
                let boton_a??adir = document.createElement("button");
                boton_a??adir.setAttribute("type", "submit");
                boton_a??adir.setAttribute("id", "boton_a??adir");
                boton_a??adir.setAttribute("class", "insertar_empleado");
                boton_a??adir.innerHTML = "A??adir producto";
                boton_a??adir.onclick = insertarProducto;

                caja_productos.appendChild(boton_a??adir);
            }
        })
}

function editarProducto(e) {
    e.preventDefault();

    let id_producto = this.getAttribute("id");
    let valor_descripcion = this.parentNode.children[1].innerText;
    let precio = this.parentNode.children[2].innerText;
    let valor_precio = precio.substring(0, precio.length - 1);
    let valor_stock = this.parentNode.children[3].innerText;

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_editar = document.createElement("div");
    caja_editar.setAttribute("class", "caja_editar_producto");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Editar producto:";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario_producto");

    let formulario_editar = document.createElement("form");
    formulario_editar.setAttribute("id", "formulario_editar");

    let borde_descripcion = document.createElement("fieldset");
    borde_descripcion.setAttribute("class", "borde_descripcion");

    let legend_descripcion = document.createElement("legend");
    legend_descripcion.setAttribute("class", "legend");
    legend_descripcion.innerHTML = "Cambiar descripcion:";

    let input_descripcion = document.createElement("textarea");
    input_descripcion.setAttribute("id", "input_descripcion");
    input_descripcion.setAttribute("class", "input");
    input_descripcion.setAttribute("name", "descripcion");
    input_descripcion.setAttribute("required", "");
    input_descripcion.innerHTML = valor_descripcion;

    let borde_precio = document.createElement("fieldset");
    borde_precio.setAttribute("class", "borde_precio_editar");

    let legend_precio = document.createElement("legend");
    legend_precio.setAttribute("class", "legend");
    legend_precio.innerHTML = "Cambiar precio:";

    let input_precio = document.createElement("input");
    input_precio.setAttribute("id", "input_precio");
    input_precio.setAttribute("class", "input");
    input_precio.setAttribute("type", "number");
    input_precio.setAttribute("name", "precio");
    input_precio.setAttribute("required", "");
    input_precio.setAttribute("value", valor_precio);

    let borde_stock = document.createElement("fieldset");
    borde_stock.setAttribute("class", "borde_stock_editar");

    let legend_stock = document.createElement("legend");
    legend_stock.setAttribute("class", "legend");
    legend_stock.innerHTML = "Cambiar stock:";

    let input_stock = document.createElement("input");
    input_stock.setAttribute("id", "input_stock");
    input_stock.setAttribute("class", "input");
    input_stock.setAttribute("type", "number");
    input_stock.setAttribute("name", "stock");
    input_stock.setAttribute("required", "");
    input_stock.setAttribute("value", valor_stock);

    let borde_img = document.createElement("fieldset");
    borde_img.setAttribute("class", "borde_img_editar");

    let legend_img = document.createElement("legend");
    legend_img.setAttribute("class", "legend");
    legend_img.innerHTML = "Cambiar imagen:";

    let input_img = document.createElement("input");
    input_img.setAttribute("id", "input_img");
    input_img.setAttribute("class", "input");
    input_img.setAttribute("type", "file");
    input_img.setAttribute("accept", ".jpg,.png");
    input_img.setAttribute("name", "img");
    input_img.setAttribute("required", "");

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_producto);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "ACTUALIZAR";
    boton_confirmar.addEventListener("click", confirmarCambiosProductos);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaEditarProductos);

    caja_editar.appendChild(titulo); 

    borde_precio.appendChild(input_precio);
    borde_precio.appendChild(legend_precio);
    caja_formulario.appendChild(borde_precio);

    borde_stock.appendChild(input_stock);
    borde_stock.appendChild(legend_stock);
    caja_formulario.appendChild(borde_stock);

    borde_img.appendChild(input_img);
    borde_img.appendChild(legend_img);
    caja_formulario.appendChild(borde_img);

    borde_descripcion.appendChild(input_descripcion);
    borde_descripcion.appendChild(legend_descripcion);
    caja_formulario.appendChild(borde_descripcion);

    caja_editar.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_editar.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_editar);
    document.body.appendChild(div_bloqueo);
}

function confirmarCambiosProductos(e) {
    e.preventDefault();

    let id_producto = this.getAttribute("id");

    let descripcion = document.getElementById("input_descripcion").value;
    let quitar_espacios_descripcion = descripcion.replace(/^\s*|\s*$/g, '');

    let precio = document.getElementById("input_precio").value;
    let quitar_espacios_precio = precio.replace(/^\s*|\s*$/g, '');

    let stock = document.getElementById("input_stock").value;
    let quitar_espacios_stock = stock.replace(/^\s*|\s*$/g, '');

    let img = document.getElementById("input_img").value;
    let valor_img = img.substring(12, img.length);
    let ruta_completa_img = "./img/" + valor_img;

    if (quitar_espacios_descripcion.length > 0 && quitar_espacios_precio.length > 0 && quitar_espacios_stock.length > 0 && img.length > 0) {
        let url = "./actualizar_producto.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "id_producto=" + id_producto + "&descripcion=" + quitar_espacios_descripcion + "&precio=" + quitar_espacios_precio + "&stock=" + quitar_espacios_stock + "&url_img=" + ruta_completa_img
        };

        fetch (url, param)
            .then (function (respuesta) {
                return respuesta.text();
            })
            .then (function (datos) {
                if (datos == "TRUE") {
                    document.getElementById("div_bloqueo").remove();
                    window.location.reload();
                } else {
                    let mensaje = "Ha ocurrido un error al editar el producto";
                    alertaErrores(mensaje);
                }
            })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cerrarCajaEditarProductos() {
    this.parentNode.parentNode.parentNode.remove();
}

function retirarProducto(e) {
    e.preventDefault();

    let id_producto = this.getAttribute("id");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_retirar = document.createElement("div");
    caja_retirar.setAttribute("class", "caja_baja");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Retirar producto";

    let h2 = document.createElement("h2");
    h2.innerHTML = "??Est??s seguro de que quieres retirar este producto de la tienda?";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_producto);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "RETIRAR";
    boton_confirmar.addEventListener("click", confirmarRetirar);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaRetirar);

    caja_retirar.appendChild(titulo); 
    caja_retirar.appendChild(h2);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_retirar.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_retirar);
    document.body.appendChild(div_bloqueo);
}

function confirmarRetirar(e) {
    e.preventDefault();

    let id_producto = this.getAttribute("id");

    let url = "./retirar_producto.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id=" + id_producto
    };

    fetch (url, param)
        .then (function (respuesta) {
            return respuesta.text();
        })
        .then (function (datos) {
            if (datos == "TRUE") {
                document.getElementById("div_bloqueo").remove();
                window.location.reload();
            } else {
                let mensaje = "Ha ocurrido un error al retirar el producto";
                alertaErrores(mensaje);
            }
        })
}

function cerrarCajaRetirar() {
    this.parentNode.parentNode.parentNode.remove();
}

function insertarProducto(e) {
    e.preventDefault();

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_insertar = document.createElement("div");
    caja_insertar.setAttribute("class", "caja_insertar_producto");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "A??adir un producto";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario_insertar");

    let formulario_alta = document.createElement("form");
    formulario_alta.setAttribute("id", "formulario_alta");

    let borde_nombre = document.createElement("fieldset");
    borde_nombre.setAttribute("class", "borde_nombre");

    let legend_nombre = document.createElement("legend");
    legend_nombre.setAttribute("class", "legend");
    legend_nombre.innerHTML = "Nombre:";

    let input_nombre = document.createElement("input");
    input_nombre.setAttribute("id", "input_nombre");
    input_nombre.setAttribute("class", "input");
    input_nombre.setAttribute("type", "text");
    input_nombre.setAttribute("name", "nombre");
    input_nombre.setAttribute("pattern", "^[A-Za-z]+$");
    input_nombre.setAttribute("required", "");

    let borde_descripcion = document.createElement("fieldset");
    borde_descripcion.setAttribute("class", "borde_descripcion");

    let legend_descripcion = document.createElement("legend");
    legend_descripcion.setAttribute("class", "legend");
    legend_descripcion.innerHTML = "Descripci??n:";

    let input_descripcion = document.createElement("textarea");
    input_descripcion.setAttribute("id", "input_descripcion");
    input_descripcion.setAttribute("class", "input");
    input_descripcion.setAttribute("name", "descripcion");
    input_descripcion.setAttribute("required", "");

    let borde_precio = document.createElement("fieldset");
    borde_precio.setAttribute("class", "borde_precio");

    let legend_precio = document.createElement("legend");
    legend_precio.setAttribute("class", "legend");
    legend_precio.innerHTML = "Precio:";

    let input_precio = document.createElement("input");
    input_precio.setAttribute("id", "input_precio");
    input_precio.setAttribute("class", "input");
    input_precio.setAttribute("type", "number");
    input_precio.setAttribute("name", "precio");
    input_precio.setAttribute("min", "0.01");
    input_precio.setAttribute("required", "");

    let borde_stock = document.createElement("fieldset");
    borde_stock.setAttribute("class", "borde_stock");

    let legend_stock = document.createElement("legend");
    legend_stock.setAttribute("class", "legend");
    legend_stock.innerHTML = "Stock:";

    let input_stock = document.createElement("input");
    input_stock.setAttribute("id", "input_stock");
    input_stock.setAttribute("class", "input");
    input_stock.setAttribute("type", "number");
    input_stock.setAttribute("name", "stock");
    input_stock.setAttribute("min", "1");
    input_stock.setAttribute("required", "");

    let borde_img = document.createElement("fieldset");
    borde_img.setAttribute("class", "borde_img");

    let legend_img = document.createElement("legend");
    legend_img.setAttribute("class", "legend");
    legend_img.innerHTML = "Imagen:";

    let input_img = document.createElement("input");
    input_img.setAttribute("id", "input_img");
    input_img.setAttribute("class", "input");
    input_img.setAttribute("type", "file");
    input_img.setAttribute("accept", ".jpg,.png");
    input_img.setAttribute("name", "img");
    input_img.setAttribute("required", "");

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_insertar");
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "A??ADIR";
    boton_confirmar.addEventListener("click", confirmarInsertar);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaInsertar);

    caja_insertar.appendChild(titulo); 

    borde_nombre.appendChild(input_nombre);
    borde_nombre.appendChild(legend_nombre);
    caja_formulario.appendChild(borde_nombre);

    borde_img.appendChild(input_img);
    borde_img.appendChild(legend_img);
    caja_formulario.appendChild(borde_img);

    borde_precio.appendChild(input_precio);
    borde_precio.appendChild(legend_precio);
    caja_formulario.appendChild(borde_precio);

    borde_stock.appendChild(input_stock);
    borde_stock.appendChild(legend_stock);
    caja_formulario.appendChild(borde_stock);

    borde_descripcion.appendChild(input_descripcion);
    borde_descripcion.appendChild(legend_descripcion);
    caja_formulario.appendChild(borde_descripcion);

    caja_insertar.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_insertar.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_insertar);
    document.body.appendChild(div_bloqueo);
}

function confirmarInsertar(e) {
    e.preventDefault();
    
    let nombre = document.getElementById("input_nombre").value;
    let quitar_espacios_nombre = nombre.replace(/^\s*|\s*$/g, '');
    
    let descripcion = document.getElementById("input_descripcion").value;
    let quitar_espacios_descripcion = descripcion.replace(/^\s*|\s*$/g, '');

    let precio = document.getElementById("input_precio").value;
    let quitar_espacios_precio = precio.replace(/^\s*|\s*$/g, '');

    let stock = document.getElementById("input_stock").value;
    let quitar_espacios_stock = stock.replace(/^\s*|\s*$/g, '');

    let img = document.getElementById("input_img").value;
    let valor_img = img.substring(12, img.length);
    let ruta_completa_img = "./img/" + valor_img;

    if (quitar_espacios_nombre.length > 0 && quitar_espacios_descripcion.length > 0 && quitar_espacios_precio.length > 0 && quitar_espacios_stock.length > 0 && img.length > 0) {
        let url = "./insertar_producto.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "nombre=" + quitar_espacios_nombre + "&descripcion=" + quitar_espacios_descripcion + "&precio=" + quitar_espacios_precio + "&stock=" + quitar_espacios_stock + "&url_img=" + ruta_completa_img
        };

        fetch (url, param)
            .then (function (respuesta) {
                return respuesta.text();
            })
            .then (function (datos) {
                if (datos == "TRUE") {
                    document.getElementById("div_bloqueo").remove();
                    window.location.reload();
                } else {
                    let mensaje = "Ha ocurrido un error al a??adir el producto";
                    alertaErrores(mensaje);
                }
            })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cerrarCajaInsertar() {
    this.parentNode.parentNode.parentNode.remove();
}

let servicios = document.getElementById("servicios");
servicios.addEventListener("click", cargarTitulosServicios);

function cargarTitulosServicios(e) {
    e.preventDefault();
    this.style.backgroundColor = "khaki";
    reservas.style.backgroundColor = "darkkhaki";
    pedidos.style.backgroundColor = "darkkhaki";
    usuarios.style.backgroundColor = "darkkhaki";
    empleados.style.backgroundColor = "darkkhaki";
    productos.style.backgroundColor = "darkkhaki";
    ingresos.style.backgroundColor = "darkkhaki";

    let caja_principal = document.getElementById("caja_principal");

    if (caja_principal.children[0] && caja_principal.children[1]) {
        caja_principal.children[0].remove();
        caja_principal.lastChild.remove();
    }

    let caja_titulos = document.createElement("div");
    caja_titulos.setAttribute("class", "caja_titulos");

    let titulos = document.createElement("div");
    titulos.setAttribute("class", "titulos");

    let tipo = document.createElement("h3");
    tipo.setAttribute("class", "tipo");
    tipo.innerHTML = "Tipo";

    let precio = document.createElement("h3");
    precio.setAttribute("class", "precio");
    precio.innerHTML = "Precio";

    let categoria = document.createElement("h3");
    categoria.setAttribute("class", "categoria");
    categoria.innerHTML = "Categoria";

    let caja_servicios = document.createElement("div");
    caja_servicios.setAttribute("id", "caja_servicios");

    titulos.appendChild(tipo);
    titulos.appendChild(precio);
    titulos.appendChild(categoria);
    caja_titulos.appendChild(titulos);    

    caja_principal.appendChild(caja_titulos);
    caja_principal.appendChild(caja_servicios);

    cargarServicios();
}

function cargarServicios() {
    let caja_servicios = document.getElementById("caja_servicios");

    let url = "./cargar_servicios_admin.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            if (datos) {
                for (let dato of datos) {
                    let servicios = document.createElement("div");
                    servicios.setAttribute("class", "servicios");
    
                    let tipo = document.createElement("div");
                    tipo.setAttribute("class", "tipo");
    
                    let tipo_servicio = document.createElement("h4");
                    tipo_servicio.innerHTML = dato[1];
    
                    let precio = document.createElement("div");
                    precio.setAttribute("class", "precio");
    
                    let precio_servicio = document.createElement("h4");
                    precio_servicio.innerHTML = dato[2] + "???";

                    let categoria = document.createElement("div");
                    categoria.setAttribute("class", "categoria");
    
                    let categoria_servicio = document.createElement("h4");
                    categoria_servicio.innerHTML = dato[3].charAt(0).toUpperCase() + dato[3].slice(1);

                    let boton_editar_servicio= document.createElement("button");
                    boton_editar_servicio.setAttribute("type", "submit");
                    boton_editar_servicio.setAttribute("id", dato[0]);
                    boton_editar_servicio.setAttribute("class", "editar_servicio");
                    boton_editar_servicio.innerHTML = "Cambiar precio";
                    boton_editar_servicio.onclick = editarServicio;
    
                    let boton_retirar_servicio = document.createElement("button");
                    boton_retirar_servicio.setAttribute("type", "submit");
                    boton_retirar_servicio.setAttribute("id", dato[0]);
                    boton_retirar_servicio.setAttribute("class", "retirar_servicio");
                    boton_retirar_servicio.innerHTML = "Retirar";
                    boton_retirar_servicio.onclick = retirarServicio;
    
                    let hr = document.createElement("hr");
    
                    tipo.appendChild(tipo_servicio);
                    servicios.appendChild(tipo);
    
                    precio.appendChild(precio_servicio);
                    servicios.appendChild(precio);

                    categoria.appendChild(categoria_servicio);
                    servicios.appendChild(categoria);
    
                    servicios.appendChild(boton_editar_servicio);
                    servicios.appendChild(boton_retirar_servicio);
    
                    caja_servicios.appendChild(servicios);
                    caja_servicios.appendChild(hr);
                }
                let boton_insertar_servicio = document.createElement("button");
                boton_insertar_servicio.setAttribute("type", "submit");
                boton_insertar_servicio.setAttribute("id", "boton_insertar_servicio");
                boton_insertar_servicio.setAttribute("class", "insertar_servicio");
                boton_insertar_servicio.innerHTML = "A??adir servicio";
                boton_insertar_servicio.onclick = insertarServicio;

                caja_servicios.appendChild(boton_insertar_servicio);
            } else {
                let boton_insertar_servicio = document.createElement("button");
                boton_insertar_servicio.setAttribute("type", "submit");
                boton_insertar_servicio.setAttribute("id", "boton_insertar_servicio");
                boton_insertar_servicio.setAttribute("class", "insertar_servicio");
                boton_insertar_servicio.innerHTML = "A??adir servicio";
                boton_insertar_servicio.onclick = insertarServicio;

                caja_servicios.appendChild(boton_insertar_servicio);
            }
        })
}

function editarServicio(e) {
    e.preventDefault();

    let id_servicio = this.getAttribute("id");
    let precio = this.parentNode.children[2].innerText;
    let valor_precio = precio.substring(0, precio.length - 1);

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_editar = document.createElement("div");
    caja_editar.setAttribute("class", "caja_editar");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Cambiar el precio del producto:";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario");

    let formulario_editar = document.createElement("form");
    formulario_editar.setAttribute("id", "formulario_editar");

    let borde_precio = document.createElement("fieldset");

    let legend_precio = document.createElement("legend");
    legend_precio.setAttribute("class", "legend");
    legend_precio.innerHTML = "Precio:";

    let input_precio = document.createElement("input");
    input_precio.setAttribute("id", "input_precio");
    input_precio.setAttribute("class", "input");
    input_precio.setAttribute("type", "number");
    input_precio.setAttribute("name", "precio");
    input_precio.setAttribute("min", "0.01");
    input_precio.setAttribute("required", "");
    input_precio.setAttribute("value", valor_precio);

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_servicio);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "ACTUALIZAR";
    boton_confirmar.addEventListener("click", confirmarCambiosServicio);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaEditarServicio);

    caja_editar.appendChild(titulo); 

    borde_precio.appendChild(input_precio);
    borde_precio.appendChild(legend_precio);
    caja_formulario.appendChild(borde_precio);

    caja_editar.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_editar.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_editar);
    document.body.appendChild(div_bloqueo);
}

function confirmarCambiosServicio(e) {
    e.preventDefault();

    let id_servicio = this.getAttribute("id");

    let precio = document.getElementById("input_precio").value;

    if (precio.length > 0) {
        let url = "./actualizar_servicio.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "id=" + id_servicio + "&precio=" + precio
        };

        fetch (url, param)
            .then (function (respuesta) {
                return respuesta.text();
            })
            .then (function (datos) {
                if (datos == "TRUE") {
                    document.getElementById("div_bloqueo").remove();
                    window.location.reload();
                } else {
                    let mensaje = "Ha ocurrido un error al editar el servicio";
                    alertaErrores(mensaje);
                }
            })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cerrarCajaEditarServicio() {
    this.parentNode.parentNode.parentNode.remove();
}

function retirarServicio(e) {
    e.preventDefault();

    let id_servicio = this.getAttribute("id");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_baja = document.createElement("div");
    caja_baja.setAttribute("class", "caja_baja");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Retirar servicio";

    let h2 = document.createElement("h2");
    h2.innerHTML = "??Est??s seguro de que quieres retirar este servicio?";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", id_servicio);
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "RETIRAR";
    boton_confirmar.addEventListener("click", confirmarRetirarServicio);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaRetirarServicio);

    caja_baja.appendChild(titulo); 
    caja_baja.appendChild(h2);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_baja.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_baja);
    document.body.appendChild(div_bloqueo);
}

function confirmarRetirarServicio(e) {
    e.preventDefault();

    let id_servicio = this.getAttribute("id");

    let url = "./retirar_servicio.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id=" + id_servicio
    };

    fetch (url, param)
        .then (function (respuesta) {
            return respuesta.text();
        })
        .then (function (datos) {
            if (datos == "TRUE") {
                document.getElementById("div_bloqueo").remove();
                window.location.reload();
            } else {
                let mensaje = "Ha ocurrido un error al retirar el servicio";
                alertaErrores(mensaje);
            }
        })
}

function cerrarCajaRetirarServicio() {
    this.parentNode.parentNode.parentNode.remove();
}

function insertarServicio(e) {
    e.preventDefault();

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_insertar_servicio = document.createElement("div");
    caja_insertar_servicio.setAttribute("class", "caja_insertar_servicio");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "A??adir un servicio";

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario_servicio");

    let formulario_insertar = document.createElement("form");
    formulario_insertar.setAttribute("id", "formulario_alta");

    let borde_tipo = document.createElement("fieldset");

    let legend_tipo = document.createElement("legend");
    legend_tipo.setAttribute("class", "legend");
    legend_tipo.innerHTML = "Tipo:";

    let input_tipo = document.createElement("input");
    input_tipo.setAttribute("id", "input_tipo");
    input_tipo.setAttribute("class", "input");
    input_tipo.setAttribute("type", "text");
    input_tipo.setAttribute("name", "tipo");
    input_tipo.setAttribute("pattern", "^[A-Za-z]+$");
    input_tipo.setAttribute("required", "");

    let borde_precio = document.createElement("fieldset");

    let legend_precio = document.createElement("legend");
    legend_precio.setAttribute("class", "legend");
    legend_precio.innerHTML = "Precio:";

    let input_precio = document.createElement("input");
    input_precio.setAttribute("id", "input_precio");
    input_precio.setAttribute("class", "input");
    input_precio.setAttribute("type", "number");
    input_precio.setAttribute("name", "precio");
    input_precio.setAttribute("min", "0.01");
    input_precio.setAttribute("required", "");

    let borde_categoria = document.createElement("fieldset");

    let legend_categoria = document.createElement("legend");
    legend_categoria.setAttribute("class", "legend");
    legend_categoria.innerHTML = "Categoria:";

    let select_categoria = document.createElement("select");
    select_categoria.setAttribute("id", "input_categoria");
    select_categoria.setAttribute("class", "input");
    select_categoria.setAttribute("name", "categoria");
    select_categoria.setAttribute("required", "");

    let opcion1 = document.createElement("option");
    opcion1.innerHTML = "Cortes de pelo";

    let opcion2 = document.createElement("option");
    opcion2.innerHTML = "Cortes de barba";

    let opcion3 = document.createElement("option");
    opcion3.innerHTML = "Tintar y peinar";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_insertar");
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "A??ADIR";
    boton_confirmar.addEventListener("click", confirmarInsertarServicio);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaInsertarServicio);

    caja_insertar_servicio.appendChild(titulo); 

    borde_tipo.appendChild(input_tipo);
    borde_tipo.appendChild(legend_tipo);
    caja_formulario.appendChild(borde_tipo);

    borde_precio.appendChild(input_precio);
    borde_precio.appendChild(legend_precio);
    caja_formulario.appendChild(borde_precio);

    select_categoria.appendChild(opcion1);
    select_categoria.appendChild(opcion2);
    select_categoria.appendChild(opcion3);
    borde_categoria.appendChild(select_categoria);
    borde_categoria.appendChild(legend_categoria);
    caja_formulario.appendChild(borde_categoria);

    caja_insertar_servicio.appendChild(caja_formulario);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_insertar_servicio.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_insertar_servicio);
    document.body.appendChild(div_bloqueo);
}

function confirmarInsertarServicio(e) {
    e.preventDefault();
    
    let tipo = document.getElementById("input_tipo").value;
    let tipo_sin_numeros = tipo.replace(/\d/g,"");
    let quitar_espacios_tipo = tipo_sin_numeros.replace(/^\s*|\s*$/g, '');
    
    let precio = document.getElementById("input_precio").value;
    let quitar_espacios_precio = precio.replace(/^\s*|\s*$/g, '');

    let categoria = document.getElementById("input_categoria").value;
    let valor_categoria = categoria.toLowerCase();

    if (quitar_espacios_tipo.length > 0 && quitar_espacios_precio.length > 0 && categoria.length > 0) {
        let url = "./insertar_servicio.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "tipo=" + quitar_espacios_tipo + "&precio=" + quitar_espacios_precio + "&categoria=" + valor_categoria
        };

        fetch (url, param)
            .then (function (respuesta) {
                return respuesta.text();
            })
            .then (function (datos) {
                if (datos == "TRUE") {
                    document.getElementById("div_bloqueo").remove();
                    window.location.reload();
                } else {
                    let mensaje = "Ha ocurrido un error al a??adir el servicio";
                    alertaErrores(mensaje);
                }
            })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function cerrarCajaInsertarServicio() {
    this.parentNode.parentNode.parentNode.remove();
}

let ingresos = document.getElementById("ingresos");
ingresos.addEventListener("click", cargarIngresos);

function cargarIngresos(e) {
    e.preventDefault();
    this.style.backgroundColor = "khaki";
    reservas.style.backgroundColor = "darkkhaki";
    pedidos.style.backgroundColor = "darkkhaki";
    usuarios.style.backgroundColor = "darkkhaki";
    empleados.style.backgroundColor = "darkkhaki";
    productos.style.backgroundColor = "darkkhaki";
    servicios.style.backgroundColor = "darkkhaki";

    let caja_principal = document.getElementById("caja_principal");

    if (caja_principal.children[0] && caja_principal.children[1]) {
        caja_principal.children[0].remove();
        caja_principal.lastChild.remove();
    }

    let caja_ingresos = document.createElement("div");
    caja_ingresos.setAttribute("class", "caja_ingresos");

    let ingresos = document.createElement("div");
    ingresos.setAttribute("class", "ingresos");

    let ingresos_totales = document.createElement("h3");
    ingresos_totales.setAttribute("class", "tipo");
    ingresos_totales.innerHTML = "Ingresos totales:";

    let precio_total = document.createElement("h2");
    precio_total.setAttribute("class", "precio_total");

    let url1 = "./cargar_ingresos_totales.php";

    fetch(url1)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            if (datos != null) {
                precio_total.innerHTML = datos + "???";   
            } else {
                precio_total.innerHTML = "0???";   
            }
        })

    let caja_ingresos_detalles = document.createElement("div");
    caja_ingresos_detalles.setAttribute("class", "caja_ingresos_detalles");

    let caja_ingresos_citas = document.createElement("div");
    caja_ingresos_citas.setAttribute("id", "caja_ingresos_citas");

    let caja_formulario_citas = document.createElement("div");
    caja_formulario_citas.setAttribute("class", "caja_formulario_detalles");

    let form = document.createElement("form");
    form.setAttribute("class", "formulario_citas");

    let caja_ingresos_citas_general = document.createElement("div");
    caja_ingresos_citas_general.setAttribute("id", "caja_ingresos_citas_general");

    let ingresos_citas = document.createElement("h3");
    ingresos_citas.setAttribute("class", "ingresos_citas");
    ingresos_citas.innerHTML = "Ingresos citas:";

    let precio_citas = document.createElement("h3");
    precio_citas.setAttribute("class", "precio_citas");

    let url2 = "./cargar_ingresos_citas.php";

    fetch(url2)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            if (datos[0][0] != null) {
                precio_citas.innerHTML = datos[0][0] + "???";   
            } else {
                precio_citas.innerHTML = "0???";   
            }
        })

    let select_empleado = document.createElement("select");
    select_empleado.setAttribute("id", "input_empleado");
    select_empleado.setAttribute("name", "empleado");
    select_empleado.setAttribute("required", "");

    let url3 = "./cargar_empleados.php";

    fetch(url3)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            for (let dato of datos) {
                let opcion = document.createElement("option");
                opcion.setAttribute("value", dato[0]);
                opcion.innerHTML = dato[1] + " " + dato[2];

                select_empleado.appendChild(opcion);
            }    
        })

    let input_fecha_inicio = document.createElement("input");
    input_fecha_inicio.setAttribute("class", "input_horario");
    input_fecha_inicio.setAttribute("id", "fecha_inicio");
    input_fecha_inicio.setAttribute("type", "date");
    input_fecha_inicio.setAttribute("name", "fecha");
    input_fecha_inicio.setAttribute("required", "");

    let input_fecha_fin = document.createElement("input");
    input_fecha_fin.setAttribute("class", "input_horario");
    input_fecha_fin.setAttribute("id", "fecha_fin");
    input_fecha_fin.setAttribute("type", "date");
    input_fecha_fin.setAttribute("name", "fecha");
    input_fecha_fin.setAttribute("required", "");

    let buscar_empleado = document.createElement("i");
    buscar_empleado.setAttribute("id", "buscar_empleado");
    buscar_empleado.setAttribute("class", "fas fa-search");
    buscar_empleado.addEventListener("click", buscarCitasEmpleado);

    let caja_resultado_empleado = document.createElement("div");
    caja_resultado_empleado.setAttribute("id", "caja_resultado_empleado");

    let caja_ingresos_pedidos = document.createElement("div");
    caja_ingresos_pedidos.setAttribute("id", "caja_ingresos_pedidos");

    let caja_formulario_pedidos = document.createElement("div");
    caja_formulario_pedidos.setAttribute("class", "caja_formulario_detalles");

    let form_pedidos = document.createElement("form");
    form_pedidos.setAttribute("class", "formulario_citas");

    let caja_ingresos_pedidos_general = document.createElement("div");
    caja_ingresos_pedidos_general.setAttribute("id", "caja_ingresos_pedidos_general");

    let ingresos_pedidos = document.createElement("h3");
    ingresos_pedidos.setAttribute("class", "ingresos_pedidos");
    ingresos_pedidos.innerHTML = "Ingresos pedidos:";

    let precio_pedidos = document.createElement("h3");
    precio_pedidos.setAttribute("class", "precio_pedidos");

    let url4 = "./cargar_ingresos_pedidos.php";

    fetch(url4)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            if (datos[0][0] != null) {
                precio_pedidos.innerHTML = datos[0][0] + "???";   
            } else {
                precio_pedidos.innerHTML = "0???";   
            }
        })

    let input_fecha_inicio_pedidos = document.createElement("input");
    input_fecha_inicio_pedidos.setAttribute("class", "input_horario");
    input_fecha_inicio_pedidos.setAttribute("id", "fecha_inicio_pedidos");
    input_fecha_inicio_pedidos.setAttribute("type", "date");
    input_fecha_inicio_pedidos.setAttribute("name", "fecha");
    input_fecha_inicio_pedidos.setAttribute("required", "");

    let input_fecha_fin_pedidos = document.createElement("input");
    input_fecha_fin_pedidos.setAttribute("class", "input_horario");
    input_fecha_fin_pedidos.setAttribute("id", "fecha_fin_pedidos");
    input_fecha_fin_pedidos.setAttribute("type", "date");
    input_fecha_fin_pedidos.setAttribute("name", "fecha");
    input_fecha_fin_pedidos.setAttribute("required", "");

    let buscar_pedido = document.createElement("i");
    buscar_pedido.setAttribute("id", "buscar_pedido");
    buscar_pedido.setAttribute("class", "fas fa-search");
    buscar_pedido.addEventListener("click", buscarPedido);

    let caja_resultado_pedido = document.createElement("div");
    caja_resultado_pedido.setAttribute("id", "caja_resultado_pedido");

    ingresos.appendChild(ingresos_totales);
    ingresos.appendChild(precio_total);
    caja_ingresos.appendChild(ingresos);  

    caja_ingresos_citas_general.appendChild(ingresos_citas);
    caja_ingresos_citas_general.appendChild(precio_citas);
    caja_formulario_citas.appendChild(caja_ingresos_citas_general);
    caja_formulario_citas.appendChild(select_empleado);
    caja_formulario_citas.appendChild(input_fecha_inicio);
    caja_formulario_citas.appendChild(input_fecha_fin);
    caja_formulario_citas.appendChild(buscar_empleado);
    caja_ingresos_citas.appendChild(caja_formulario_citas);

    caja_ingresos_citas.appendChild(caja_resultado_empleado);
    caja_ingresos_detalles.appendChild(caja_ingresos_citas);

    caja_ingresos_pedidos.appendChild(ingresos_pedidos);
    caja_ingresos_pedidos.appendChild(precio_pedidos); 
    caja_ingresos_detalles.appendChild(caja_ingresos_pedidos);

    caja_ingresos_pedidos_general.appendChild(ingresos_pedidos);
    caja_ingresos_pedidos_general.appendChild(precio_pedidos);
    caja_formulario_pedidos.appendChild(caja_ingresos_pedidos_general);
    caja_formulario_pedidos.appendChild(input_fecha_inicio_pedidos);
    caja_formulario_pedidos.appendChild(input_fecha_fin_pedidos);
    caja_formulario_pedidos.appendChild(buscar_pedido);
    caja_ingresos_pedidos.appendChild(caja_formulario_pedidos);

    caja_ingresos_pedidos.appendChild(caja_resultado_pedido);
    caja_ingresos_detalles.appendChild(caja_ingresos_pedidos);

    caja_principal.appendChild(caja_ingresos);
    caja_principal.appendChild(caja_ingresos_detalles);
}

function buscarCitasEmpleado(e) {
    e.preventDefault();

    let valor_empleado = document.getElementById("input_empleado").value;
    let valor_fecha_inicio = document.getElementById("fecha_inicio").value;
    let valor_fecha_fin = document.getElementById("fecha_fin").value;

    let array = [valor_empleado, valor_fecha_inicio, valor_fecha_fin];

    if (valor_empleado.length > 0 && valor_fecha_inicio.length > 0 && valor_fecha_fin.length > 0) {
        let url = "./bucar_citas_empleado.php";
        let param = {
            method : "POST",
            body : JSON.stringify(array)
        }

        fetch(url, param)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {
            if (datos[0] != 0.00) {
                let caja_resultado_empleado = document.getElementById("caja_resultado_empleado");
                caja_resultado_empleado.innerHTML = "Ha aportado " + datos[0] + "??? de ingresos.";
            } else {
                let caja_resultado_empleado = document.getElementById("caja_resultado_empleado");
                caja_resultado_empleado.innerHTML = "No hay datos.";
            }
        })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
}

function buscarPedido(e) {
    e.preventDefault();

    let valor_fecha_inicio = document.getElementById("fecha_inicio_pedidos").value;
    let valor_fecha_fin = document.getElementById("fecha_fin_pedidos").value;

    let array = [valor_fecha_inicio, valor_fecha_fin];

    if (valor_fecha_inicio.length > 0 && valor_fecha_fin.length > 0) {
        let url = "./buscar_pedidos.php";
        let param = {
            method : "POST",
            body : JSON.stringify(array)
        }

        fetch(url, param)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {
            if (datos[0] != 0.00) {
                let caja_resultado_pedido = document.getElementById("caja_resultado_pedido");
                caja_resultado_pedido.innerHTML = "Ha habido " + datos[0] + "??? de ingresos.";
            } else {
                let caja_resultado_pedido = document.getElementById("caja_resultado_pedido");
                caja_resultado_pedido.innerHTML = "No hay datos.";
            }
        })
    } else {
        let mensaje = "ERROR, hay campos en blanco";
        alertaErrores(mensaje);
    }
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