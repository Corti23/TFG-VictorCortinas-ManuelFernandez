<?php
    require 'bd.php';
    require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];	

    $realizar_compra = realizar_compra($usuario);
    if ($realizar_compra == true) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>