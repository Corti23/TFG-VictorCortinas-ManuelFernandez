<?php
    require 'bd.php';

    $actualizar = actualizar_empleado($_POST['id'],$_POST['url_img']);

    if ($actualizar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>