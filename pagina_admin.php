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
    <link rel="stylesheet" href="css/pagina_admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body id="principio">
    <header>
        <img src="./img/logo.png" id="logo" title="Logo">

        <div id="cerrar_sesion_nombre">
            <button id="cerrar_sesion">Cerrar Sesión</button>
            <?php require_once "cabecera.php";?>
        </div>
    </header>

    <section id="principal">
        <div id="ventanas">
            <button id="reservas">Reservas</button>
            <button id="pedidos">Pedidos</button>
            <button id="usuarios">Usuarios</button>
            <button id="empleados">Empleados</button>
            <button id="productos">Productos</button>
            <button id="servicios">Servicios</button>
            <button id="ingresos">Ingresos</button>
        </div>
        <div id="caja_principal">
            
        </div>
    </section>
    
    <footer class="contenedor">
        <div id="derechos">© Copyright 2021</div>
        <div id="enlaces">PELUQUERÍA JAVASTYLE</div>
        <div id="redes">
            <a href="https://www.instagram.com/?hl=es"><i class="fab fa-instagram"></i></a>
            <a href="https://es-es.facebook.com/"><i class="fab fa-facebook"></i></a>
            <a href="https://twitter.com/?lang=es"><i class="fab fa-twitter"></i></a>
            <a href="https://www.google.com/intl/es/gmail/about/"><i class="far fa-envelope"></i></a>
        </div>
    </footer>
    <script src="js/pagina_admin.js"></script>
</body>
</html>