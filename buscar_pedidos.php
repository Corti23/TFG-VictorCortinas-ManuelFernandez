<?php
    require 'bd.php';

    $datosjson = file_get_contents("php://input");
    $datos = json_decode($datosjson);

    $buscar = buscar_pedidos($datos[0], $datos[1]);

    $buscar_json = json_encode($buscar);
    echo $buscar_json;
?>