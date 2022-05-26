<?php
    require 'bd.php';	

	$stock = cargar_stock($_POST['id_producto']);	

    if ($stock) {
        echo $stock[0][0];
    } else {
        echo "FALSE";
    }
?>