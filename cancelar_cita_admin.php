<?php
    require 'bd.php';	

    $cancelar = cancelar_cita_admin($_POST['id_cita']);	

    if ($cancelar) {
        echo "TRUE";
    } else {
        echo "FALSE";
    }	
?>