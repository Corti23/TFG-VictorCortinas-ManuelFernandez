<?php
    require 'bd.php';

    $actualizar = actualizar_servicio($_POST['id'],$_POST['precio']);

    if ($actualizar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>