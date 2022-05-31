<?php
    require 'bd.php';
    require_once 'sesiones.php';	
	comprobar_sesion();

    $usuario = $_SESSION['usuario']['correo'];	

    $cancelar = cancelar_cita($usuario, $_POST['id_cita']);	

    if ($cancelar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>