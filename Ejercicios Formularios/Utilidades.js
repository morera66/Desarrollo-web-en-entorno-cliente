/* ===== Utilidades.js: funciones reutilizables de validación =====
   Las funciones "error..." devuelven un texto con el error, o "" si todo es correcto. */

var LETRAS_NIF = "TRWAGMYFPDXBNJZSQVHLCKE";

function estaVacio(valor) {
  return valor.trim() === "";
}

/* Escribe el mensaje en <span id="info_ID">. Devuelve true si no hay error. */
function mostrar(id, mensaje) {
  document.getElementById("info_" + id).textContent = mensaje;
  return mensaje === "";
}

function limpiarErrores() {
  var spans = document.querySelectorAll("span[id^='info_']");
  for (var i = 0; i < spans.length; i++) {
    spans[i].textContent = "";
  }
}

/* Enlaza submit/reset y pone el foco en el primer campo. */
function iniciar(idForm, idPrimerCampo, funcionValidar) {
  var f = document.getElementById(idForm);
  f.onsubmit = funcionValidar;
  f.onreset = limpiarErrores;
  document.getElementById(idPrimerCampo).focus();
}

/* ---------- Texto ---------- */

function errorObligatorio(valor) {
  return estaVacio(valor) ? "Campo obligatorio" : "";
}

/* Solo letras (tildes, ñ y espacios) y un mínimo de letras */
function errorSoloLetras(valor, minimo) {
  if (estaVacio(valor)) return "Campo obligatorio";
  valor = valor.trim();
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/.test(valor)) return "Solo se permiten letras";
  var numLetras = valor.replace(/ /g, "").length;
  if (numLetras < minimo) return "Faltan letras (mínimo " + minimo + ")";
  return "";
}

/* ---------- NIF ---------- */

function errorNIF(valor) {
  if (estaVacio(valor)) return "Campo obligatorio";
  valor = valor.trim().toUpperCase();
  if (!/^[0-9]{8}[A-Z]$/.test(valor)) return "Formato incorrecto: 8 números y una letra";
  var letraCorrecta = LETRAS_NIF.charAt(parseInt(valor.substring(0, 8), 10) % 23);
  if (valor.charAt(8) !== letraCorrecta) return "La letra del NIF es incorrecta";
  return "";
}

/* ---------- Selects y radios ---------- */

function errorSelect(valor, valorNoValido) {
  return valor === valorNoValido ? "Debes elegir una opción" : "";
}

function errorRadio(nombre) {
  var radios = document.getElementsByName(nombre);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return "";
  }
  return "Debes elegir una opción";
}

/* ---------- Fecha ---------- */

function errorFecha(dia, mes, ano) {
  if (estaVacio(dia) || estaVacio(mes) || estaVacio(ano)) return "Debes rellenar día, mes y año";
  dia = dia.trim(); mes = mes.trim(); ano = ano.trim();
  if (!/^\d{1,2}$/.test(dia) || !/^\d{1,2}$/.test(mes) || !/^\d{4}$/.test(ano)) {
    return "Formato incorrecto (dd/mm/aaaa, el año con 4 cifras)";
  }
  var d = parseInt(dia, 10), m = parseInt(mes, 10), a = parseInt(ano, 10);
  var fecha = new Date(2000, 0, 1);
  fecha.setFullYear(a, m - 1, d);   // los meses van de 0 a 11
  // Si la fecha no existe, JS la "desplaza" (31/02 -> 02/03), así que comparamos
  if (fecha.getFullYear() !== a || fecha.getMonth() !== m - 1 || fecha.getDate() !== d) {
    return "La fecha no existe";
  }
  return "";
}

/* ---------- Estatura ---------- */

function errorEstatura(valor) {
  if (estaVacio(valor)) return "Campo obligatorio";
  valor = valor.trim().replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(valor)) return "Debe ser un número (ej. 1,75)";
  var n = parseFloat(valor);
  if (n < 0.5 || n > 2.5) return "Fuera de rango: entre 0,50 y 2,50 metros";
  return "";
}

/* ---------- Checkboxes ---------- */

function errorCheckMinimo(nombre, minimo) {
  var checks = document.getElementsByName(nombre);
  var marcadas = 0;
  for (var i = 0; i < checks.length; i++) {
    if (checks[i].checked) marcadas++;
  }
  if (marcadas < minimo) return "Mínimo " + minimo + " opciones: llevas " + marcadas;
  return "";
}

/* ---------- Cuenta corriente ---------- */

function errorCCC(valor) {
  if (estaVacio(valor)) return "Campo obligatorio";
  if (!/^\d{20}$/.test(valor)) return "Deben ser exactamente 20 dígitos, sin espacios ni letras";
  return "";
}
