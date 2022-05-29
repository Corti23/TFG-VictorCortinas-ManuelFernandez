<?php
    require 'bd.php';

	$ingresos = cargar_ingresos_pedidos();	

    if($ingresos === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$ingresos_json = json_encode($ingresos);	
    echo $ingresos_json;
?>