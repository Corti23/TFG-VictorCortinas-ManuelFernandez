<?php
    function comprobar_sesion(){
        session_start();
        if (!isset($_SESSION['usuario'])){	
            return false;
        } else {
            return true;
        }
    }

    function comprobar_token() {
		if (!isset($_SESSION)) {
			session_start();
		}
		if (!isset($_SESSION['token'])) {
			return false;
		}
		if (!isset($_COOKIE['token'])) {
			return false;
		}
		if ($_SESSION['token'] != $_COOKIE['token']) {
			return false;
		}
		setcookie('token', $_SESSION['token'], time() + 900, "/");
		return true;
	}

	function generar_token($longitud) {
		if ($longitud < 4) {
			$longitud = 4;
		}
		return bin2hex(random_bytes(($longitud - ($longitud % 2)) / 2));
	}
?>