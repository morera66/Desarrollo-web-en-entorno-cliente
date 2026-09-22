function sumar() {
    //se recogen los valores de los recuadros
    let numero1 = document.getElementById("numero1").value;
    let numero2 = document.getElementById("numero2").value;

    //hacemos la suma pasndolo a numero
    let resultado = parseInt(numero1) + parseInt(numero2);

    alert(resultado);

}
//Llamamos a la funcion cuando pulse el botón
document.getElementById("botonSumar").addEventListener("click", sumar);