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
    <title>Reservar cita</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/citas.css">
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
                    <li><a id="contacto">Contacto</a></li>
                    <li><a id="ayuda">Ayuda</a></li>
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
        <h1>Servicios</h1>
        <div id="caja_principal">
            <div id="caja_servicios"></div>

            <div id="caja_empleados">
                <h3>Empleados</h3>
                <div id="empleados"></div>

                <h3>Horario</h3>
                <div id="caja_horario">
                    <div class="dias">
                        <h5>Lunes</h5>
                        <h5>Martes</h5>
                        <h5>Miércoles</h5>
                        <h5>Jueves</h5>
                        <h5>Viernes</h5>
                        <h5>Sábado</h5>
                        <h5>Domingo</h5>
                    </div>
                    <div class="horas">
                        <h5>10:30 - 20:00</h5>
                        <h5>10:30 - 20:00</h5>
                        <h5>10:30 - 20:00</h5>
                        <h5>10:30 - 20:00</h5>
                        <h5>10:30 - 20:00</h5>
                        <h5>09:30 - 14:00</h5>
                        <h5>CERRADO</h5>
                    </div>
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
    <script src="js/citas.js"></script>
</body>
</html>