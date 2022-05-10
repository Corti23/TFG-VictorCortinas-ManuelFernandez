let boton_login = document.getElementById("entrar");
boton_login.onclick = login;

function login(){	    
    let usuario = document.getElementById("usuario").value;
    let clave = document.getElementById("clave").value;
    
    let url = "./login.php";
    let params = {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : "usuario=" + usuario + "&clave=" + clave
    };
    
    fetch(url, params)
        .then(function (respuesta) {
            return respuesta.text();
        })
        .then (function (datos) {
            if (datos === "FALSE") {
                document.getElementById("usuario").classList.add("noCoinciden");
                document.getElementById("clave").classList.add("noCoinciden");
            } else {
                window.location.href = "pagina_principal.php";
            }
        })
    return false;
}