<?php
    require 'bd.php';

	$usuarios = cargar_usuarios();	

    if($usuarios === FALSE){
        echo "<p>Se ha producido un ERROR.</p>";
        exit;
    }

	$usuarios_json = json_encode($usuarios);	
    echo $usuarios_json;
?>