<?php
    require 'bd.php';	

	$productos = cargar_productos();	

    if($productos === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$productos_json = json_encode($productos);	
    echo $productos_json;
?>