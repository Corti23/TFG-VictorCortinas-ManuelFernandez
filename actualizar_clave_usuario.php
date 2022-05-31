<?php
    require 'bd.php';	

    $actualizar = cambiar_clave_usuario_admin($_POST['id'],$_POST['clave_registro']);

    if ($actualizar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>