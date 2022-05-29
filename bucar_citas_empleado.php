<?php
    require 'bd.php';

    $datosjson = file_get_contents("php://input");
    $datos = json_decode($datosjson);

    $buscar = buscar_citas($datos[0], $datos[1], $datos[2]);

    $buscar_json = json_encode($buscar);
    echo $buscar_json;
?>