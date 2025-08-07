document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-preguntas");

  fetch('/api/preguntas')
    .then(res => res.json())
    .then(preguntas => {
      if (preguntas.length === 0) {
        contenedor.innerHTML = `<p class="text-muted">Aún no hay preguntas registradas.</p>`;
        return;
      }

      preguntas.forEach(p => {
        console.log(p);
        const item = document.createElement('div');
        item.className = 'list-group-item';
        item.innerHTML = `
          <p>${p.pregunta}</p>
          <small class="text-muted">${new Date(p.fecha).toLocaleString()}</small>
        `;
        contenedor.appendChild(item);
      });
    })
    .catch(err => {
      console.error(err);
      contenedor.innerHTML = `<p class="text-danger">Error al cargar preguntas.</p>`;
    });
});
