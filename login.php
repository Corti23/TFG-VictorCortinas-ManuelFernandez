<?php
    require_once 'bd.php';
    require_once 'sesiones.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {  
        if (isset($_POST['usuario'])) {
            $usu = comprobar_usuario($_POST['usuario'], $_POST['clave']);
            if($usu===false){
                echo "FALSE";
            } else {
                session_start();
                $token = generar_token(15);
                $_SESSION['token'] = $token;
                setcookie('token', $token, time() + 900, "/");
                $_SESSION['usuario'] = $usu;
                echo $_SESSION['usuario']['nombre'] . " " . $_SESSION['usuario']['apellidos'];
            }	
        } else {
            insertar_usuario($_POST['nombre'],$_POST['apellidos'],$_POST['correo'],$_POST['direccion'],$_POST['clave_registro']);
        }
    }
?>