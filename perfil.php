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
    <title>Perfil</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/perfil.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <header>
        <img src="./img/logo.png" id="logo" title="Logo">
        <div id="botones">
            <div id="divMenu">
                <img src="./img/menu.png" id="menu" title="Menú">

                <div id="lista">
                    <li><a id="carrito">Carrito</a></li>
                    <li><a id="pedir_cita">Pedir Cita</a></li>
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
        <h1>Perfil</h1>
        <div id="caja_datos">
            <div class="datos">
                <h4>Nombre:</h4>
                <h5 id="nombre"></h5>
            </div>
            <div class="datos">
                <h4>Correo:</h4>
                <h5 id="correo"></h5>
            </div>
            <div class="datos">
                <h4>Dirección:</h4>
                <h5 id="direccion"></h5>
            </div>
        </div>

        <div id="modificar_datos">
            <button id="boton_modificar" type="submit">Modificar datos</button>
        </div>

        <div class="titulos">
            <h2>Historial de reservas</h2>
            <h2>Historial de compras</h2>
        </div>

        <div id="caja_titulos">
            <div class="titulos">
                <h3 class="producto">Servicio</h3>
                <h3>Precio</h3>
                <h3>Fecha</h3>
                <h3>Hora</h3>
            </div>

            <div class="titulos">
                <h3 class="producto">Producto</h3>
                <h3>Cantidad</h3>
                <h3>Precio</h3>
                <h3>Fecha</h3>
            </div>
        </div>       

        <div id="caja_historial">
            <div id="caja_reservas"></div>

            <div id="caja_compras"></div>
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
    <script src="js/perfil.js"></script>
</body>
</html>