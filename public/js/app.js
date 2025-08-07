document.getElementById('formulario').addEventListener('submit', async (e) => {
      e.preventDefault();

      const pregunta = document.getElementById('pregunta').value.trim();
      const alerta = document.getElementById('alerta');

      if (!pregunta) {
        alerta.textContent = 'La pregunta no puede estar vacía.';
        alerta.className = 'alert alert-warning mt-3';
        alerta.classList.remove('d-none');
        return;
      }

      const res = await fetch('/preguntas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ pregunta })
      });

      if (res.ok) {
        alerta.textContent = 'Tu pregunta fue enviada de forma anónima.';
        alerta.className = 'alert alert-success mt-3';
        document.getElementById('formulario').reset();
      } else {
        alerta.textContent = 'Hubo un error al enviar la pregunta.';
        alerta.className = 'alert alert-danger mt-3';
      }

      alerta.classList.remove('d-none');
    });