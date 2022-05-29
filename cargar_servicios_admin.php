<?php
    require 'bd.php';

	$servicios = cargar_servicios_admin();	

    if($servicios === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$servicios_json = json_encode($servicios);	
    echo $servicios_json;
?>