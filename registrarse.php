<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registrarse</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/registro.css">
    <link rel="stylesheet" href="css/menu.css">
</head>
<body id="principio">
    <header>
        <img src="./img/logo.png" id="logo" title="Logo">
    </header>
 
    <section>
        <p id="titulo_registro">Registrarse en Peluquería JavaStyle</p>
        <form id="formulario_registro"> 
            <div>
                <label for="nombre">Nombre:</label>
                <br><br>
                <input type="text" id="nombre" name="nombre" required>
                <br><br>
                <label for="correo">Correo:</label>
                <br><br>
                <input type="email" id="correo" name="correo" required>
                <br><br>
                <label for="clave_registro">Establecer contraseña:</label>
                <br><br>
                <input type="password" id="clave_registro" name="clave_registro" maxlength="8" required>
            </div>

            <div>
                <label for="apellidos">Apellidos:</label>
                <br><br>
                <input type="text" id="apellidos" name="apellidos" required>
                <br><br>
                <label for="direccion">Direccón:</label>
                <br><br>
                <input type="text" id="direccion" name="direccion" required>
                <br><br>
                <label for="clave_confirma">Repetir contraseña:</label>
                <br><br>
                <input type="password" id="clave_confirma" name="clave_confirma" maxlength="8" required>
            </div>
            <button type="submit" id="registrar">Registrarse</button>
        </form>
        <div>
            <span>¿Ya tienes cuenta? <a href="./iniciar_sesion.php">Iniciar sesión</a></span>
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
    <script src="js/registro.js"></script>
</body>
</html>