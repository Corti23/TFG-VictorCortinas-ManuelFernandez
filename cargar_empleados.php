<?php
    require 'bd.php';	

	$empleados = cargar_empleados();	

    if($empleados === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$empleados_json = json_encode($empleados);	
    echo $empleados_json;
?>