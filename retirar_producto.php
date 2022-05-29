<?php
    require 'bd.php';

    $retirar = retirar_producto($_POST['id']);

    if ($retirar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>