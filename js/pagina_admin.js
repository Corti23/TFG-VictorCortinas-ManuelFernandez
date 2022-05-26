var cerrar_sesion = document.getElementById("cerrar_sesion");

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

let reservas = document.getElementById("reservas");
reservas.addEventListener("click", cargarTitulosReservas);

function cargarTitulosReservas(e) {
    e.preventDefault();

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
                precio_servicio.innerHTML = dato[4] + "€";

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

                caja_reservas.appendChild(reservas);
                caja_reservas.appendChild(hr);
            }
        })
}

let pedidos = document.getElementById("pedidos");
pedidos.addEventListener("click", cargarTitulosPedidos);

function cargarTitulosPedidos(e) {
    e.preventDefault();

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
                precio_producto.innerHTML = dato[3] + "€";

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

let empleados = document.getElementById("empleados");
empleados.addEventListener("click", cargarTitulosEmpleados);

function cargarTitulosEmpleados(e) {
    e.preventDefault();

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
    input_img.setAttribute("type", "text");
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
    let quitar_espacios_img = img.replace(/^\s*|\s*$/g, '');

    if (quitar_espacios_img.length > 0) {
        let url = "./actualizar_empleado.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "id=" + id_empleado + "&url_img=" + img
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
                    alert("Ha ocurrido un error al editar la foto.");
                }
            })
    } else {
        alert("ERROR, hay campos en blanco!");
    }
}

function cerrarCajaEditar() {
    document.getElementById("div_bloqueo").remove();
    this.parentNode.parentNode.remove();
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
    h2.innerHTML = "¿Estás seguro de que quieres dar de baja a este empleado?";

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
                alert("Ha ocurrido un error al dar de baja al empleado.");
            }
        })
}

function cerrarCajaBaja() {
    document.getElementById("div_bloqueo").remove();
    this.parentNode.parentNode.remove();
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
    caja_formulario.setAttribute("class", "caja_formulario");

    let formulario_alta = document.createElement("form");
    formulario_alta.setAttribute("id", "formulario_alta");

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

    let borde_img = document.createElement("fieldset");

    let legend_img = document.createElement("legend");
    legend_img.setAttribute("class", "legend");
    legend_img.innerHTML = "Imagen:";

    let input_img = document.createElement("input");
    input_img.setAttribute("id", "input_img");
    input_img.setAttribute("class", "input");
    input_img.setAttribute("type", "text");
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
    let quitar_espacios_img = img.replace(/^\s*|\s*$/g, '');

    if (quitar_espacios.length > 0 && quitar_espacios_iniciales.length > 0 && quitar_espacios_img.length > 0) {
        let url = "./insertar_empleado.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "nombre=" + nombre_sin_numeros + "&apellidos=" + apellidos_sin_numeros + "&url_img=" + img
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
                    alert("Ha ocurrido un error al dar de alta al empleado.");
                }
            })
    } else {
        alert("ERROR, hay campos en blanco!");
    }
}

function cerrarCajaAlta() {
    document.getElementById("div_bloqueo").remove();
    this.parentNode.parentNode.remove();
}

//-----------------------------------------------------------------------------------------------------------------//

let productos = document.getElementById("productos");
productos.addEventListener("click", cargarTitulosProductos);

