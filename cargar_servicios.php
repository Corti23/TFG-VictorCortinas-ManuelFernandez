<?php
    require 'bd.php';	

	$servicios = cargar_servicios();	

    if($servicios === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$servicios_json = json_encode($servicios);	
    echo $servicios_json;
?>