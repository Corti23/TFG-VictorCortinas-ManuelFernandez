let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");

var home = document.getElementById("divHome");
var pedir_cita = document.getElementById("pedir_cita");
var carrito = document.getElementById("carrito");
var cerrar_sesion = document.getElementById("cerrar_sesion");

cerrar_sesion.style.display = "block";

menu.onclick = function () {
    this.classList.toggle("lista");
};

home.onclick = function(e) {
    e.preventDefault();
    window.location.href = "index.php";
}

pedir_cita.onclick = function(e) {
    e.preventDefault();
    window.location.href = "pedir_cita.php";
}

carrito.onclick = function(e) {
    e.preventDefault();
    window.location.href = "carrito_personal.php";
}

cerrar_sesion.onclick = function(e) {
    e.preventDefault();
    window.location.href = "cerrar_sesion.php";
}

cargarDatosUsuario();
cargarReservasUsuario();

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
            console.log(datos)
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

                caja_reservas.appendChild(reservas);
                caja_reservas.appendChild(hr);
            }
        })
}