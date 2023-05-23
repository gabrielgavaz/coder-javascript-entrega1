let restante = 0;

const guardarPresupuesto = () => {
  let presupuesto = parseInt(document.querySelector("#presupuestoInicial").value);
  restante = presupuesto; // Se asigna el presupuesto inicial a la variable restante
  if (presupuesto < 1 || isNaN(presupuesto)) { // Verifica si el presupuesto es válido
    mostrarError("#msj_error_pregunta", "Cantidad No Válida");
    return;
  }
  localStorage.setItem("presupuesto", presupuesto); // Guardamos el presupuesto en el almacenamiento local
  localStorage.setItem("gastos", JSON.stringify([])); // Guardamos un array vacio que luego setra completado

  actualizarVista();
}

const actualizarVista = () => {
  let presupuesto = localStorage.getItem("presupuesto");

  let divPregunta = document.querySelector("#pregunta");
  let divGastos = document.querySelector("#divGastos");
  let divControlGastos = document.querySelector("#divControlGastos");

  divPregunta.style.display = "none";
  divGastos.style.display = "none";


  let controlGastos = `<div class="gastos-realizados">
                      <h2>Listado de Gastos</h2>
                      <div class="alert alert-success">
                      Presupuesto:$ ${presupuesto}</div>
                      <div class="alert alert-success">
                      Restante:$ ${presupuesto}</div>
                    </div>`;

  if (!presupuesto) {
    divPregunta.style.display = "block"; // Si no hay presupuesto guardado, muestra la sección del presupuesto para ingresar el dinero total que tenemos
  } else {
    divPregunta.style.display = "none"; // aqui es lo que ocurre si hay ya un presupuesto establecio y guardado en el local
    divGastos.style.display = "flex";
    divControlGastos.innerHTML = controlGastos;
    refrescarListado();
  }
}

const agregarGasto = () => {
  let tipoGasto = document.querySelector("#tipoGasto").value;
  let cantidadGasto = parseInt(document.querySelector("#cantidadGasto").value);

  if (cantidadGasto < 1 || isNaN(cantidadGasto) || tipoGasto.trim() === '' || !/^[a-zA-Z]+$/.test(tipoGasto)) {  //verificaom que los datos entrantes son validos
    mostrarError("#msj_error_crearGasto", "ERROR EN CAMPOS");
    return;
  }

  let presupuesto = parseInt(localStorage.getItem("presupuesto"));

  if (cantidadGasto > restante) {
    mostrarError("#msj_error_crearGasto", "Cantidad mayor al restante");
    return;
  }
  let nuevoGasto = {
    tipoGasto,
    cantidadGasto
  }

  let gastos = JSON.parse(localStorage.getItem("gastos"));
  gastos.push(nuevoGasto);
  localStorage.setItem("gastos", JSON.stringify(gastos));

  restante = presupuesto - cantidadGasto; // Actualizar el valor restante
  refrescarListado(); // Actualizar la vista del listado de gastos

  document.querySelector("#formGasto").reset();
}



const refrescarListado = () => {
  let presupuesto = parseInt(localStorage.getItem("presupuesto"));
  let gastos = JSON.parse(localStorage.getItem("gastos"));


  let tabla = document.querySelector("#tabla");
  if (gastos && gastos.length === 0) {
    tabla.style.display = "block";
  }

  
  let totalGastos = 0;
  let listadoHTML = ``;
  gastos.map(gasto => {
    listadoHTML +=`
                      <tr>
                        <td>${gasto.tipoGasto}</td>
                        <td>${gasto.cantidadGasto}</td>
                        <td><img src="/images/editar.png" onclick="editarFila()" class=""></td>
                      </tr>`;
    
    // `<li class="gastos">
    //             <p class="parrafoTipoGasto">${gasto.tipoGasto}</p>
    //             <p class="parrafoCantidadGasto">$ ${gasto.cantidadGasto}</p>
    //             </li>`;
    totalGastos += parseInt(gasto.cantidadGasto);
  });

  let tablaGastos = `<table class="tabla-gastos" id="tabla">
                      <thead>
                        <tr>
                          <th>Tipo de Gasto</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${listadoHTML}
                      </tbody>
                    </table>`;
  console.log("total de gastos: " + totalGastos);

  restante = presupuesto - totalGastos;

  let divControlGastos = document.querySelector("#divControlGastos");

  divControlGastos.innerHTML = ``;

  let clase = "";
  
  if ((presupuesto / 4) > restante) {
    clase = "alerta alerta-rojo";
  } else if ((presupuesto / 2) > restante) {
    clase = "alerta alerta-naranja";
  } else {
    clase = "alert alerta-verde";
  }

  divControlGastos.innerHTML = `<div class="gastos-realizados">
                              <h2>Listado de gastos</h2>
                              ${tablaGastos}
                              <div class="alert alert-success">
                              Presupuesto: $ ${presupuesto}</div>
                              <div class="${clase}">
                              Restante: $ ${restante}</div>

                              <button onclick="reiniciarPresupuesto()" class="botonPrincipal mr-top full-width">
                              Reiniciar presupuesto</button>
                            </div>`;
}


const reiniciarPresupuesto=()=>{
  localStorage.clear();
  location.reload(true);
}

const mostrarError = (elemento, mensaje) => {
  let divError = document.querySelector(elemento);
  divError.innerHTML = `<p class="alerta-error">${mensaje}</p>`;
  setTimeout(() => {
    divError.innerHTML = "";
  }, 2000);
}

