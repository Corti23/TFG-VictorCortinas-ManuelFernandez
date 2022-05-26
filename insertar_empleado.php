<?php
    require 'bd.php';

    $insertar = insertar_empleado($_POST['nombre'],$_POST['apellidos'],$_POST['url_img']);

    if ($insertar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>