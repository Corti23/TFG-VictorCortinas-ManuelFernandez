let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");
let perfil = document.getElementById("perfil");

var contacto = document.getElementById("contacto");
var ayuda = document.getElementById("ayuda");
var cerrar_sesion = document.getElementById("cerrar_sesion");
var carrito = document.getElementById("divCarrito");

perfil.style.display = "block";
cerrar_sesion.style.display = "block";

menu.onclick = function () {
    this.classList.toggle("lista");
};

perfil.onclick = function(e) {
    e.preventDefault();
    window.location.href = "perfil.php";
}

contacto.onclick = function(e) {
    e.preventDefault();
    window.location.href = "contacto.php";
}

ayuda.onclick = function(e) {
    e.preventDefault();
    window.location.href = "ayuda.php";
}

carrito.onclick = function(e) {
    e.preventDefault();
    window.location.href = "carrito_personal.php";
}

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

cargarServicios();
cargarProductos();
cargarProductosMasVendidos();

function cargarServicios() {
    let servicio1 = document.getElementById("servicio1");
    let categoria1 = servicio1.firstElementChild.nextElementSibling.firstElementChild.innerHTML.toLowerCase();
    let ul1 = servicio1.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;

    let servicio2 = document.getElementById("servicio2");
    let categoria2 = servicio2.firstElementChild.firstElementChild.innerHTML.toLowerCase();
    let ul2 = servicio2.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling;
    
    let servicio3 = document.getElementById("servicio3");
    let ul3 = servicio3.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;

    let url = "./cargar_servicios.php";
   
    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {    
            for (let dato of datos) {
                if (dato[3] == categoria1) {
                    let li = document.createElement("li");
                    li.innerHTML = dato[1] + ": " + dato[2] + "€";
                    ul1.appendChild(li);
                } else if (dato[3] == categoria2) {
                    let li = document.createElement("li");
                    li.innerHTML = dato[1] + ": " + dato[2] + "€";
                    ul2.appendChild(li);
                } else {
                    let li = document.createElement("li");
                    li.innerHTML = dato[1] + ": " + dato[2] + "€";
                    ul3.appendChild(li);
                }
            }
        })
}

let cita = document.getElementById("pedir_cita");
let pedir_cita_sticky = document.getElementById("pedir_cita_sticky");

cita.onclick = reservarCita;
pedir_cita_sticky.onclick = reservarCita;

function reservarCita(e) {
    e.preventDefault();
    window.location.href = "pedir_cita.php";
}

function cargarProductosMasVendidos() {
    let mas_vendidos = document.getElementById("mas_vendidos");

    let url = "./cargar_productos_mas_vendidos.php";
   
    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {  
            for (let dato of datos) {
                let div = document.createElement("div");
                div.setAttribute("class", "articulos");
                div.setAttribute("id", dato[0]);

                let img = document.createElement("img");
                img.setAttribute("src", dato[3]);
                img.setAttribute("class", "img_articulos");
                
                let h3 = document.createElement("h3");
                h3.innerHTML = dato[2];

                let h4 = document.createElement("h4");
                h4.innerHTML = dato[1] + "€";

                let boton_añadir = document.createElement("button");
                boton_añadir.setAttribute("type", "submit");
                boton_añadir.setAttribute("id", "boton_añadir");
                boton_añadir.innerHTML = "AÑADIR";
                boton_añadir.addEventListener("click",  añadirAlCarrito);

                div.appendChild(img);
                div.appendChild(h3);
                div.appendChild(h4);
                div.appendChild(boton_añadir);

                mas_vendidos.appendChild(div);
            }
        })
}

function cargarProductos() {
    let articulos = document.getElementById("articulos");

    let url = "./cargar_productos.php";
   
    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {  
            for (let dato of datos) {
                let div = document.createElement("div");
                div.setAttribute("class", "articulos");
                div.setAttribute("id", dato[0]);

                let img = document.createElement("img");
                img.setAttribute("src", dato[3]);
                img.setAttribute("class", "img_articulos");
                
                let h3 = document.createElement("h3");
                h3.innerHTML = dato[2];

                let h4 = document.createElement("h4");
                h4.innerHTML = dato[1] + "€";

                let boton_añadir = document.createElement("button");
                boton_añadir.setAttribute("type", "submit");
                boton_añadir.setAttribute("id", "boton_añadir");
                boton_añadir.innerHTML = "AÑADIR";
                boton_añadir.addEventListener("click",  añadirAlCarrito);

                div.appendChild(img);
                div.appendChild(h3);
                div.appendChild(h4);
                div.appendChild(boton_añadir);

                articulos.appendChild(div);
            }
        })
}

