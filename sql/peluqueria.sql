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
  `clave_registro` VARCHAR(60) NOT NULL,
  `admin` BOOLEAN NOT NULL
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
  `apellidos` TEXT NOT NULL,
  `url_img` VARCHAR(75) NOT NULL,
  `contratado` BOOLEAN NOT NULL,
  `fecha_baja` DATE NOT NULL
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
  `nombre` VARCHAR(40) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `url_img` VARCHAR(75) NOT NULL,
  `total_veces_comprado` INT NOT NULL,
  `stock` INT NOT NULL,
  `en_tienda` BOOLEAN NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` INT AUTO_INCREMENT PRIMARY KEY,
  `precio_total` DOUBLE NOT NULL,
  `correo_usuario` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `productos_almacenados`
--

CREATE TABLE `productos_almacenados` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cod_carrito` INT NOT NULL,
  `cod_producto` INT NOT NULL,
  `cantidad` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `precio_total` DOUBLE NOT NULL,
  `correo_usuario` VARCHAR(50) NOT NULL,
  `cod_carrito` INT NOT NULL,
  `cod_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `fecha` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Claves foraneas para la tabla `productos_almacenados`
ALTER TABLE `productos_almacenados` ADD FOREIGN KEY (`cod_producto`) REFERENCES `productos`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `productos_almacenados` ADD FOREIGN KEY (`cod_carrito`) REFERENCES `carrito`(`id_carrito`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Claves foraneas para la tabla `carrito`
ALTER TABLE `carrito` ADD FOREIGN KEY (`correo_usuario`) REFERENCES `usuarios`(`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Claves foraneas para la tabla `citas`
ALTER TABLE `citas` ADD FOREIGN KEY (`correo_usuario`) REFERENCES `usuarios`(`correo`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `citas` ADD FOREIGN KEY (`cod_servicio`) REFERENCES `servicios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `citas` ADD FOREIGN KEY (`cod_empleado`) REFERENCES `empleados`(`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Valores de la tabla `usuarios`
INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `correo`, `direccion`, `clave_registro`, `admin`) VALUES
(1, 'Admin', 'Admin', 'admin@admin.com', 'C/ Luis Sauquillo', '$2y$10$aM6BmdAN3b/gStbOjfipyuxbDwbQyCfgA7C/IZel4GZxdUnS1wdO6', 1),
(2, 'Victor', 'Cortinas Ruiz', 'victor@gmail.com', 'C/ Mostoles', '$2y$10$QDgPLgtLF46jnwp/5nOzyOOwUf0z5xzhW8R07v5XxN16qZmukvcpi', 0),
(3, 'Javier', 'Garcia Ruiz', 'javi@gmail.com', 'C/ Fuenlabrada', '$2y$10$PQB8lrFudpuc5MW2XcT3qud/pPXDlU92WTpp.ha6sZKEQiaFR8sna', 0),
(4, 'Fernando', 'Cortinas Olalla', 'fernando@gmail.com', 'C/ Leganes', '$2y$10$kpK7loT/zWcWnLoo2nlQz.z6AnHxoebM016fMABZAlQtVcWbDDb8W', 0),
(5, 'Juanjo', 'Perez Sainz', 'juanjo@gmail.com', 'C/ Pozuelo', '$2y$10$H6eZEJ0BGwy2A3yD0U/0R.sjV.H6lRis57j4jQce4sxTqcSST35re', 0);

-- Valores de la tabla `carrito`
INSERT INTO `carrito` (`id_carrito`, `correo_usuario`, `precio_total`) VALUES
(1, 'victor@gmail.com', 0),
(2, 'javi@gmail.com', 0),
(3, 'fernando@gmail.com', 0),
(4, 'juanjo@gmail.com', 0);

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
INSERT INTO `empleados` (`id_empleado`, `nombre`, `apellidos`, `url_img`, `contratado`, `fecha_baja`) VALUES
(1, 'Antonio', 'Montalbo', './img/fernando.jpg', 1, NULL),
(2, 'Alicia', 'Calero', './img/laura.jpg', 1, NULL),
(3, 'Samuel', 'Vega', './img/pedro.jpg', 1, NULL);

