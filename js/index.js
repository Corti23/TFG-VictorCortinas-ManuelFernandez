let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");

var perfil = document.getElementById("perfil");	
var contacto = document.getElementById("contacto");
var ayuda = document.getElementById("ayuda");

menu.onclick = function () {
    this.classList.toggle("lista");
};

contacto.onclick = function(e) {
    e.preventDefault();
    window.location.href = "contacto_index.php";
}

ayuda.onclick = function(e) {
    e.preventDefault();
    window.location.href = "ayuda_index.php";
}

let iniciar_sesion = document.getElementById("iniciar_sesion");
let registrarse = document.getElementById("registrarse");
let pedir_cita = document.getElementById("pedir_cita");
let pedir_cita_sticky = document.getElementById("pedir_cita_sticky");

iniciar_sesion.onclick = function (e) {
    e.preventDefault();
    window.location.href = "iniciar_sesion.php";
};

registrarse.onclick = function (e) {
    e.preventDefault();
    window.location.href = "registrarse.php";
};

pedir_cita.onclick = function (e) {
    e.preventDefault();
    window.location.href = "iniciar_sesion.php";
};

pedir_cita_sticky.onclick = function (e) {
    e.preventDefault();
    window.location.href = "iniciar_sesion.php";
};

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
            if (datos) {
                estado.innerHTML = "Disponible";
            } else {
                estado.innerHTML = "Agotado";
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

    let descripcion_caja = document.createElement("p");
    descripcion_caja.setAttribute("class", "descripcion");

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_confirmar = document.createElement("button");
    boton_confirmar.setAttribute("type", "submit");
    boton_confirmar.setAttribute("id", "boton_confirmar");
    boton_confirmar.innerHTML = "CONFIRMAR";
    boton_confirmar.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.href = "iniciar_sesion.php";
    });

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
    caja_superior.appendChild(caja_datos);

    caja_producto.appendChild(caja_superior);

    caja_producto.appendChild(descripcion_caja);

    caja_botones.appendChild(boton_confirmar);
    caja_botones.appendChild(boton_cancelar);
    caja_producto.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_producto);
    document.body.appendChild(div_bloqueo);
}

function cerrarCajaAñadir() {
    this.parentNode.parentNode.parentNode.remove();
}