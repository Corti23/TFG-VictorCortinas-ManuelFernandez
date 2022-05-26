<?php
    require 'bd.php';
	require_once 'sesiones.php';	
	comprobar_sesion();	

    $usuario = $_SESSION['usuario']['correo'];

	$pedidos = cargar_pedidos($usuario);	

    if($pedidos === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$pedidos_json = json_encode($pedidos);	
    echo $pedidos_json;
?>