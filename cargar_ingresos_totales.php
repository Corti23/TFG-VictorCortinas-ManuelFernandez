<?php
    require 'bd.php';

	$ingresos = cargar_ingresos_totales();	

    if($ingresos === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$ingresos_json = json_encode($ingresos);	
    echo $ingresos_json;
?>