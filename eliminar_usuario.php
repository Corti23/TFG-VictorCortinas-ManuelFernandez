<?php
    require 'bd.php';

    $eliminar = eliminar_usuario($_POST['id']);

    if ($eliminar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>