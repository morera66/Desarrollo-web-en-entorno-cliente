const tarea = (nombre, ms, falla = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (falla) reject(new Error(nombre + ' ha fallado'));
    else resolve(nombre);
  }, ms);
});

//Combinar promesas

// Promise.all([tarea('Usuario', 600), tarea('Pedidos', 300), tarea('Carrito', 900)])
//   .then(resultados => console.log(resultados))    // ['Usuario', 'Pedidos', 'Carrito']
//   .catch(err => console.log('Error:', err.message));

// Promise.allSettled([tarea('Correo 1', 400), tarea('Correo 2', 200, true)])
//   .then(resultados => console.log(resultados));

// Promise.allSettled([tarea('Correo 1', 400), tarea('Correo 2', 200)])
//   .then(resultados => {
//     resultados.forEach(r => {
//       if (r.status === 'fulfilled') console.log('Enviado:', r.value);
//       else console.log('Falló:', r.reason.message);
//     });
//   });

// Promise.race([tarea('Tortuga', 3000), tarea('Liebre', 1000, true)])  // la liebre falla
//   .then(ganadora => console.log('Gana:', ganadora))
//   .catch(err => console.log('Falla:', err.message));

// Promise.any([tarea('Espejo 1', 300, true), tarea('Espejo 2', 200), tarea('Espejo 3', 500)])
//    .then(r => console.log('Datos desde', r));          // Datos desde Espejo 3

//Tratamiento de errores
//Recuperar
// tarea('Cargar foto', 500)              // falla
//   .catch(err => {
//     console.log('Uso una foto por defecto');
//     return 'foto-por-defecto.png';           // valor de repuesto
//   })
//   .then(foto => console.log('Muestro', foto));  

//Relanzar
tarea('Guardar', 500)                             // falla
  .catch(err => {
    console.log('Lo apunto en el registro');
    throw err;            
  })
  .then(() => console.log('¡Guardado con éxito!'))      // ← se ejecuta
  .catch(err => console.log('Aviso al usuario:', err.message));

