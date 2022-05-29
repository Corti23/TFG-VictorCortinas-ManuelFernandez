<?php
    require 'bd.php';

    $retirar = retirar_servicio($_POST['id']);

    if ($retirar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>