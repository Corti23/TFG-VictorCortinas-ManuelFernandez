<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registrarse</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/registro.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
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
                <input type="text" id="nombre" name="nombre" pattern="^[A-Za-z]+$" required>
                <br><br>
                <label for="correo">Correo:</label>
                <br><br>
                <input type="email" id="correo" name="correo" required>
                <span id="info_correo"></span>
                <br><br>
                <label for="clave_registro">Establecer contraseña:</label>
                <br><br>
                <input type="password" id="clave_registro" name="clave_registro" minlength="6" maxlength="8" required>
                <div id="info_clave1">La contraseña debe tener entre 6 y 8 caracteres, un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.</div>
            </div>

            <div>
                <label for="apellidos">Apellidos:</label>
                <br><br>
                <input type="text" id="apellidos" name="apellidos" pattern="^[A-Za-z]+$" required>
                <br><br>
                <label for="direccion">Direccón:</label>
                <br><br>
                <input type="text" id="direccion" name="direccion" required>
                <br><br>
                <label for="clave_confirma">Repetir contraseña:</label>
                <br><br>
                <input type="password" id="clave_confirma" name="clave_confirma" minlength="6" maxlength="8" required>
                <div id="info_clave2">La contraseña debe tener entre 6 y 8 caracteres, un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.</div>
            </div>
            <button type="submit" id="registrar">Registrarse</button>
        </form>
        <div>
            <span>¿Ya tienes cuenta? <a href="./iniciar_sesion.php">Iniciar sesión</a></span>
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
    <script src="js/registro.js"></script>
</body>
</html>