<?php
    require 'bd.php';
    require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];	

    $actualizar = actualizar_usuario_clave($usuario, $_POST['nombre'],$_POST['apellidos'],$_POST['correo'],$_POST['direccion'],$_POST['clave_registro']);

    if ($actualizar) {
        echo "TRUE";
        $_SESSION['usuario']['correo'] = $_POST['correo'];
    } else {
        echo "FALSE";
    }	
?>