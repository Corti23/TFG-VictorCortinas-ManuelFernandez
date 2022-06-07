let menu = document.getElementById("divMenu");
let lista = document.getElementsByClassName("lista");
let perfil = document.getElementById("perfil");

var home = document.getElementById("divHome");
var carrito = document.getElementById("carrito");
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

cargarServicios();
cargarEmpleados();

function cargarServicios() {
    let caja_servicios = document.getElementById("caja_servicios");

    let url = "./cargar_servicios.php";
   
    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) { 
            let contador = 0;   
            for (let dato of datos) {
                let hr = document.createElement("hr");

                let servicios = document.createElement("div");
                servicios.setAttribute("class", "servicios");

                let servicio = document.createElement("div");
                servicio.setAttribute("class", "servicio");

                let tipo = document.createElement("h4");
                tipo.setAttribute("id", dato[0]);
                tipo.innerHTML = dato[1];

                let precio = document.createElement("h4");
                precio.innerHTML = dato[2] + "€";

                let boton_reservar = document.createElement("button");
                boton_reservar.setAttribute("type", "submit");
                boton_reservar.setAttribute("id", contador);
                boton_reservar.setAttribute("class", "reservar");
                boton_reservar.innerHTML = "Reservar";
                boton_reservar.onclick = reservarServicio;
                contador++;

                servicio.appendChild(tipo);
                servicios.appendChild(servicio);
                servicios.appendChild(precio);
                servicios.appendChild(boton_reservar);
                caja_servicios.appendChild(servicios);
                caja_servicios.appendChild(hr);
            }
        })
}

function cargarEmpleados() {
    let caja_empleados = document.getElementById("empleados");

    let url = "./cargar_empleados.php";
   
    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {    
            for (let dato of datos) {
                let empleado = document.createElement("div");
                empleado.setAttribute("class", "empleado");

                let img = document.createElement("img");
                img.setAttribute("src", dato[3]);
                img.setAttribute("class", "img_empleados");

                let nombre = document.createElement("h4");
                nombre.setAttribute("id", dato[0]);
                nombre.innerHTML = dato[1] + " " + dato[2];

                empleado.appendChild(img);
                empleado.appendChild(nombre);
                caja_empleados.appendChild(empleado);
            }
        })
}

function reservarServicio(e) {
    e.preventDefault();

    document.body.setAttribute("onKeyDown", "return false");

    let div_bloqueo = document.createElement("div");
    div_bloqueo.setAttribute("id", "div_bloqueo");
    
    let caja_reserva = document.createElement("div");
    caja_reserva.setAttribute("class", "caja_reserva");

    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "titulo");
    titulo.innerHTML = "Elegir fecha y hora";

    let caja_servicios = document.createElement("div");
    caja_servicios.setAttribute("class", "caja_servicios");

    let tipo_servicio = this.previousSibling.previousSibling.childNodes[0];
    let id_servicio = tipo_servicio.getAttribute("id");

    let nombre_servicio = document.createElement("h4");
    nombre_servicio.setAttribute("class", "nombre_servicio");
    nombre_servicio.setAttribute("id", id_servicio); 
    nombre_servicio.innerHTML = tipo_servicio.innerText;

    let precio_servicio = document.createElement("h4");
    precio_servicio.setAttribute("class", "precio_servicio");
    precio_servicio.innerHTML = this.previousSibling.innerHTML;

    var caja_formulario = document.createElement("div");
    caja_formulario.setAttribute("class", "caja_formulario");

    let formulario_reserva = document.createElement("form");
    formulario_reserva.setAttribute("id", "formulario_reserva");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "div1");

    let label_fecha = document.createElement("label");
    label_fecha.setAttribute("for", "fecha");
    label_fecha.setAttribute("class", "label_horario");
    label_fecha.innerHTML = "Selecciona un día:";

    let input_fecha = document.createElement("input");
    input_fecha.setAttribute("class", "input_horario");
    input_fecha.setAttribute("id", "fecha");
    input_fecha.setAttribute("type", "date");
    input_fecha.setAttribute("name", "fecha");
    input_fecha.setAttribute("required", "");
    
    let hoy = validacionDiasCalendario();
    input_fecha.setAttribute("min", hoy);
    input_fecha.addEventListener("input", calcularDiaSemana);

    let label_hora = document.createElement("label");
    label_hora.setAttribute("for", "hora");
    label_hora.setAttribute("class", "label_horario");
    label_hora.innerHTML = "Selecciona una hora:";

    let select_hora = document.createElement("select");
    select_hora.setAttribute("id", "hora");
    select_hora.setAttribute("class", "input_horario");
    select_hora.setAttribute("name", "hora");
    select_hora.setAttribute("required", "");

    let url = "./cargar_empleados.php";
   
    fetch(url)
        .then (function (respuesa) {
            return respuesa.json();
        })
        .then (function (datos) {    
            for (let dato of datos) {
                let input_empleado = document.createElement("input");
                input_empleado.setAttribute("class", "input_horario");
                input_empleado.setAttribute("id", dato[0]);
                input_empleado.setAttribute("type", "radio");
                input_empleado.setAttribute("name", "empleados");
                input_empleado.setAttribute("value", dato[1] + " " + dato[2]);
                input_empleado.setAttribute("required", "");

                let label_empleado = document.createElement("label");
                label_empleado.setAttribute("class", "label_horario");
                label_empleado.setAttribute("for", dato[1] + " " + dato[2]);
                label_empleado.innerHTML = dato[1] + " " + dato[2];

                div1.appendChild(input_empleado);
                div1.appendChild(label_empleado);
            }
        })
    
    let caja_botones = document.createElement("div");
    caja_botones.setAttribute("id", "caja_botones");

    let boton_reservar = document.createElement("button");
    boton_reservar.setAttribute("type", "submit");
    boton_reservar.setAttribute("id", "boton_reservar");
    boton_reservar.innerHTML = "CONFIRMAR";
    boton_reservar.addEventListener("click", realizarReserva);

    let boton_cancelar = document.createElement("button");
    boton_cancelar.setAttribute("type", "submit");
    boton_cancelar.setAttribute("id", "boton_cancelar");
    boton_cancelar.innerHTML = "CANCELAR";
    boton_cancelar.addEventListener("click", cerrarCajaReserva);

    caja_reserva.appendChild(titulo); 
    caja_servicios.appendChild(nombre_servicio);
    caja_servicios.appendChild(precio_servicio);
    caja_reserva.appendChild(caja_servicios); 

    caja_reserva.appendChild(div1);

    caja_formulario.appendChild(label_fecha);
    caja_formulario.appendChild(input_fecha);
    caja_formulario.appendChild(label_hora);
    caja_formulario.appendChild(select_hora);
    caja_reserva.appendChild(caja_formulario);

    caja_botones.appendChild(boton_reservar);
    caja_botones.appendChild(boton_cancelar);
    caja_reserva.appendChild(caja_botones);

    div_bloqueo.appendChild(caja_reserva);
    document.body.appendChild(div_bloqueo);
}

