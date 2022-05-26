<?php
    require 'bd.php';

	$pedidos = cargar_pedidos_admin();	

    if($pedidos === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$pedidos_json = json_encode($pedidos);	
    echo $pedidos_json;
?>