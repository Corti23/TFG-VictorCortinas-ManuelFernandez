<?php
    require 'bd.php';
	require_once 'sesiones.php';	
	comprobar_sesion();	

    $usuario = $_SESSION['usuario']['correo'];

	$datos = cargar_datos_usuarios($usuario);	

    if($datos === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$datos_json = json_encode($datos);	
    echo $datos_json;
?>