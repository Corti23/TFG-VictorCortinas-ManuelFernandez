<?php
    require 'bd.php';

    $actualizar = actualizar_producto_admin($_POST['id_producto'],$_POST['descripcion'],$_POST['precio'],$_POST['stock'],$_POST['url_img']);

    if ($actualizar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>