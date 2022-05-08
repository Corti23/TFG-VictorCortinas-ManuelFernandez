<?php
    require 'bd.php';
	require_once 'sesiones.php';	
	comprobar_sesion();

    $datosjson = file_get_contents("php://input");
    $datos = json_decode($datosjson);

    $usuario = $_SESSION['usuario']['correo'];

    $disponible = comprobar_fecha_hora($usuario, $datos[2], $datos[3], $datos[1]);
    if($disponible == true) {
        $reservar_cita = reservar_cita($usuario, $datos[0], $datos[1], $datos[2], $datos[3]);

        if($reservar_cita == true) {
            $reservar = 1;
        }

        $reservar_json = json_encode($reservar);
        echo $reservar_json;
    } else {
        $error_reservar = 0;

        $disponible_json = json_encode($error_reservar);
        echo $disponible_json;
    }
?>