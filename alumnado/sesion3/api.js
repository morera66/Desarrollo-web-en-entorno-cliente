// =====================================================
// API SIMULADA DE LA TIENDA (no modificar)
// Cada función devuelve una promesa, con un retardo aleatorio,
// y falla de vez en cuando: un 10 % obtenerProductos y un 5 % cada obtenerStock.
// En el tema de AJAX cambiaremos esto por fetch() a un servidor real.
// =====================================================

const PRODUCTOS = [
  { id: 1, nombre: 'Teclado mecánico', precio: 59.9 },
  { id: 2, nombre: 'Ratón inalámbrico', precio: 24.5 },
  { id: 3, nombre: 'Monitor 27"', precio: 219 },
  { id: 4, nombre: 'Auriculares', precio: 39.99 },
  { id: 5, nombre: 'Webcam HD', precio: 45 }
];

const STOCK = { 1: 12, 2: 0, 3: 4, 4: 27, 5: 8 };

const retardo = () => 200 + Math.random() * 800;
const falla = probabilidad => Math.random() < probabilidad;

function obtenerProductos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (falla(0.10)) reject(new Error('No se pudo conectar con el servidor de productos'));
      else resolve(PRODUCTOS.map(p => ({ ...p })));
    }, retardo());
  });
}

function obtenerStock(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (falla(0.05)) reject(new Error(`No se pudo consultar el stock del producto ${id}`));
      else resolve({ id, unidades: STOCK[id] ?? 0 });
    }, retardo());
  });
}
