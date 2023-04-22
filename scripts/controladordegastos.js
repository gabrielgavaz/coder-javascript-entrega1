let opcion;
let id= 1;
let gastoDiario = 0.0;
let categorias = []; // definir un array vacío para almacenar los objetos de gastos
let i = 0;

do {
  // Mostramos el menú
  opcion = parseInt(prompt("=== MENÚ DE GASTOS === \n 1. Añadir gasto diario\n 2. Ver gasto total\n 3. Mostrar las categorias de los gastos\n 4. Filtrar\n 5. Salir"));

  switch (opcion) {
    case 1:
      // Pedimos al usuario que ingrese la categoria y el gasto diario
      const nuevaCategoria = prompt("Ingrese categoría del gasto:");
      const nuevoGasto = parseFloat(prompt("Ingrese el monto del gasto diario:"));
      gastoDiario += nuevoGasto;
      console.log(`Gasto diario de ${nuevoGasto} agregado correctamente.`);
      const gasto = {
        categoria: nuevaCategoria,
        monto: nuevoGasto,
        id: id,
      };
      categorias.push(gasto); // agregar el objeto de gasto al array categorias
      id++;
      break;

    case 2:
      // Mostramos el gasto total
      console.log(`Gasto total: ${gastoDiario}`);
      break;

    case 3:
      // Mostramos las categorias y los gastos
      console.log("Categorías de gastos:");
      for (let i = 0; i < categorias.length; i++) {
        console.log(`categoria:${categorias[i].categoria} precio: ${categorias[i].monto} id: ${categorias[i].id}`);
      }
      break;

    case 4:

      // Filtramos los gastos por categoría
      const categoriaFiltro = prompt("Ingrese la categoría que desea filtrar:");
      const gastosFiltrados = categorias.filter((gasto) => gasto.categoria === categoriaFiltro);

      if (gastosFiltrados.length > 0) {
        console.log(`Gastos de la categoría ${categoriaFiltro}:`);
        gastosFiltrados.forEach((gasto) => {
          console.log(`- Monto: ${gasto.monto} (ID: ${gasto.id}) -`);
        });
      } else {
        console.log(`No hay gastos registrados para la categoría ${categoriaFiltro}.`);
      }

    
    break;

    case 5:
      // Salimos del programa
      console.log("Saliendo del programa...");
      break;

    default:
      // Si el usuario ingresa una opción no válida, mostramos un mensaje de error
      console.log("Opción no válida. Por favor, seleccione una opción del menú.");
      break;
  }
} while (opcion !== 5);