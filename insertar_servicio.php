<?php
    require 'bd.php';

    $insertar = insertar_servicio($_POST['tipo'],$_POST['precio'],$_POST['categoria']);

    if ($insertar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>