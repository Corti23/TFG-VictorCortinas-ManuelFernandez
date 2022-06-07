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
<head>
    <meta charset="UTF-8">
    <title>Peluqería JavaSytle</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/contacto.css">
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
        <div class="caja_general">
            <div class="div1">
                <h1>Contáctanos</h1>
                <h3>Consulta tus preguntas o dudas rellenando este formulario</h3>
                <form action="">
                    <label for="nombre">Nombre:</label>
                    <br>
                    <input type="text" id="input_nombre" class="input">
                    <br><br>
                    <label for="apellidos">Apellidos:</label>
                    <br>
                    <input type="text" id="input_apellidos" class="input">
                    <br><br>
                    <label for="correo">Correo electrónico:</label>
                    <br>
                    <input type="text" id="input_correo" class="input">
                    <br><br>
                    <label for="mensaje">Introduce tu mensaje:</label>
                    <br>
                    <textarea name="mensaje" id="mensaje"></textarea>
                    <br><br>
                    <input type="submit" id="enviar">
                </form>
            </div>

            <div class="div2">
                <div class="contacto_empresa">
                    <div>
                        <i class="fas fa-mobile-alt imagen_contactos"></i>
                        <p class="movil_peluqueria">+34 693 18 23 17</p>
                    </div>
                    <div>
                        <i class="fas fa-phone-alt imagen_fijo"></i>
                        <p class="fijo_peluqueria">915 819 690</p>
                    </div>
                    <div>
                        <i class="far fa-envelope imagen_contactos"></i>
                        <p class="correo_peluqueria">peluqueriajavastyle@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        
    <footer class="contenedor">
        <div id="derechos">© Copyright 2021</div>
        <div id="enlaces"><a href="./ayuda.php">Ayuda</a> | <a href="#">Aviso Legal</a> | <a href="#">Términos y Condiciones</a></div>
        <div id="redes">
            <a href="https://www.instagram.com/?hl=es"><i class="fab fa-instagram"></i></a>
            <a href="https://es-es.facebook.com/"><i class="fab fa-facebook"></i></a>
            <a href="https://twitter.com/?lang=es"><i class="fab fa-twitter"></i></a>
            <a href="https://www.google.com/intl/es/gmail/about/"><i class="far fa-envelope"></i></a>
        </div>
    </footer>
    <script src="js/contacto.js"></script>
</body>
</html>