-- Valores de la tabla `citas`
INSERT INTO `citas` (`id_cita`, `correo_usuario`, `hora`, `cod_servicio`, `cod_empleado`, `fecha`) VALUES
(1, 'victor@gmail.com', '10:30', 1, 1, '2022-05-30'),
(2, 'victor@gmail.com', '11:00', 1, 1, '2022-05-30'),
(3, 'javi@gmail.com', '10:30', 1, 2, '2022-05-30'),
(4, 'fernando@gmail.com', '10:30', 1, 3, '2022-05-30'),
(5, 'juanjo@gmail.com', '10:30', 1, 2, '2022-05-31');

-- Valores de la tabla `productos`
INSERT INTO `productos` (`id_producto`, `nombre`, `precio`, `descripcion`, `total_veces_comprado`, `stock`, `url_img`, `en_tienda`) VALUES
(1, 'K5 International Tijeras Peluqueria', 79.95, 'Tijeras cortar pelo con cuchilla afilada, cuerpo fuerte, larga durabilidad que ayuda a evitar la deformacion por corrosion y la decoloracion de la aleacion de acero inoxidable con metal de alta resistencia.', 15, 20, './img./tijeras.png', 1),
(2, 'V-Pro Peine de Carbono', 14.95, 'No mas cabello cargado de estatica. Para quienes no quieren comprar continuamente un peine nuevo. Durable, resistente al calor, estable e irrompible.', 26, 17, './img./peine.png', 1),
(3, 'Laca Pelo Da Dude Da Hairspray', 19.95, 'Excelente aspecto mate con fuerte sujecion: alta resistencia al viento, no brilla y tiene un agarre firme incluso bajo la lluvia.', 9, 12, './img./laca.png', 1),
(4, 'Remington Secador de Pelo Profesional', 99.95, 'Potente Secador con Motor AC - Motor AC de calidad profesional para un cabello fuerte y con aspecto saludable, gran potencia de 2300 W y 110 km/h.', 12, 23, './img./secador.png', 1),
(5, 'Styling Gel Pacinos Signature Line', 23.60, 'Hidrata y acondiciona el cabello sin rigidez. Cera soluble en agua, facil de limpiar sin dejar residuos, te ayuda a crear diferentes peinados.', 50, 31, './img./gomina.png', 1),
(6, 'Maquinilla BaBylissMEN E996E', 115.95, 'La bateria inalambrica de Iones de litio garantiza 180 min de autonomia con solo 3 horas de carga. Cuchillas de acero japones para un corte preciso y 10 peines guia.', 6, 9, './img./maquina_pelo.png', 1),
(7, 'Moroccanoil Acondicionador', 11.50, 'Restaura los aminoacidos agotados para fortalecer el cabello y alinear su estructura de queratina.', 30, 16, './img./suavizante.png', 1),
(8, 'Sebastian Volupt Boosting Shampoo', 31.95, 'Deja el cabello con gran sensacion de limpieza y frescor, sin grasa, con volumen y muy brillante.', 44, 33, './img./champu.png', 1),
(9, 'Wilkinson Sword Classic', 18.75, 'Es la indicada para un afeitado completo y seguro gracias a su hoja de maxima precision, rebestida en titanio, con la que protegeras tu piel contra la irritacion.', 17, 29, './img./navaja.png', 1),
(10, 'Paco Rabanne One Million', 94.95, 'Productos de Perfumes y fragancias para Unisex Adulto. Los productos de la marca Paco Rabanne estan fabricados con ingredientes de la mejor calidad.', 64, 55, './img./one_million.png', 1),
(11, 'Carolina Herrera Good Girl', 92.15, 'El tacon de alta costura Good Girl se presenta ahora con un modelo en negro que refleja la personalidad seductora de las mujeres que inspiran su silueta.', 52, 47, './img./carolina_herrera.png', 1),
(12, 'GAOYI Traje de peluqueria', 12.95, 'Hecho de material de nailon duradero, suave y liso, facil de secar, sin arrugas, sin pilling. Que se tocan suaves y no estimulan la piel y facil de llevar.', 19, 13, './img./traje_peluqueria.png', 1);