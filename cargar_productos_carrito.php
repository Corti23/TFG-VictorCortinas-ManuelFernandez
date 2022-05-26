<?php
    require 'bd.php';
    require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];	

	$productos_crarito = cargar_productos_carrito($usuario);	

    if($productos_crarito === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$productos_crarito_json = json_encode($productos_crarito);	
    echo $productos_crarito_json;
?>