let opcion;
let gastoDiario = 0.0;
let categoria = [];
let i = 0;

do{
// Mostramos el menú
opcion = parseInt(prompt("=== MENÚ DE GASTOS === \n 1. Añadir gasto diario\n 2. Ver gasto total\n 3. Mostrar las categorias de los gastos\n 4. Salir"));
  switch(opcion) {
    case 1:
      // Pedimos al usuario que ingrese la categoria y el gasto diario

      categoria[i] = prompt("ingrese categoria del gasto");
      let nuevoGasto = parseFloat(prompt("Ingrese el monto del gasto diario:"));
      gastoDiario += nuevoGasto;
      console.log(`Gasto diario de ${nuevoGasto} agregado correctamente.`);
      i ++;
      break;
    case 2:
      // Mostramos el gasto total
      console.log(`Gasto total: ${gastoDiario}`);
      break;
    case 3:
      // Mostramos el array de categoria o un mensaje si está vacío
      if (categoria.length === 0) {
        console.log("No hay categorías de gastos aún.");
      } else {
        console.log(categoria);
      }
      break;
    case 4:
      // Salimos del programa
      console.log("Saliendo del programa...");
      break;
    default:
      // Si el usuario ingresa una opción no válida, mostramos un mensaje de error
      console.log("Opción no válida. Por favor, seleccione una opción del menú.");
      break;
  }
}
while(opcion !== 4);