function realizarReserva() {
    let servicio = this.parentNode.parentNode.childNodes[1].childNodes[0].getAttribute("id");
    let precio = this.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML;
    let valor_precio = precio.substring(0, precio.length - 1);
    let empleado = document.querySelector('input[name="empleados"]:checked').getAttribute("id");
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    if (empleado.length != 0 && fecha.length != 0 && hora.length != 0) {       
        let url = "./reservar.php";
        let param = {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : "servicio=" + servicio + "&empleado=" + empleado + "&fecha=" + fecha + "&hora=" + hora + "&precio_servicio=" + valor_precio
        }
        
        fetch(url, param)
            .then (function (respuesta) {
                return respuesta.text();
            })
            .then (function (datos) {
                if (datos === "TRUE") {
                    document.getElementById("div_bloqueo").remove();
                } else {
                    let mensaje = "La cita no está disponible";
                    alertaErrores(mensaje);
                }
            })
    } else {
        let mensaje = "ERROR, rellena los campos en blanco";
        alertaErrores(mensaje);
    }
}

function validacionDiasCalendario() {
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth() + 1; 
    let yyyy = hoy.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    } 
    if(mm < 10) {
        mm = "0" + mm;
    } 

    return hoy = yyyy + "-" + mm + "-" + dd;
}

function calcularDiaSemana(e) {
    e.preventDefault();
    let diaHoy = new Date();
    let fecha = new Date(this.value);
    let dia = fecha.getDay();
    let hora_actual = diaHoy.getHours() + ":" + diaHoy.getMinutes();

    let select = this.nextSibling.nextSibling;

    let fecha_hoy = diaHoy.getFullYear() + "-" + diaHoy.getMonth() + "-" + diaHoy.getDate();
    let fecha_elegida = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate();

    if (fecha_hoy == fecha_elegida) {  
        if (dia != 6 && dia != 0) {
            let contador = 1;

            let array_horas = ["10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
            "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

            for (let i = select.length -1; i >= 0; i--) {
                select.remove(i);
            }

            for (let hora of array_horas) {
                if (hora > hora_actual) {
                    let opcion = document.createElement("option");
                    opcion.setAttribute("value", hora);
                    opcion.setAttribute("id", "opcion" + contador);
                    contador++;
                    opcion.innerHTML = hora;
                    select.appendChild(opcion);
                }
            }
        } else if (dia == 6) {
            let contador = 1;

            let array_horas = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

            for (let i = select.length -1; i >= 0; i--) {
                select.remove(i);
            }

            for (let hora of array_horas) {
                if (hora > hora_actual) {
                    let opcion = document.createElement("option");
                    opcion.setAttribute("value", hora);
                    opcion.setAttribute("id", "opcion" + contador);
                    contador++;
                    opcion.innerHTML = hora;
                    select.appendChild(opcion);
                } 
            }
        }else {
            for (let i = select.length -1; i >= 0; i--) {
                select.remove(i);
            }
        }      
    } else {
        if (dia != 6 && dia != 0) {
            let contador = 1;

            let array_horas = ["10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
            "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

            for (let i = select.length -1; i >= 0; i--) {
                select.remove(i);
            }

            for (let hora of array_horas) {      
                let opcion = document.createElement("option");
                opcion.setAttribute("value", hora);
                opcion.setAttribute("id", "opcion" + contador);
                contador++;
                opcion.innerHTML = hora;
                select.appendChild(opcion);
            }
        } else if (dia == 6) {
            let contador = 1;

            let array_horas = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

            for (let i = select.length -1; i >= 0; i--) {
                select.remove(i);
            }

            for (let hora of array_horas) {
                let opcion = document.createElement("option");
                opcion.setAttribute("value", hora);
                opcion.setAttribute("id", "opcion" + contador);
                contador++;
                opcion.innerHTML = hora;
                select.appendChild(opcion);
            }
        } else {
            for (let i = select.length -1; i >= 0; i--) {
                select.remove(i);
            }
        }
    }
}

function cerrarCajaReserva() {
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