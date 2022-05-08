<?php
	require_once 'sesiones.php';	
	comprobar_sesion();
	$_SESSION = array();
	session_destroy();	// eliminar la sesion
	setcookie(session_name(), 123, time() - 1000); // eliminar la cookie
?>

<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset = "UTF-8">
		<title>Sesión cerrada</title>
	</head>
	<style>
		body {
			background-color: rgba(240, 230, 140, 0.582);
			font-family: Helvetica;
		}

		p {
			font-size: 3em;
			font-weight: bold;
			text-align:center;
			color: darkslategrey;
			text-decoration: underline;
		}

		a {
			width: 15%;
			height: 35px;
			display: block;
			margin-left: 42%;
			padding-top: 15px;
			border: 2px double darkkhaki;
			border-radius: 15px;
			background-color: darkslategrey;
			color: darkkhaki;
			text-decoration: none;
			text-align: center;
		}

		a:hover {
			border: 2px double darkslategrey;
			background-color: darkkhaki;
			color: darkslategrey;
		}
	</style>
	<body>
		<p>La sesión se cerró correctamente, hasta la próxima</p>
		<a href="index.php">Ir a la página principal</a>
	</body>
</html>