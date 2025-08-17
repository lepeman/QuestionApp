document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-preguntas");
  let i = 1;

  const cargarPreguntas = () => {
    fetch('/api/preguntas')
      .then(res => res.json())
      .then(preguntas => {
        contenedor.innerHTML = ""; // limpiar lista

        if (preguntas.length === 0) {
          contenedor.innerHTML = `<li class="list-group-item text-muted">Aún no hay preguntas registradas.</li>`;
          return;
        }

        preguntas.forEach(p => {
          const item = document.createElement('tr');
          //item.className = "list-group-item d-flex justify-content-between align-items-center";
          item.innerHTML = `
            <th scope="row">${ i++ }</th>
            <td>${p.pregunta}</td>
            <td>${ new Date(p.fecha).toLocaleString() }</td>
            <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
          `;

          // evento para eliminar
          const btnEliminar = item.querySelector("button");
          btnEliminar.addEventListener("click", () => eliminarPregunta(p.id));

          contenedor.appendChild(item);
        });
      })
      .catch(err => {
        console.error(err);
        contenedor.innerHTML = `<li class="list-group-item text-danger">Error al cargar preguntas.</li>`;
      });
  }

  const eliminarPregunta = (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta pregunta?")) return;

    fetch(`/api/preguntas/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          cargarPreguntas(); // recargar lista
        } else {
          alert("Error al eliminar la pregunta.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error en la conexión con el servidor.");
      });
  }

  cargarPreguntas();
});
