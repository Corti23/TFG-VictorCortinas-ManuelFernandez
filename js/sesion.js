let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");

var perfil = document.getElementById("perfil");	

menu.onclick = function () {
    this.classList.toggle("lista");
};

perfil.onclick = function(e) {
    e.preventDefault();
    window.location.href = "perfil.php";
}

var inicio_sesion = document.getElementById("iniciar_sesion");
var registro = document.getElementById("registrarse");
var cerrar_sesion = document.getElementById("cerrar_sesion");
var carrito = document.getElementById("divCarrito");

var formulario_inicio = document.getElementById("formulario_inicio");
var formulario_registro = document.getElementById("formulario_registro");

inicio_sesion.onclick = function () {
    this.classList.toggle("inicio_sesion");
};

registro.onclick = function () {
    this.classList.toggle("registro");
};

let boton_login = document.getElementById("entrar");

boton_login.onclick = login;

function login(){	
    let nombre_usuario = document.getElementById("nombre_usuario");
    
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
                document.getElementById("usuario").classList.add("noCoinciden");
                document.getElementById("clave").classList.add("noCoinciden");
            } else {
                inicio_sesion.style.display = "none";
                registro.style.display = "none";
                formulario_inicio.style.display = "none";
                perfil.style.display = "block";
                cerrar_sesion.style.display = "block"; 
                carrito.style.display = "block";
                nombre_usuario.style.display = "block";
                nombre_usuario.innerHTML = datos; 
            }
        })
    return false;
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
                })
        } else {
            document.getElementById("clave_registro").classList.add("noCoinciden");
            document.getElementById("clave_confirma").classList.add("noCoinciden");
        }
    } else {
        alert("ERROR, hay campos en blanco!")
    }
}

cargarServicios();

function cargarServicios() {
    let servicio1 = document.getElementById("servicio1");
    let ul1 = servicio1.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;

    let servicio2 = document.getElementById("servicio2");
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
                if (dato[0] <= 3) {
                    let li = document.createElement("li");
                    li.innerHTML = dato[1] + ": " + dato[2] + "€";
                    ul1.appendChild(li);
                } else if (dato[0] > 3 && dato[0] <= 6) {
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

carrito.onclick = function(e) {
    e.preventDefault();
    window.location.href = "carrito_personal.php";
}

let cita = document.getElementById("pedir_cita");
let pedir_cita_sticky = document.getElementById("pedir_cita_sticky");

cita.onclick = reservarCita;
pedir_cita_sticky.onclick = reservarCita;

function reservarCita(e) {
    e.preventDefault();
    window.location.href = "pedir_cita.php";
}

let articulos = document.getElementById("articulo");
articulos.addEventListener("click",  añadirAlCarrito);

function añadirAlCarrito(e) {
    e.preventDefault();    

    let img = this.children[0].src;
    let titulo = this.children[1].innerHTML;
    let precio = this.children[2].innerHTML;
    let descripcion = this.children[3].innerHTML;

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
    estado.innerHTML = "Disponible";

    let descripcion_caja = document.createElement("p");
    descripcion_caja.setAttribute("class", "descripcion");
    descripcion_caja.innerHTML = descripcion;

    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_añadir = document.createElement("button");
    boton_añadir.setAttribute("type", "submit");
    boton_añadir.setAttribute("id", "boton_añadir");
    boton_añadir.innerHTML = "AÑADIR";

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

    caja_botones.appendChild(boton_añadir);
    caja_botones.appendChild(boton_cancelar);
    caja_producto.appendChild(caja_botones);

    document.body.appendChild(caja_producto);
}

function cerrarCajaAñadir() {
    this.parentNode.parentNode.remove();
}
 
cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}