function dibujarTabla() {
   
    //crear el campo table
    let tabla = document.createElement("table");


    // creamos los td y tr y recorremos con for
    for (let i = 0; i < 2; i++) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.textContent = "Fila" + (i + 1);
        fila.appendChild(celda);
        tabla.appendChild(fila);
    }

    document.getElementById("contenedor-tabla").appendChild(tabla)
}

//ejecuta la función
dibujarTabla();