function cargarTitulosProductos(e) {
    e.preventDefault();

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
                    precio_producto.innerHTML = dato[3] + "€";

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
                let boton_añadir = document.createElement("button");
                boton_añadir.setAttribute("type", "submit");
                boton_añadir.setAttribute("id", "boton_añadir");
                boton_añadir.setAttribute("class", "insertar_empleado");
                boton_añadir.innerHTML = "Añadir producto";
                boton_añadir.onclick = insertarProducto;

                caja_productos.appendChild(boton_añadir);
            } else {
                let boton_añadir = document.createElement("button");
                boton_añadir.setAttribute("type", "submit");
                boton_añadir.setAttribute("id", "boton_añadir");
                boton_añadir.setAttribute("class", "insertar_empleado");
                boton_añadir.innerHTML = "Añadir producto";
                boton_añadir.onclick = insertarProducto;

                caja_productos.appendChild(boton_añadir);
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
    let valor_img = this.parentNode.children[5].innerText;

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

    let legend_img = document.createElement("legend");
    legend_img.setAttribute("class", "legend");
    legend_img.innerHTML = "Cambiar imagen:";

    let input_img = document.createElement("input");
    input_img.setAttribute("id", "input_img");
    input_img.setAttribute("class", "input");
    input_img.setAttribute("type", "text");
    input_img.setAttribute("name", "img");
    input_img.setAttribute("required", "");
    input_img.setAttribute("value", valor_img);

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
    let quitar_espacios_img = img.replace(/^\s*|\s*$/g, '');

    if (quitar_espacios_descripcion.length > 0 && quitar_espacios_precio.length > 0 && quitar_espacios_stock.length > 0 && quitar_espacios_img.length > 0) {
        console.log("Entra");
        let url = "./actualizar_producto.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "id_producto=" + id_producto + "&descripcion=" + quitar_espacios_descripcion + "&precio=" + quitar_espacios_precio + "&stock=" + quitar_espacios_stock + "&url_img=" + quitar_espacios_img
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
                    alert("Ha ocurrido un error al editar el producto.");
                }
            })
    } else {
        alert("ERROR, hay campos en blanco!");
    }
}

function cerrarCajaEditarProductos() {
    document.getElementById("div_bloqueo").remove();
    this.parentNode.parentNode.remove();
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
    h2.innerHTML = "¿Estás seguro de que quieres retirar este producto de la tienda?";

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
                alert("Ha ocurrido un error al retirar el producto.");
            }
        })
}

function cerrarCajaRetirar() {
    document.getElementById("div_bloqueo").remove();
    this.parentNode.parentNode.remove();
}

function insertarProducto(e) {
    e.preventDefault();

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_insertar = document.createElement("div");
    caja_insertar.setAttribute("class", "caja_insertar_producto");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Añadir un producto";

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
    legend_descripcion.innerHTML = "Descripción:";

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
    input_stock.setAttribute("required", "");

    let borde_img = document.createElement("fieldset");
    borde_img.setAttribute("class", "borde_img");

    let legend_img = document.createElement("legend");
    legend_img.setAttribute("class", "legend");
    legend_img.innerHTML = "Imagen:";

    let input_img = document.createElement("input");
    input_img.setAttribute("id", "input_img");
    input_img.setAttribute("class", "input");
    input_img.setAttribute("type", "text");
    input_img.setAttribute("name", "img");
    input_img.setAttribute("required", "");

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_insertar");
    boton_confirmar.setAttribute("class", "boton_confirmar");
    boton_confirmar.innerHTML = "AÑADIR";
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
    let quitar_espacios_nombre = nombre.replace(/\s/g, '');
    
    let descripcion = document.getElementById("input_descripcion").value;
    let quitar_espacios_descripcion = descripcion.replace(/^\s*|\s*$/g, '');

    let precio = document.getElementById("input_precio").value;
    let quitar_espacios_precio = precio.replace(/^\s*|\s*$/g, '');

    let stock = document.getElementById("input_stock").value;
    let quitar_espacios_stock = stock.replace(/^\s*|\s*$/g, '');

    let img = document.getElementById("input_img").value;
    let quitar_espacios_img = img.replace(/^\s*|\s*$/g, '');

    console.log(quitar_espacios_nombre)
    console.log(quitar_espacios_descripcion)
    console.log(quitar_espacios_precio)
    console.log(quitar_espacios_stock)
    console.log(quitar_espacios_img)

    if (quitar_espacios_nombre.length > 0 && quitar_espacios_descripcion.length > 0 && quitar_espacios_precio.length > 0 && quitar_espacios_stock.length > 0 && quitar_espacios_img.length > 0) {
        console.log("Entra2")
        /*let url = "./insertar_empleado.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "nombre=" + quitar_espacios_nombre + "&descripcion=" + quitar_espacios_descripcion + "&precio=" + quitar_espacios_precio + "&stock=" + quitar_espacios_stock + "&url_img=" + img
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
                    alert("Ha ocurrido un error al añadir el producto.");
                }
            })*/
    } else {
        alert("ERROR, hay campos en blanco!");
    }
}

function cerrarCajaInsertar() {
    document.getElementById("div_bloqueo").remove();
    this.parentNode.parentNode.remove();
}