<?php
    require 'bd.php';

    $insertar = insertar_producto($_POST['nombre'],$_POST['descripcion'],$_POST['precio'],$_POST['stock'],$_POST['url_img']);

    if ($insertar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>