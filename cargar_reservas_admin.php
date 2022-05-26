<?php
    require 'bd.php';

	$reservas = cargar_reservas_admin();	

    if($reservas === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$reservas_json = json_encode($reservas);	
    echo $reservas_json;
?>