<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/inicio_sesion.css">
    <link rel="stylesheet" href="css/menu.css">
</head>
<body id="principio">
    <header>
        <img src="./img/logo.png" id="logo" title="Logo">
    </header>
 
    <section>
        <p id="titulo_inicio_sesion">Iniciar sesión en Peluquería JavaStyle</p>
        <form id="formulario_inicio">
            <label for="usuario">Correo:</label>
            <br>
            <input type="email" id="usuario" name="usuario">
            <br>
            <br><br>
            <label for="clave">Contraseña</label>
            <br>
            <input type="password" id="clave" name="clave">
            <br><br>
            <button type="submit" id="entrar">Iniciar Sesión</button>
        </form>
        <div>
            <span>¿No tienes cuenta? <a href="./registrarse.php">Regístrate aquí</a></span>
        </div>
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
    <script src="js/inicio_sesion.js"></script>
</body>
</html>