<?php
    require 'bd.php';
	require_once 'sesiones.php';	
	comprobar_sesion();	

    $usuario = $_SESSION['usuario']['correo'];

	$reservas = cargar_reservas($usuario);	

    if($reservas === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$reservas_json = json_encode($reservas);	
    echo $reservas_json;
?>