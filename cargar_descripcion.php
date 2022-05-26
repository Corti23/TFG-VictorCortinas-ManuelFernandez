<?php
    require 'bd.php';	

	$descripcion = cargar_descripcion($_POST['id_producto']);	

    if ($descripcion) {
        echo $descripcion[0][0];
    } else {
        echo "FALSE";
    }
?>