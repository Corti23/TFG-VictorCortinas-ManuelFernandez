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
</head>
<body>
    <header>
        <img src="./img/logo.png" id="logo" title="Logo">
        <div id="botones">
            <div id="divMenu">
                <img src="./img/menu.png" id="menu" title="Menú">

                <div id="lista">
                    <li><a id="inicio" href="#principio">Inicio</a></li>
                    <li><a id="perfil">Perfil</a></li>
                    <li><a id="pedir_cita">Pedir Cita</a></li>
                    <li><a id="contacto">Contacto</a></li>
                    <li><a id="ayuda">Ayuda</a></li>
                    <li><a id="cerrar_sesion">Cerrar Sesión</a></li>
                </div>
            </div>
            
            <div id="divHome">
                <img src="./img/home.png" id="home" title="Home">
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

        <div id="caja_carrito">
            <div class="productos">
                <div class="producto">
                    <img src="./img/peine.png" class="img_articulos" title="Peine">   
                    <h4>Peine 2080 negro</h4>
                </div>
                <div class="estado">
                    <h4>Disponible</h4>
                </div>
                <div class="precio">
                    <h4>12,95€</h4>
                </div>
                <div class="cantidad">
                    <input type="number" name="cantidad" id="cantidad" min="1" placeholder="1">
                </div>
                <div class="total">
                    <h4>12,95€</h4>
                </div>
                <h4 id="borrar">❌</h4>
            </div>
            <hr>
            <div class="productos">
                <div class="producto">
                    <img src="./img/peine.png" class="img_articulos" title="Peine">   
                    <h4>Peine 2080 negro</h4>
                </div>
                <div class="estado">
                    <h4>Agotado</h4>
                </div>
                <div class="precio">
                    <h4>12,95€</h4>
                </div>
                <div class="cantidad">
                    <input type="number" name="cantidad" id="cantidad" min="1" placeholder="1">
                </div>
                <div class="total">
                    <h4>12,95€</h4>
                </div>
                <h4 id="borrar">❌</h4>
            </div>
            <hr>
            <div class="productos">
                <div class="producto">
                    <img src="./img/peine.png" class="img_articulos" title="Peine">   
                    <h4>Peine 2080 negro</h4>
                </div>
                <div class="estado">
                    <h4>Disponible</h4>
                </div>
                <div class="precio">
                    <h4>12,95€</h4>
                </div>
                <div class="cantidad">
                    <input type="number" name="cantidad" id="cantidad" min="1" placeholder="1">
                </div>
                <div class="total">
                    <h4>12,95€</h4>
                </div>
                <h4 id="borrar">❌</h4>
            </div>
            <hr>
            <div class="productos">
                <div class="producto">
                    <img src="./img/peine.png" class="img_articulos" title="Peine">   
                    <h4>Peine 2080 negro</h4>
                </div>
                <div class="estado">
                    <h4>Agotado</h4>
                </div>
                <div class="precio">
                    <h4>12,95€</h4>
                </div>
                <div class="cantidad">
                    <input type="number" name="cantidad" id="cantidad" min="1" placeholder="1">
                </div>
                <div class="total">
                    <h4>12,95€</h4>
                </div>
                <h4 id="borrar">❌</h4>
            </div>
            <hr>
            <div class="productos">
                <div class="producto">
                    <img src="./img/peine.png" class="img_articulos" title="Peine">   
                    <h4>Peine 2080 negro</h4>
                </div>
                <div class="estado">
                    <h4>Disponible</h4>
                </div>
                <div class="precio">
                    <h4>12,95€</h4>
                </div>
                <div class="cantidad">
                    <input type="number" name="cantidad" id="cantidad" min="1" placeholder="1">
                </div>
                <div class="total">
                    <h4>12,95€</h4>
                </div>
                <h4 id="borrar">❌</h4>
            </div>
            <hr>
        </div>

        <div id="caja_comprar">
            <h1>Total:</h1>
            <h2>64,75€</h2>            
        </div>
        <hr id="hr_comprar">
        <button type="submit" id="comprar">COMPRAR</button>
    </section>

    <footer class="contenedor">
        <div id="derechos">© Copyright 2021</div>
        <div id="enlaces"><a href="#">Contacto</a> | <a href="#">Aviso Legal</a> | <a href="#">Términos y Condiciones</a></div>
        <div id="redes">
            <a href="https://www.instagram.com/?hl=es"><img src="./img/Instagram_blanco.png" title="Instagram" id="insta"></a>
            <a href="https://es-es.facebook.com/"><img src="./img/Facebook_blanco.png" title="Facebook" id="facebook"></a>
            <a href="https://twitter.com/?lang=es"><img src="./img/Twitter_blanco.png" title="Twitter" id="twitter"></a>
            <a href="https://www.google.com/intl/es/gmail/about/"><img src="./img/Gmail_blanco.png" title="Gmail" id="gmail"></a>
        </div>
    </footer>
    <script src="js/carrito.js"></script>
</body>
</html>