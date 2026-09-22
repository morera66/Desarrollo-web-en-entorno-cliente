function cambiarTamaño() {
    // seleccionamos la imagen por su id
    let imagen = document.getElementById("miImagen");

    // seleccionamos los cuadros de textos
    let ancho = document.getElementById("anchoInput").value;
    let alto = document.getElementById("altoInput").value;

    // cambiamos su ancho y alto a 100
    imagen.width = ancho;
    imagen.height = alto;
}

cambiarTamaño();