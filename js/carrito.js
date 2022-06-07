let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");
let perfil = document.getElementById("perfil");

var home = document.getElementById("divHome");
var pedir_cita = document.getElementById("pedir_cita");
var contacto = document.getElementById("contacto");
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

cargarProductosCarrito();
precio_total_carrito();

function cargarProductosCarrito() {
    let caja_carrito = document.getElementById("caja_carrito");

    let url = "./cargar_productos_carrito.php";

    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {
            for (let dato of datos) {
                let productos = document.createElement("div");
                productos.setAttribute("class", "productos");
                productos.setAttribute("id", dato[0]);

                let producto = document.createElement("div");
                producto.setAttribute("class", "producto");

                let img = document.createElement("img");
                img.setAttribute("src", dato[1]);
                img.setAttribute("class", "img_articulos");

                let nombre = document.createElement("h4");
                nombre.innerHTML = dato[2];

                let estado = document.createElement("div");
                estado.setAttribute("class", "estado");

                let valor_estado = document.createElement("h4");
                if (dato[3] > 0) {
                    valor_estado.innerHTML = "Disponible";
                } else {
                    valor_estado.innerHTML = "Agotado";
                }
                
                let precio = document.createElement("div");
                precio.setAttribute("class", "precio");

                let valor_precio = document.createElement("h4");
                valor_precio.innerHTML = dato[4] + "€";

                let cantidad = document.createElement("div");
                cantidad.setAttribute("class", "cantidad");

                let valor_cantidad = document.createElement("input");
                valor_cantidad.setAttribute("type", "number");
                valor_cantidad.setAttribute("name", "cantidad");
                valor_cantidad.setAttribute("id", "cantidad");
                valor_cantidad.setAttribute("min", 1);
                valor_cantidad.setAttribute("max", dato[3]);
                valor_cantidad.setAttribute("value", dato[5]);
                valor_cantidad.setAttribute("onKeyDown", "return false");
                valor_cantidad.addEventListener("input", calcularTotal);

                let total = document.createElement("div");
                total.setAttribute("class", "total");

                let valor_total = document.createElement("h4");
                valor_total.innerHTML = (dato[4] * valor_cantidad.value).toFixed(2) + "€";

                let borrar = document.createElement("h4");
                borrar.setAttribute("class", "borrar");
                borrar.setAttribute("id", dato[0]);
                borrar.innerHTML = "❌";
                borrar.addEventListener("click", alertaBorrar);

                let hr = document.createElement("hr");

                producto.appendChild(img);
                producto.appendChild(nombre);
                productos.appendChild(producto);

                estado.appendChild(valor_estado);
                productos.appendChild(estado);

                precio.appendChild(valor_precio);
                productos.appendChild(precio);

                cantidad.appendChild(valor_cantidad);
                productos.appendChild(cantidad);

                total.appendChild(valor_total);
                productos.appendChild(total);
                
                productos.appendChild(borrar);

                caja_carrito.appendChild(productos);
                caja_carrito.appendChild(hr);
            }
        })    
}

function calcularTotal() {
    let id_producto = this.parentNode.parentNode.getAttribute("id");

    let precio = this.parentNode.previousSibling.firstChild.innerHTML;
    let valor_precio = precio.substring(0, precio.length - 1);
    let cantidad = this.value;

    let valor_total = cantidad * valor_precio;

    let total = this.parentNode.nextSibling.firstChild;
    total.innerHTML = valor_total.toFixed(2) + "€";
    
    let url = "./actualizar_cantidad_producto.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id_producto=" + id_producto + "&cantidad_producto=" + cantidad
    }

    fetch(url, param)
        .then (function (respuesa) {
            return respuesa.text();
        })
        .then (precio_total_carrito)
}

function alertaBorrar() {
    document.body.setAttribute("onKeyDown", "return false");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");

    let caja_alerta = document.createElement("div");
    caja_alerta.setAttribute("class", "caja_alerta");
    caja_alerta.setAttribute("id", this.id)
    
    let h2 = document.createElement("h2");
    h2.innerHTML = "¿Estás seguro de que quieres eliminar el producto del carrito?";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_eliminar = document.createElement("button");
    boton_eliminar.setAttribute("type", "submit");
    boton_eliminar.setAttribute("id", "boton_eliminar");
    boton_eliminar.innerHTML = "ELIMINAR";
    boton_eliminar.addEventListener("click", borrarProductoCarrito);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaAlerta);

    caja_alerta.appendChild(h2);

    caja_botones.appendChild(boton_eliminar);
    caja_botones.appendChild(boton_cancelar);
    caja_alerta.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_alerta);
    document.body.appendChild(div_bloqueo);
}

function borrarProductoCarrito() {
    let id_producto = this.parentNode.parentNode.getAttribute("id");

    let producto = document.getElementById(id_producto);
    let hr = producto.nextSibling;
    let caja_alerta = this.parentNode.parentNode;  
    let div_bloqueo = document.getElementById("div_bloqueo");

    let url = "./borrar_producto_carrito.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id_producto=" + id_producto
    }

   fetch(url, param)
        .then (function (respuesa) {
            return respuesa.text();
        }) 
        .then (function (datos) {
            if (datos == "TRUE") {
                hr.remove()
                producto.remove();
                caja_alerta.remove();
                div_bloqueo.remove();
                precio_total_carrito();
            } else {
                let mensaje = "Ha ocurrido un error al borrar el producto";
                alertaErrores(mensaje);
            }
        })
}

function cerrarCajaAlerta() {
    this.parentNode.parentNode.parentNode.remove();
}

function precio_total_carrito() {
    let url = "./cargar_precio_total_carrito.php";

    fetch(url)
        .then(function (respuesa) {
            return respuesa.json();
        })
        .then(function (datos) {
            let h2 = document.getElementById("total_carrito");
            if (datos != 0) {
                let suma = 0;
                
                for (let dato of datos) {
                    suma = suma + (dato[0] * dato[1]);
                }
                h2.innerHTML = suma.toFixed(2) + "€";
            } else {
                h2.innerHTML = "00.00€";
            }
        })
}

let boton_comprar = document.getElementById("comprar");
boton_comprar.addEventListener("click", realizar_compra);

function realizar_compra() {
    let url = "./realizar_compra.php";

    fetch(url)
        .then(function (respuesa) {
            return respuesa.text();
        })
        .then(function (datos) {
            if (datos == "TRUE") {
                alertaCompra();
            } else {
                let mensaje = "Ha ocurrido un error al realizar la compra";
                alertaErrores(mensaje);
            }
        })
}

function alertaCompra() {
    document.body.setAttribute("onKeyDown", "return false");
    
    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");

    let caja_alerta = document.createElement("div");
    caja_alerta.setAttribute("class", "caja_alerta");
    
    let h2 = document.createElement("h2");
    h2.innerHTML = "¡Tu compra se ha realizado con éxito!";

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_continuar = document.createElement("button");
    boton_continuar.setAttribute("type", "submit");
    boton_continuar.setAttribute("id", "boton_continuar");
    boton_continuar.innerHTML = "CONTINUAR";
    boton_continuar.addEventListener("click", cerrarCajaAlertaCompra);

    caja_alerta.appendChild(h2);

    caja_botones.appendChild(boton_continuar);
    caja_alerta.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_alerta);
    document.body.appendChild(div_bloqueo);
}

function cerrarCajaAlertaCompra() {
    window.location.reload();
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