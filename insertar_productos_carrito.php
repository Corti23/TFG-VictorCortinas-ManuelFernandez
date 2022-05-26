<?php
    require 'bd.php';
	require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];

    $comprobar_producto = comprobar_producto($usuario, $_POST['id_producto']);
    if ($comprobar_producto) {
        $actualizar_cantidad = actualizar_cantidad_carrito($usuario, $_POST['id_producto'], $_POST['cantidad_producto'], $comprobar_producto[0]);

        if ($actualizar_cantidad != false) {
            echo "TRUE";
        } else {
            echo "FALSE";
        }
    } else {
        $insertar = insertar_productos_carrito($usuario, $_POST['id_producto'], $_POST['cantidad_producto']);

        if ($insertar != false) {
            echo "TRUE";
        } else {
            echo "FALSE";
        }
    } 
?>