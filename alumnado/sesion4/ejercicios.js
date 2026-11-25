// =====================================================================
// SESIÓN 4 · FETCH CON FORMATOS · Ejercicios 4.1 a 4.6
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: abre index.html con Live Server (clic derecho →
// «Open with Live Server»). Con doble clic (file://) fetch no funciona.
// Los archivos que vas a pedir están en la carpeta data/.
// =====================================================================


// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------
// pintarTabla(alumnos, titulo): devuelve una <table> con los alumnos.
// alumnos es un array de objetos { nombre, apellido, edad, curso }.
function pintarTabla(alumnos, titulo) {
  const tabla = document.createElement('table');
  const caption = document.createElement('caption');
  caption.textContent = titulo;
  tabla.append(caption);
  const cabecera = tabla.insertRow();
  for (const campo of ['Nombre', 'Apellido', 'Edad', 'Curso']) {
    const th = document.createElement('th');
    th.textContent = campo;
    cabecera.append(th);
  }
  for (const a of alumnos) {
    const fila = tabla.insertRow();
    for (const valor of [a.nombre, a.apellido, a.edad, a.curso]) {
      fila.insertCell().textContent = valor;
    }
  }
  return tabla;
}
// ------------------------------------------------------------------------


// ---------------------------------------------------------------------
// EJERCICIO 4.1 · Mira la respuesta por dentro
// Haz un fetch de 'data/contenido.json' con then y, en el primer then,
// muestra por consola:
//   - la respuesta entera
//   - respuesta.status y respuesta.ok
//   - el tipo de contenido: respuesta.headers.get('Content-Type')
// Después lee el contenido con .json() y, en un segundo then, muestra
// los datos por consola. Termina la cadena con un catch.
//
// Repite lo mismo con 'data/contenido.txt' (léelo con .text()).
// ¿Qué Content-Type tiene cada uno?
// ---------------------------------------------------------------------

// el primero tiene

// Tu código aquí:

fetch('data/conetenido.json')
    .then(respuesta =>{
      console.log(respuesta);
      console.log('status:', respuesta.status, 'ok', respuesta.ok);
      console.log('Conetnt-Type:', respuesta.headers.get('Content-Type'));
      return respuesta.json();

    })

    .then(datos => console.log('Datos del json:', datos))
    .catch(error => console.log('Error:', error.message));



fetch('data/contenido.txt')
    .then(respuesta => {
      console.log(respuesta);
      console.log('status:', respuesta.status, 'ok:', respuesta.ok);
      console.log('Content-Type:', respuesta.headers.get('Content-Type'));
      return respuesta.text();
    })
    .then(texto => console.log('Datos del TXT:', texto))
    .catch(error => console.log('Error:', error.message));


// Content-Type del JSON: application/json
// Content-Type del TXT: text/plain



// ---------------------------------------------------------------------
// EJERCICIO 4.2 · Cuatro formatos
// Completa las cuatro funciones. Cada una pide su archivo de data/ y
// pinta el resultado en su caja (#json, #txt, #html y #xml).
// Los botones de la página ya las llaman.
//   - JSON: léelo con .json(). Pinta el titulo en un <h3> y el
//           mensaje en un <p>.
//   - TXT:  léelo con .text() y píntalo con textContent.
//   - HTML: léelo con .text() y píntalo con innerHTML.
//   - XML:  léelo con .text(), conviértelo con
//           new DOMParser().parseFromString(texto, 'application/xml')
//           y saca <titulo> y <mensaje> con querySelector.
//           Píntalos como en el JSON.
// Termina cada cadena con un catch que pinte el mensaje del error
// en la caja.
// ---------------------------------------------------------------------

function cargarJson() {
  // Tu código aquí
const caja = document.getElementById('json');
  fetch('data/contenido.json')

      .then(respuesta => respuesta.json())
      .then(datos => {

        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;

        const p = document.createElement('p');
        p.textContent = datos.mensaje;
        caja.replaceChildren(h3, p);
      })

    .catch(error => { caja.textContent = error.message; });

}

function cargarTxt() {
  // Tu código aquí

  const caja = document.getElementById('txt');
  fetch('data/contenido.txt')
      .then(respuesta => respuesta.txt())
      .then(texto => {caja.textContent = texto; })

      .catch(error => {caja.textContent = error.message; });

}

function cargarHtml() {
  // Tu código aquí

  const caja = document.getElementById('html');
  fetch('data/contenido.html')
      .then(respuesta => respuesta.text())
      .then(texto => { caja.innerHTML = texto; })
      .catch(error => { caja.textContent = error.message; });

}

function cargarXml() {
  // Tu código aquí

  const caja = document.getElementById('xml');
  fetch('data/contenido.xml')
      .then(respuesta => respuesta.text())
      .then(texto => {
        const xml = new DOMParser().parseFromString(texto, 'application/xml');
        const h3 = document.createElement('h3');
        h3.textContent = xml.querySelector('titulo').textContent;
        const p = document.createElement('p');
        p.textContent = xml.querySelector('mensaje').textContent;
        caja.replaceChildren(h3, p);
      })
      .catch(error => { caja.textContent = error.message; });

}



// ---------------------------------------------------------------------
// EJERCICIO 4.3 · Piensa y prueba
// Responde en los comentarios. Para la c) y la d), cambia el código del
// 4.2, prueba y después déjalo como estaba.
// ---------------------------------------------------------------------

// a) ¿Por qué hacen falta DOS then para tener
//    los datos de un fetch?
// porque son dos esperas, el primero la devuelve y el segundo recibe los datos
//
// b) Hay respuesta.json() y respuesta.text(), pero no respuesta.xml().
//    ¿Cómo leemos entonces un XML?
//
// se lee como texto con .text()

// c) En cargarJson, cambia la ruta por 'data/contenido.txt'.
//    ¿Qué error sale? ¿En qué paso falla: en el fetch o en el .json()?
//
//  sale SyntaxError, falla el .json

// d) En cargarHtml, cambia innerHTML por textContent. ¿Qué cambia?
//    ¿Por qué es peligroso usar innerHTML con HTML que no es nuestro?
// se ven las etiquetas escritas, es peligroso porque intepreta codigo de fuera y puede tener un mal codigo


// ---------------------------------------------------------------------
// EJERCICIO 4.4 · Los errores de fetch
// a) Escribe la función pedir(url, formato). Debe DEVOLVER (return)
//    la promesa del fetch con un then que:
//    - si respuesta.ok es false, lance un error:
//        throw new Error(`Error ${respuesta.status} en ${url}`)
//    - si formato es 'json', devuelva respuesta.json();
//      si no, devuelva respuesta.text()
//    Así, quien la use recibe los datos ya leídos en un solo then:
//      pedir('data/contenido.json', 'json').then(datos => ...)
// b) Completa probarErrores: usa pedir con 'data/noexiste.json' y,
//    en el catch, pinta el mensaje del error en #errores.
// c) Quita el if de pedir y vuelve a probar. ¿Qué pasa ahora?
//    ¿Por qué fetch no falla solo con un 404?
// A partir de aquí, usa pedir en los demás ejercicios.
// ---------------------------------------------------------------------

// Tu código aquí (pedir):
function pedir(url, formato) {
  return fetch(url)
      .then(respuesta => {
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} en ${url}`);
        }
        if (formato === 'json') {
          return respuesta.json();
        }
        return respuesta.text();
      });
}

function probarErrores() {
  // Tu código aquí

  const caja = document.getElementById('errores');
  pedir('data/noexiste.json', 'json')
      .then(datos => { caja.textContent = JSON.stringify(datos); })
      .catch(error => {
        caja.className = 'caja error';
        caja.textContent = error.message;
      });

}

// Respuesta c):
// dice que cannot get porque el .json intenta leer y da un error de formato, no falla solo con un 404 porque para fetch un 404 es una respuesta valida


// ---------------------------------------------------------------------
// EJERCICIO 4.5 · Los mismos alumnos en dos formatos
// data/alumnos.json y data/alumnos.xml tienen los mismos 4 alumnos.
// Las dos primeras funciones no pintan nada: DEVUELVEN una promesa
// que se cumple con el array de alumnos (usa pedir y un then).
// a) cargarAlumnosJson(): promesa del array de alumnos del JSON.
//    Mira cómo es el archivo: los alumnos están dentro de "clase".
// b) cargarAlumnosXml(): promesa de un array con LA MISMA FORMA
//    { nombre, apellido, edad, curso }. Recorre los <alumno> con
//    querySelectorAll. Ojo: en el XML todo es texto, así que la edad
//    hay que pasarla a número con Number().
// c) mostrarAlumnos(): pide los dos A LA VEZ con Promise.all y añade a
//    #alumnos una tabla de cada uno con pintarTabla(alumnos, titulo).
//    Muestra por consola si los dos tienen el mismo número de alumnos.
// ¿Con qué formato ha sido más fácil? ¿Por qué crees que casi todas
// las APIs usan JSON?
// ---------------------------------------------------------------------

function cargarAlumnosJson() {
  // Tu código aquí

  return pedir('data/alumnos.json', 'json')
      .then(datos => datos.clase);

}

function cargarAlumnosXml() {
  // Tu código aquí

  return pedir('data/alumnos.xml', 'text')
      .then(texto => {
        const xml = new DOMParser().parseFromString(texto, 'application/xml');
        const alumnos = [];
        xml.querySelectorAll('alumno').forEach(alumno => {
          alumnos.push({
            nombre: alumno.querySelector('nombre').textContent,
            apellido: alumno.querySelector('apellido').textContent,
            edad: Number(alumno.querySelector('edad').textContent),
            curso: alumno.querySelector('curso').textContent
          });
        });
        return alumnos;
      });

}

function mostrarAlumnos() {
  // Tu código aquí

  const caja = document.getElementById('alumnos');
  Promise.all([cargarAlumnosJson(), cargarAlumnosXml()])
      .then(([alumnosJson, alumnosXml]) => {
        caja.replaceChildren(
            pintarTabla(alumnosJson, 'Alumnos desde JSON'),
            pintarTabla(alumnosXml, 'Alumnos desde XML')
        );
        console.log('¿Mismo número de alumnos?', alumnosJson.length === alumnosXml.length);
      })
      .catch(error => {
        caja.className = 'caja error';
        caja.textContent = error.message;
      });

}

// ¿Qué formato ha sido más fácil y por qué?
// con json, porque ya llega el array y la edad ya es un numero



// ---------------------------------------------------------------------
// EJERCICIO 4.6 · Informe de carga (ampliación)
// Quieres comprobar qué archivos se cargan bien. Pide estos cinco A LA
// VEZ con pedir, cada uno con su formato:
//   'data/contenido.json' json      'data/contenido.txt'  text
//   'data/contenido.xml'  text      'data/noexiste.json'  json
//   'data/contenido.txt'  json   ← este fallará: ¿por qué?
// Usa el combinador que espera a TODAS aunque alguna falle (sesión 3).
// Pinta en #informe una lista <ul> con una línea por archivo:
//   ✔ data/contenido.json          (clase ok)
//   ✘ data/noexiste.json: Error 404 en data/noexiste.json   (clase error)
// ---------------------------------------------------------------------

function informe() {
  // Tu código aquí


  const caja = document.getElementById('informe');
  const peticiones = [
    ['data/contenido.json', 'json'],
    ['data/contenido.txt', 'text'],
    ['data/contenido.xml', 'text'],
    ['data/noexiste.json', 'json'],
    ['data/contenido.txt', 'json']
  ];

  Promise.allSettled(peticiones.map(([url, formato]) => pedir(url, formato)))
      .then(resultados => {
        const ul = document.createElement('ul');
        resultados.forEach((resultado, i) => {
          const [url, formato] = peticiones[i];
          const li = document.createElement('li');
          if (resultado.status === 'fulfilled') {
            li.className = 'ok';
            li.textContent = `✔ ${url} (${formato})`;
          } else {
            li.className = 'error';
            li.textContent = `✘ ${url} (${formato}): ${resultado.reason.message}`;
          }
          ul.append(li);
        });
        caja.replaceChildren(ul);
      });

}
