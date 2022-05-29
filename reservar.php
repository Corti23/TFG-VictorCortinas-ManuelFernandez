<?php
    require 'bd.php';
	require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];

    $disponible = comprobar_fecha_hora($usuario, $_POST['fecha'], $_POST['hora'], $_POST['empleado']);
    if ($disponible == true) {
        $reservar = reservar_cita($usuario, $_POST['servicio'], $_POST['empleado'], $_POST['fecha'], $_POST['hora'], $_POST['precio_servicio']);

        if ($reservar == true) {
            echo "TRUE"; 
        }
    } else {
        echo "FALSE";
    }
?>