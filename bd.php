<?php
    require 'sesiones.php';

    function leer_config($nombre, $esquema) {
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

    function comprobar_usuario($usuario, $clave) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select nombre, apellidos, correo, clave_registro, admin from usuarios where correo = '$usuario'";
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

    function insertar_usuario($nombre, $apellidos, $correo, $direccion, $clave_registro) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();	
        $hora = date("Y-m-d");
        $clave_registro = password_hash($clave_registro, PASSWORD_BCRYPT);
        $sql = "insert into usuarios (nombre, apellidos, correo, direccion, clave_registro, admin) 
                values ('$nombre', '$apellidos', '$correo', '$direccion', '$clave_registro', 0)";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $cuenta = $bd->lastInsertId();
        $bd->commit();
        crearCarrito($correo);
        return $cuenta;
    }

    function crearCarrito($correo_usuario) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();	
        $sql = "insert into carrito (correo_usuario, precio_total) values ('$correo_usuario', 0)";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $carrito = $bd->lastInsertId();
        $bd->commit();
        return $carrito;
    }

    function cargar_productos_mas_vendidos() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select id_producto, precio, nombre, url_img from productos order by total_veces_comprado desc limit 5";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $producto) {
            array_push($resultado, $producto);
        }
        return $resultado;	
    }

    function cargar_productos() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select id_producto, precio, nombre, url_img from productos";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $producto) {
            array_push($resultado, $producto);
        }
        return $resultado;	
    }

    function cargar_stock($id_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select stock from productos where id_producto = $id_producto and stock > 0";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $stock = array();
        foreach ($resul as $producto) {
            array_push($stock, $producto);
        }
        return $stock;	
    }

    function cargar_descripcion($id_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select descripcion from productos where id_producto = $id_producto";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $descripcion = array();
        foreach ($resul as $producto) {
            array_push($descripcion, $producto);
        }
        return $descripcion;	
    }

    function insertar_productos_carrito($usuario, $id_producto, $cantidad_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $cod_carrito = obtener_carrito_usuario($usuario);	
        $sql = "insert into productos_almacenados (cod_carrito, cod_producto, cantidad) values ($cod_carrito, $id_producto, $cantidad_producto)";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $productos_almacenados = $bd->lastInsertId();
        $bd->commit();
        return $productos_almacenados;
    }

    function obtener_carrito_usuario($usuario) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select id_carrito from carrito where correo_usuario = '$usuario'";
        $resul = $bd->query($ins);
        if (!$resul) {
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $id) {
            array_push($resultado, $id);
        }
        return $resultado[0][0];
    }

    function cargar_productos_carrito($usuario) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select productos.id_producto, productos.url_img, productos.nombre, productos.stock, productos.precio, productos_almacenados.cantidad
        from productos, productos_almacenados, carrito
        where carrito.correo_usuario = '$usuario'
        and carrito.id_carrito = productos_almacenados.cod_carrito
        and productos_almacenados.cod_producto = productos.id_producto";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $producto) {
            array_push($resultado, $producto);
        }
        return $resultado;	
    }

    function comprobar_producto($usuario, $id_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $cod_carrito = obtener_carrito_usuario($usuario);
        $ins = "select cantidad from productos_almacenados where cod_producto = $id_producto and cod_carrito = $cod_carrito";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $cantidad) {
            array_push($resultado, $cantidad);
        }
        return $resultado;	
    }

    function actualizar_cantidad_carrito($usuario, $id_producto, $cantidad_producto, $cantidad_antigua) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $cod_carrito = obtener_carrito_usuario($usuario);
        $cantidad_total = $cantidad_producto + $cantidad_antigua[0];
        $sql = "update productos_almacenados set cantidad = $cantidad_total
                where  cod_carrito = $cod_carrito
                and cod_producto = $id_producto";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function actualizar_cantidad_producto($usuario, $id_producto, $cantidad_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $cod_carrito = obtener_carrito_usuario($usuario);	
        $sql = "update productos_almacenados set cantidad = $cantidad_producto
                where  cod_carrito = $cod_carrito
                and cod_producto = $id_producto";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function comprobar_stock($id_producto, $cantidad_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select stock from productos where id_producto = $id_producto and stock >= $cantidad_producto";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        return true;	
    }

    function comprobar_estado_producto($id_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select stock, total_veces_comprado from productos where id_producto = $id_producto";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $estado) {
            array_push($resultado, $estado);
        }
        return $resultado;	
    }
    
    function borrar_producto_carrito($usuario, $id_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $cod_carrito = obtener_carrito_usuario($usuario);	
        $sql = "delete from productos_almacenados where cod_producto = $id_producto and cod_carrito = $cod_carrito";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function cargar_precio_total_carrito($usuario) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select productos.precio, productos_almacenados.cantidad
        from productos, productos_almacenados, carrito
        where carrito.correo_usuario = '$usuario'
        and carrito.id_carrito = productos_almacenados.cod_carrito
        and productos_almacenados.cod_producto = productos.id_producto";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $producto) {
            array_push($resultado, $producto);
        }
        return $resultado;
    }

    function realizar_compra($usuario) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $fecha = date("Y-m-d");
        $array_productos = obtener_productos_carrito($usuario);	
        foreach ($array_productos as $valor) {
            $precio_total = $valor[0] * $valor[3];
            $cod_carrito = $valor[1];
            $cod_producto = $valor[2];
            $cantidad_producto = $valor[3];

            $sql = "insert into pedidos (precio_total, correo_usuario, cod_carrito, cod_producto, cantidad, fecha) values ($precio_total, '$usuario', $cod_carrito, $cod_producto, $cantidad_producto, '$fecha')";
            $resul = $bd->query($sql);	
            if (!$resul) {
                return FALSE;
            }
            $productos_pedido = $bd->lastInsertId();     
            actualizar_producto($cod_producto, $cantidad_producto);
        }
        borrar_productos_almacenados($usuario);
        $bd->commit();
        return true;        
    }

    function obtener_productos_carrito($usuario) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select productos.precio, productos_almacenados.cod_carrito, productos_almacenados.cod_producto, productos_almacenados.cantidad
        from productos_almacenados, carrito, productos
        where carrito.correo_usuario = '$usuario'
        and carrito.id_carrito = productos_almacenados.cod_carrito
        and productos_almacenados.cod_producto = productos.id_producto";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $producto) {
            array_push($resultado, $producto);
        }
        return $resultado;
    }

    function actualizar_producto($cod_producto, $cantidad_producto) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $estado = comprobar_estado_producto($cod_producto);
        $cantidad_total = $estado[0][1] + $cantidad_producto;
        $nuevo_stock = $estado[0][0] - $cantidad_producto;
        $sql = "update productos set stock = $nuevo_stock, total_veces_comprado = $cantidad_total
                where id_producto = $cod_producto";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function borrar_productos_almacenados($usuario) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $cod_carrito = obtener_carrito_usuario($usuario);	
        $sql = "delete from productos_almacenados where cod_carrito = $cod_carrito";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function cargar_empleados() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select * from empleados where contratado = 1";
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

    function actualizar_usuario($usuario, $nombre, $apellidos, $correo, $direccion) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $sql = "update usuarios set nombre = '$nombre', apellidos = '$apellidos', correo = '$correo', direccion = '$direccion' where correo = '$usuario'";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function actualizar_usuario_clave($usuario, $nombre, $apellidos, $correo, $direccion, $clave_registro) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $clave_registro = password_hash($clave_registro, PASSWORD_BCRYPT);
        $sql = "update usuarios set nombre = '$nombre', apellidos = '$apellidos', correo = '$correo', direccion = '$direccion', clave_registro = '$clave_registro' where correo = '$usuario'";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
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

    function cargar_pedidos($usuario) {
        if (!comprobar_token()) {
            return "Ha expirado la sesión.";
        }
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select productos.nombre, pedidos.cantidad, pedidos.precio_total, pedidos.fecha 
        from productos, pedidos
        where pedidos.cod_producto = productos.id_producto
        and pedidos.correo_usuario = '$usuario'";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $compra) {
            array_push($resultado, $compra);
        }
        return $resultado;	
    }

    function cargar_reservas_admin() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select citas.correo_usuario, servicios.tipo, empleados.nombre, empleados.apellidos, servicios.precio, citas.hora, citas.fecha 
        from servicios, citas, empleados
        where servicios.id = citas.cod_servicio
        and empleados.id_empleado = citas.cod_empleado";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $reservas) {
            array_push($resultado, $reservas);
        }
        return $resultado;	
    }

    function cargar_pedidos_admin() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select pedidos.correo_usuario, productos.nombre, pedidos.cantidad, pedidos.precio_total, pedidos.fecha 
        from productos, pedidos
        where pedidos.cod_producto = productos.id_producto";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }
        $resultado = array();
        foreach ($resul as $pedidos) {
            array_push($resultado, $pedidos);
        }
        return $resultado;	
    }

    function baja_empleado($id) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $fecha_baja = date("Y-m-d");
        $sql = "update empleados set contratado = 0, fecha_baja = '$fecha_baja' where id_empleado = $id";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function insertar_empleado($nombre, $apellidos, $url_img) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $sql = "insert into empleados (nombre, apellidos, url_img, contratado) values ('$nombre', '$apellidos', '$url_img', 1)";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $empleado = $bd->lastInsertId();
        $bd->commit();
        actualizar_citas_empleado_baja($empleado);
        return $empleado;
    }

    function actualizar_citas_empleado_baja($empleado) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $empleado_baja = obtener_id_fecha_empleado_baja();
        $id_empleado_baja = $empleado_baja[0][0];
        $fecha_empleado_baja = $empleado_baja[0][1];
        $sql = "update citas set cod_empleado = $empleado where cod_empleado = $id_empleado_baja and fecha > '$fecha_empleado_baja'";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function obtener_id_fecha_empleado_baja() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select id_empleado, fecha_baja 
        from empleados
        where contratado = 0
        order by fecha_baja desc limit 1";
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

    function actualizar_empleado($id, $url_img) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $sql = "update empleados set url_img = '$url_img' where id_empleado = $id";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }

    function cargar_productos_admin() {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $ins = "select id_producto, nombre, descripcion, precio, stock, total_veces_comprado, url_img from productos";
        $resul = $bd->query($ins);	
        if (!$resul) {
            return FALSE;
        }
        if ($resul->rowCount() === 0) {    
            return FALSE;
        }	
        $resultado = array();
        foreach ($resul as $producto) {
            array_push($resultado, $producto);
        }
        return $resultado;	
    }

    function actualizar_producto_admin($id, $descripcion, $precio, $stock, $url_img) {
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[2]);
        $bd->beginTransaction();
        $sql = "update productos set descripcion = '$descripcion', precio = $precio, stock = $stock, url_img = '$url_img' where id_producto = $id";
        $resul = $bd->query($sql);	
        if (!$resul) {
            return FALSE;
        }
        $bd->commit();
        return true;
    }
?>