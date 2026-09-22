function sumar() {
    //se recogen los valores de los recuadros
    let numero1 = document.getElementById("numero1").value;
    let numero2 = document.getElementById("numero2").value;

    //hacemos la suma pasndolo a numero
    let resultado = parseInt(numero1) + parseInt(numero2);

    //construir la tabla con los resultados
    let tabalHTML = "<table>";
    tabalHTML += "<tr><td>Primer numero: " +   + numero1 + "</td></tr>";
    tabalHTML += "<tr><td>Segundo numero: "+ numero2 + "</td></tr>";
    tabalHTML += "<tr><td>Resultado: " + resultado + "</td></tr>";
    tabalHTML += "</table>";

    // metemos la cadena en el contenedor
    document.getElementById("contenedor-tabla").innerHTML = tabalHTML;
}
//Llamamos a la funcion cuando pulse el botón
document.getElementById("botonSumar").addEventListener("click", sumar);