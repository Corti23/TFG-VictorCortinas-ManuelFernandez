<?php
    require 'bd.php';

    $baja = baja_empleado($_POST['id']);

    if ($baja) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>