
const tabla = document.querySelector(".tabla-habitaciones tbody");
const botonAgregar = document.querySelector("#agregar-habitacion");
const botonQuitar = document.querySelector("#quitar-habitacion");
let numHabitaciones = 6;
botonAgregar.addEventListener("click", agregarHabitacion);
botonQuitar.addEventListener("click", quitarHabitacion);
function agregarHabitacion() {
  numHabitaciones++;
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${numHabitaciones}0${numHabitaciones}</td>
    <td><input type="text" value="Individual"></td>
    <td><input type="text" value="1"></td>
    <td><input type="text" value="$500/mes"></td>
  `;
  tabla.appendChild(fila);
}
function quitarHabitacion() {		
if (numHabitaciones > 3) {
    numHabitaciones--;
    const ultimaFila = tabla.lastElementChild;
    if (confirm("¿Está seguro que desea eliminar esta fila?")) {
        tabla.removeChild(ultimaFila);
    }
} else if (numHabitaciones == 2 || numHabitaciones == 1){
    alert("No se puede eliminar esta fila");
}}
const formulario = document.querySelector('#registro-estudiante');
const tablaestudiante = document.querySelector('.tabla-estudiantes tbody');
formulario.addEventListener('submit', (event) => {
event.preventDefault();
const nombre = document.querySelector('#nombre').value;
const email = document.querySelector('#email').value;
const telefono = document.querySelector('#telefono').value;
const habitacion = document.querySelector('#tipo-habitacion').value;
const fila = document.createElement('tr');
fila.innerHTML = `<td>${nombre}</td><td>${email}</td><td>${telefono}</td><td>${habitacion}</td>
    <td><button type="eliminate" class="eliminar-fila" data-message="¿Está seguro que desea eliminar esta fila?">Eliminar</button></td>`;
tablaestudiante.appendChild(fila);
fila.querySelector('.eliminar-fila').addEventListener('click', () => {
const confirmacion = fila.querySelector('.eliminar-fila').getAttribute('data-message');
if (fila.rowIndex <= 2) { 
    alert('No se puede eliminar esta fila.'); 
} else if (confirm(confirmacion)) {
    fila.remove();
}});
formulario.reset();
formulario.style.display = 'none';
});
function mostrarFormulario() {
formulario.style.display = 'block';}
let datosCargadosXML = false;
function cargarDatosXML() {
  if (datosCargadosXML) {
    alert('Ya se han cargado los datos XML');
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "datos/habitaciones.xml", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var xml = xhr.responseXML;
        var filas = xml.getElementsByTagName("habitacion");
        var cuerpoTabla = document.getElementById("habitaciones-tabla-body");
        cuerpoTabla.innerHTML = "";
        for (var i = 0; i < filas.length; i++) {
          var filaXML = filas[i];
          var filaHTML = document.createElement("tr");
          var celdasXML = filaXML.children;
          for (var j = 0; j < celdasXML.length; j++) {
            var celdaXML = celdasXML[j];
            var celdaHTML = document.createElement("td");
            celdaHTML.textContent = celdaXML.textContent;
            filaHTML.appendChild(celdaHTML);
          }
          cuerpoTabla.appendChild(filaHTML);
        }
    
        datosCargadosXML = true;
      } else {
        alert("Error al cargar el archivo XML");
      }
    }
  };

  xhr.send();
}
let datosCargadosJson = false;
function cargarDatosJSON() {
  if (datosCargadosJson) {
    alert('Ya se han cargado los datos JSON');
    return;
  }
  fetch('datos/estudiantes.json')
    .then(response => response.json()) 
    .then(data => {
      mostrarDatos(data);
      datosCargadosJson = true;
    })
    .catch(error => {
    
      alert('Error al cargar los datos JSON');
    });
}
function mostrarDatos(estudiantes) {
  const bodyTablaEstudiantes = document.getElementById('estudiantes-tabla-body');
  bodyTablaEstudiantes.innerHTML = '';
  estudiantes.forEach(estudiante => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${estudiante.Nombre}</td>
      <td>${estudiante.Correo}</td>
      <td>${estudiante.Telefono}</td>
      <td>${estudiante.Habitacion}</td>
      <td>${estudiante.Opcion}</td>
    `;
    bodyTablaEstudiantes.appendChild(fila);
  });
}
