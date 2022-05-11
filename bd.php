<?php
    require 'sesiones.php';

    function leer_config($nombre, $esquema){
        $config = new DOMDocument();
        $config->load($nombre);
        $res = $config->schemaValidate($esquema);
        if ($res===FALSE){ 
           throw new InvalidArgumentException("Revise fichero de configuración");
        } 		
        $datos = simplexml_load_file($nombre);	
        $ip = $datos->xpath("//ip");
        $nombre = $datos->xpath("//nombre");
        $usu = $datos->xpath("//usuario");
        $clave = $datos->xpath("//clave");	
        $cad = sprintf("mysql:dbname=%s;host=%s", $nombre[0], $ip[0]);
        $resul = [];
        $resul[] = $cad;
        $resul[] = $usu[0];
        $resul[] = $clave[0];
        return $resul;
    }

    function cargar_servicios() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select * from servicios";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $servicio) {
            array_push($resultado, $servicio);
        }
        return $resultado;	
    }

    function comprobar_usuario($usuario, $clave){
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select nombre, apellidos, correo, clave_registro from usuarios where correo = '$usuario'";
        $resul = $bd->query($ins);	
        if($resul->rowCount() === 1){		
            foreach ($resul as $raw) {
                if(password_verify($clave, $raw['clave_registro'])){
                    return $raw;
                } else {
                    return FALSE;
                }
            }	
        } else{
            return FALSE;
        }
    }

    function insertar_usuario($nombre, $apellidos, $correo, $direccion, $clave_registro){
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();	
        $hora = date("Y-m-d H:i:s", time());
        $clave_registro = password_hash($clave_registro, PASSWORD_BCRYPT);
        $sql = "insert into usuarios (nombre, apellidos, correo, direccion, clave_registro) 
                values ('$nombre', '$apellidos', '$correo', '$direccion', '$clave_registro')";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $cuenta = $bd->lastInsertId();
        $bd->commit();
        return $cuenta;
    }

    function cargar_empleados() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select * from empleados";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $empleado) {
            array_push($resultado, $empleado);
        }
        return $resultado;	
    }

    function comprobar_fecha_hora($usuario, $fecha, $hora, $cod_empleado) {
        if (!comprobar_token()) {
            return "Ha expirado la sesión.";
        }
        $cita_usuario = obtener_cita_usuario($usuario, $fecha, $hora);
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select * from citas where fecha = '$fecha' and hora = '$hora' and cod_empleado = $cod_empleado";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $disponible) {
            array_push($resultado, $disponible);
        }
        if ($resultado == null && $cita_usuario == true) {
            return true;
        } else {
            return false;
        }
    }

    function reservar_cita($usuario, $cod_servicio, $cod_empleado, $fecha, $hora) {
        if (!comprobar_token()) {
            return "Ha expirado la sesión.";
        }
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $sql = "insert into citas (correo_usuario, cod_servicio, cod_empleado, fecha, hora)
                values ('$usuario', $cod_servicio, $cod_empleado, '$fecha', '$hora')";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function obtener_cita_usuario($usuario, $fecha, $hora) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select * from citas where correo_usuario = '$usuario' and fecha = '$fecha' and hora = '$hora'";
        $resul = $bd->query($ins);
        if (!$resul) {
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $disponible) {
            array_push($resultado, $disponible);
        }
        if ($resultado == null) {
            return true;
        } else {
            return false;
        }
    }

    function cargar_datos_usuarios($usuario) {
        if (!comprobar_token()) {
            return "Ha expirado la sesión.";
        }
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select nombre, apellidos, correo, direccion from usuarios where correo = '$usuario'";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $dato) {
            array_push($resultado, $dato);
        }
        return $resultado;	
    }

    
    function cargar_reservas($usuario) {
        if (!comprobar_token()) {
            return "Ha expirado la sesión.";
        }
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select servicios.tipo, servicios.precio, citas.hora, citas.fecha 
        from servicios, citas
        where servicios.id = citas.cod_servicio
        and citas.correo_usuario = '$usuario'";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $reserva) {
            array_push($resultado, $reserva);
        }
        return $resultado;	
    }
?>