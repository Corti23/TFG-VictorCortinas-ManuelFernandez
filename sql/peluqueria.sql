CREATE DATABASE IF NOT EXISTS `peluqueria` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `peluqueria`;

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (  
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` TEXT NOT NULL,
  `apellidos` TEXT NOT NULL,
  `correo` VARCHAR(50) NOT NULL UNIQUE KEY,
  `direccion` VARCHAR(25) NOT NULL,
  `clave_registro` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tipo` VARCHAR(40) NOT NULL,
  `precio` DOUBLE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` TEXT NOT NULL,
  `apellidos` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id_cita` INT AUTO_INCREMENT PRIMARY KEY,
  `correo_usuario` VARCHAR(50) NOT NULL,
  `hora` VARCHAR(5) NOT NULL,
  `cod_servicio` INT NOT NULL,
  `cod_empleado` INT NOT NULL,
  `fecha` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` INT AUTO_INCREMENT PRIMARY KEY,
  `precio` DOUBLE NOT NULL,
  `nombre` VARCHAR(15) NOT NULL,
  `descripcion` VARCHAR(75) NOT NULL,
  `total_veces_comprado` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (  
  `cod_empleado` INT NOT NULL,
  `cod_producto` INT NOT NULL,
  `id` INT NOT NULL,
  `correo` VARCHAR(50) NOT NULL UNIQUE KEY,
  `clave_registro` VARCHAR(60) NOT NULL,
  PRIMARY KEY(`cod_empleado`, `cod_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` INT AUTO_INCREMENT PRIMARY KEY,
  `precio_total` DOUBLE NOT NULL,
  `estado` VARCHAR(12) NOT NULL,
  `correo_usuario` VARCHAR(50) NOT NULL,
  `cod_pro_alm` INT NOT NULL,
  `fecha` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `productos_almacenados`
--

CREATE TABLE `productos_almacenados` (
  `cod_carrito` INT NOT NULL,
  `cod_producto` INT NOT NULL,
  `cantiad` INT NOT NULL,
  PRIMARY KEY(`cod_carrito`, `cod_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `precio_total` DOUBLE NOT NULL,
  `estado` VARCHAR(12) NOT NULL,
  `correo_usuario` VARCHAR(50) NOT NULL,
  `cod_pro_alm` INT NOT NULL,
  `fecha` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Claves foraneas para la tabla `administrador`
ALTER TABLE `administrador` ADD FOREIGN KEY (`cod_producto`) REFERENCES `productos`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `administrador` ADD FOREIGN KEY (`cod_empleado`) REFERENCES `empleados`(`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Claves foraneas para la tabla `productos_almacenados`
ALTER TABLE `productos_almacenados` ADD FOREIGN KEY (`cod_producto`) REFERENCES `productos`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `productos_almacenados` ADD FOREIGN KEY (`cod_carrito`) REFERENCES `carrito`(`id_carrito`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Claves foraneas para la tabla `carrito`
ALTER TABLE `carrito` ADD FOREIGN KEY (`cod_pro_alm`) REFERENCES `productos_almacenados`(`cod_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `carrito` ADD FOREIGN KEY (`correo_usuario`) REFERENCES `usuarios`(`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Claves foraneas para la tabla `citas`
ALTER TABLE `citas` ADD FOREIGN KEY (`correo_usuario`) REFERENCES `usuarios`(`correo`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `citas` ADD FOREIGN KEY (`cod_servicio`) REFERENCES `servicios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `citas` ADD FOREIGN KEY (`cod_empleado`) REFERENCES `empleados`(`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Valores de la tabla `servicios`
INSERT INTO `servicios` (`id`, `tipo`, `precio`) VALUES
(1, 'Corte de pelo para hombre', 10),
(2, 'Corte de pelo para mujer', 15),
(3, 'Corte de pelo para kids', 7),
(4, 'Arreglar y sanear', 18),
(5, 'Recortar', 10),
(6, 'Estilizar', 14),
(7, 'Tintar', 26),
(8, 'Peinar', 17.5),
(9, 'Tintar y peinar', 40);

-- Valores de la tabla `empleados`
INSERT INTO `empleados` (`id_empleado`, `nombre`, `apellidos`) VALUES
(1, 'Antonio', 'Montalbo'),
(2, 'Alicia', 'Calero'),
(3, 'Samuel', 'Vega');