function añadirAlCarrito(e) {
    e.preventDefault();   
    
    let id_producto = this.parentNode.getAttribute("id");
    
    let url = "./cargar_stock.php";
    let param = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id_producto=" + id_producto
    }

    fetch(url, param)
        .then(function(respuesa) {
            return respuesa.text();
        })
        .then(function(datos) {
            if (datos != "FALSE") {
                estado.innerHTML = "Disponible";
                cantidad.setAttribute("max", datos);
            } else {
                estado.innerHTML = "Agotado";
                cantidad.setAttribute("disabled", "");
            }
        })

    let url2 = "./cargar_descripcion.php";
    let param2 = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "id_producto=" + id_producto
    }

    fetch(url2, param2)
        .then(function(respuesa) {
            return respuesa.text();
        })
        .then(function(datos) {
            descripcion_caja.innerHTML = datos;
        })

    let img = this.parentNode.children[0].src;
    let titulo = this.parentNode.children[1].innerHTML;
    let precio = this.parentNode.children[2].innerHTML;

    document.body.setAttribute("onKeyDown", "return false");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");

    let caja_producto = document.createElement("div");
    caja_producto.setAttribute("class", "caja_producto");
    caja_producto.setAttribute("id", id_producto);

    let caja_superior = document.createElement("div");
    caja_superior.setAttribute("class", "caja_superior");

    let caja_img = document.createElement("div");
    caja_img.setAttribute("class", "caja_img");

    let img_caja = document.createElement("img");
    img_caja.setAttribute("src", img);
    img_caja.setAttribute("class", "img_caja");

    let caja_datos = document.createElement("div");
    caja_datos.setAttribute("class", "caja_datos");

    let titulo_caja = document.createElement("h2");
    titulo_caja.innerHTML = titulo;

    let precio_caja = document.createElement("h3");
    precio_caja.innerHTML = precio;

    let estado = document.createElement("h4");

    let cantidad = document.createElement("input");
    cantidad.setAttribute("type", "number");
    cantidad.setAttribute("name", "cantidad");
    cantidad.setAttribute("id", "cantidad");
    cantidad.setAttribute("min", "1");
    cantidad.setAttribute("onKeyDown", "return false");
    cantidad.setAttribute("placeholder", "---");

    let descripcion_caja = document.createElement("p");
    descripcion_caja.setAttribute("class", "descripcion");

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_confirmar");
    boton_confirmar.innerHTML = "CONFIRMAR";
    boton_confirmar.addEventListener("click", guardarEnCarrito);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaAñadir);


    caja_img.appendChild(img_caja);
    caja_superior.appendChild(caja_img);

    caja_datos.appendChild(titulo_caja);
    caja_datos.appendChild(precio_caja)
    caja_datos.appendChild(estado);
    caja_datos.appendChild(cantidad);
    caja_superior.appendChild(caja_datos);

    caja_producto.appendChild(caja_superior);

    caja_producto.appendChild(descripcion_caja);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_producto.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_producto);
    document.body.appendChild(div_bloqueo);
}

function guardarEnCarrito(e) {
    e.preventDefault();
    
    let estado = this.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[2];
    let cantidad = this.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[3];
    
    if (estado.innerHTML == "Disponible") {
        if (cantidad.value >= 1) {
            let id_producto = this.parentNode.parentNode.getAttribute("id");
            let cantidad_producto = cantidad.value;
           
            let url = "./insertar_productos_carrito.php";
            let param = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body : "id_producto=" + id_producto + "&cantidad_producto=" + cantidad_producto
            }

            fetch(url, param)
                .then(function(respuesa) {
                    return respuesa.text();
                })
                .then(function(datos) {
                    if (datos == "TRUE") {
                        document.getElementById("div_bloqueo").remove();
                    } else {
                        let mensaje = "Ha ocurrido un error al cancelar la cita";
                        alertaErrores(mensaje);
                    }
                })
        } else {
            let mensaje = "Introduzca la cantidad del producto que desee";
            alertaErrores(mensaje);
        }
    } else {
        let mensaje = "Este producto está agotado";
        alertaErrores(mensaje);
    }
}

function cerrarCajaAñadir() {
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