<?php
    require 'bd.php';
    require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];	

    $borrar = borrar_producto_carrito($usuario, $_POST['id_producto']);	

    if($borrar === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    } else {
        echo "TRUE";
    }	
?>