<?php
    require 'bd.php';
    require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];	

	$precio_total = cargar_precio_total_carrito($usuario);	

	$precio_total_json = json_encode($precio_total);	
    echo $precio_total_json;
?>