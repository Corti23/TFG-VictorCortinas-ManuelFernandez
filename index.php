<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Peluqería JavaSytle</title>
    <link rel="shortcut icon" href="./img/logo.png">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/menu.css">
</head>
<body id="inicio">
    <header>
        <img src="./img/logo.png" id="logo" title="Logo">

        <div id="botones_login">
            <div id="divMenu">
                <img src="./img/menu.png" id="menu" title="Menú">
                <div id="lista">
                    <li><a id="inicio" href="#inicio">Inicio</a></li>
                    <li><a id="citas">Pedir cita</a></li>
                    <li><a id="tienda">Tienda</a></li>
                    <li><a id="contacto">Contacto</a></li>
                    <li><a id="ayuda">Ayuda</a></li>
                </div>
            </div>

            <button id="iniciar_sesion">Inicia sesión</button>
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

            <button id="registrarse">Regístrate</button>
            <form id="formulario_registro"> 
                <label for="nombre">Nombre:</label>
                <br>
                <input type="text" id="nombre" name="nombre" required>
                <br><br>
                <label for="apellidos">Apellidos:</label>
                <br>
                <input type="text" id="apellidos" name="apellidos" required>
                <br><br>
                <label for="correo">Correo:</label>
                <br>
                <input type="email" id="correo" name="correo" required>
                <br><br>
                <label for="clave_registro">Establecer contraseña:</label>
                <br>
                <input type="text" id="clave_registro" name="clave_registro" maxlength="8" required>
                <div id="noCoinciden" class="ocultar">
                    Las Contraseñas no coinciden, vuelve a intentarlo!
                </div>
                <div id="coinciden" class="ocultar">
                    Las Contraseñas coinciden!
                </div>
                <br><br>
                <label for="clave_confirma">Repetir contraseña:</label>
                <br>
                <input type="text" id="clave_confirma" name="clave_confirma" maxlength="8" required>
                <br><br>
                <button type="submit" id="registrar">Registrarse</button>
            </form>
            
            <button id="cerrar_sesion">Cerrar Sesión</button>
        </div>
    </header>

    <img src="./img/foto_peluqueria.jpg" title="Peluquería JavaStyle" id="foto_peluqueria">

    <section id="principal">
        <h1>QUIENES SOMOS</h1>       
            <p>
               En JavaStyle disponemos de las más novedosas técnicas que existen en el mercado asesorándote para encontrar tu imagen, aconsejándote en cortes, peinados, colores, etc,
               para resolver así todas las dudas que puedas tener. Nuestros clientes abarcan todas las edades y es unisex.
            </p> 
        
        <h1>INSTALACIONES</h1> 
            <div class="slider">
			    <ul>
				    <li>
                        <img src="./img/fachada.jpg" title="Fachada">
                    </li>
				    <li>
                        <img src="./img/trabajo.jpg" title="Zona de trabajo">
                    </li>
				    <li>
                        <img src="./img/duchas.jpg" title="Zona de ducha">
                    </li>
                    <li>
                        <img src="./img/recepcion.jpg" title="Zona de atención al cliente">
                    </li>
			    </ul>
		    </div>    
            <p>
               En JavaStyle disponemos de las más novedosas técnicas que existen en el mercado asesorándote para encontrar tu imagen, aconsejándote en cortes, peinados, colores, etc,
               para resolver así todas las dudas que puedas tener. Nuestros clientes abarcan todas las edades y es unisex.
            </p>

        <h1>SERVICIOS</h1>       
            <div class="servicios" id="servicio1">
                <img src="./img/corte.jpg" title="Corte de pelo" class="foto_servicio">
                <span class="texto">
                    <h3>Cortes de pelo</h3>
                    <hr class="hr_servicios">
                    <ul>
                        <li>Corte de pelo para hombre: 7.5€</li>
                        <li>Corte de pelo para mujer: 10€</li>
                        <li>Corte de pelo para niños: 5€</li>
                    </ul>
                </span>
            </div>
            <div class="servicios" id="servicio2">
                <span class="texto">
                    <h3>Cortes de barba</h3>
                    <hr class="hr_servicios">
                    <ul>
                        <li>Arreglar y sanear la barba: 3€</li>
                        <li>Recortar: 4€</li>
                        <li>Estilizar: 5€</li>
                    </ul>
                </span>
                <img src="./img/barba.jpg" title="Corte de barba" class="foto_servicio">
            </div>
            <div class="servicios" id="servicio3">
                <img src="./img/tintar.jpg" title="Tintar y peinar" class="foto_servicio">
                <span class="texto">
                    <h3>Tintar y peinar</h3>
                    <hr class="hr_servicios">
                    <ul>
                        <li>Tinte: 17€</li>
                        <li>Peinar: 7.5€</li>
                        <li>Tintar y peinar: 22€</li>
                    </ul>
                </span>
            </div>
            <hr>
            <input type="submit" class="reservar" id="pedir_cita" value="RESERVAR AQUÍ">

            <h1>CONTACTO</h1>
            <div id="ubicacion">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1521.8993872583399!2d-3.800092341857849!3d40.280219994845304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa799a72615cd9d6d!2zNDDCsDE2JzQ4LjgiTiAzwrA0Nyc1Ni40Ilc!5e0!3m2!1ses!2ses!4v1648738111126!5m2!1ses!2ses" width="450" height="250" style="border: 2px ridge darkslategrey; border-radius: 5px;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <ul>
                    <li>📍  Peluquería JavaSytle, C. Luis Sauquillo, 88, 28944 Fuenlabrada, Madrid</li>
                    <br>
                    <li>📞  91 670 14 23</li>
                    <br>
                    <li>📧  javastyle@gmail.com</li>
                    <br>
                    <li>🕓  Lunes a Viernes de 10:30 a 20:00 y Sábados de 9:30 a 14:00</li>
                </ul>
            </div>

            <h1>TIENDA ONLINE</h1>
            <h3 id="titulo_articulos">Más vendidos</h3>
                <div id="mas_vendidos">
                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">   
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>
                </div>

                <hr id="hr_articulos">

                <h3 id="titulo_articulos">Artículos</h3>
                <div id="articulos">
                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">   
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">   
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>

                    <div class="articulos">
                        <img src="./img/tijeras.jpg" class="img_articulos" title="">
                        <h3>Titulo</h3>
                        <h4>Precio</h4>
                        <p>Descripción</p>
                    </div>
                </div>
    </section>

    <div id="caja_cita">
        <input type="submit" class="reservar" id="pedir_cita_sticky" value="PEDIR CITA">
    </div>
    
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
    <script src="js/sesion.js"></script>
</body>
</html>