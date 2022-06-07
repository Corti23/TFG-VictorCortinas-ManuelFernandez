<?php
    require 'bd.php';
	require_once 'sesiones.php';
	comprobar_sesion();

    if (!comprobar_token()) {
        header("Location: index.php");
        return "Ha expirado la sesión.";
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Peluqería JavaSytle</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/ayuda.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <header>
        <img src="./img/logo.png" id="logo" title="Logo">

        <div id="botones">
            <div id="divMenu">
                <img src="./img/menu.png" id="menu" title="Menú">

                <div id="lista">
                    <li><a id="perfil">Perfil</a></li>
                    <li><a id="carrito">Carrito</a></li>
                    <li><a id="pedir_cita">Pedir Cita</a></li>
                    <li><a id="contacto">Contacto</a></li>
                    <li><a id="cerrar_sesion">Cerrar Sesión</a></li>
                </div>
            </div>
            
            <div id="divHome">
                <i id="home" class="fas fa-home"></i>
            </div>
            <?php require_once "cabecera.php";?>
        </div>
    </header>

    <section>
        <div class="caja_general">
            <div class="titulo">
                <h1>PREGUNTAS Y DUDAS FRECUENTES:</h1>
            </div>
            <div class="caja_pregunta">
                <div class="pregunta">
                    <h1>¿Cuándo puedo comprar productos en la página web?</h1>
                </div>
                <div class="respuesta">
                    <p>Una vez te hayas registrado e inicies sesión estarán disponibles todos los productos y servicios</p>
                </div>
            </div>
            <div class="caja_pregunta">
                <div class="pregunta">
                    <h1>¿Puedo elegir el peluquero?</h1>
                </div>
                <div class="respuesta">
                    <p>Si, los peluqueros se pueden seleccionar una vez hayas agregado la fecha y hora de la cita</p>
                </div>
            </div>
            <div class="caja_pregunta">
                <div class="pregunta">
                    <h1>¿Donde os localizais?</h1>
                </div>
                <div class="respuesta">
                    <p>Nos localizamos en: Calle Luis Sauquillo, 88, 28944 Fuenlabrada, Madrid</p>
                </div>
            </div>
            <div class="caja_pregunta">
                <div class="pregunta">
                    <h1>¿Se puede cancelar una cita?</h1>
                </div>
                <div class="respuesta">
                    <p>Si, se puede cancelar en tu perfil o llamando al teléfono de contacto, siempre con un día de antelación como mínimo</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="contenedor">
        <div id="derechos">© Copyright 2021</div>
        <div id="enlaces"><a href="./contacto.php">Contacto</a> | <a href="#">Aviso Legal</a> | <a href="#">Términos y Condiciones</a></div>
        <div id="redes">
            <a href="https://www.instagram.com/?hl=es"><i class="fab fa-instagram"></i></a>
            <a href="https://es-es.facebook.com/"><i class="fab fa-facebook"></i></a>
            <a href="https://twitter.com/?lang=es"><i class="fab fa-twitter"></i></a>
            <a href="https://www.google.com/intl/es/gmail/about/"><i class="far fa-envelope"></i></a>
        </div>
    </footer>
    <script src="js/ayuda.js"></script>
</body>
</html>