<?php
    require 'bd.php';

    $crear = crear_admin($_POST['nombre'],$_POST['apellidos'],$_POST['correo'],$_POST['direccion'],$_POST['clave_registro']);

    if ($crear) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>