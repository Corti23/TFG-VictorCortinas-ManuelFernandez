<?php
    require 'bd.php';
    require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];	

    $comprobar_stock = comprobar_stock($_POST['id_producto'], $_POST['cantidad_producto']);
    if ($comprobar_stock == true) {
        $actualizar = actualizar_cantidad_producto($usuario, $_POST['id_producto'], $_POST['cantidad_producto']);	

        if($actualizar === FALSE){
            echo "<p>Se ha producido un ERROR.</p>";
            exit;
        } else {
            echo "TRUE";
        }
    } else {
        echo "FALSE";
    }	
?>