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
    <title>Carrito Personal</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/carrito.css">
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
        <h1>Carrito de compra</h1>
        <div id="titulos">
                <h3 class="producto">Producto</h3>
                <h3>Estado</h3>
                <h3>Precio</h3>
                <h3>Cantidad</h3>
                <h3>Total</h3>
        </div>
        <hr id="hr_titulos">

        <div id="caja_carrito"></div>

        <div id="caja_comprar">
            <h1>Total:</h1>
            <h2 id="total_carrito"></h2>            
        </div>
        <hr id="hr_comprar">
        <button type="submit" id="comprar">COMPRAR</button>
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
    <script src="js/carrito.js"></script>
</body>
</html>