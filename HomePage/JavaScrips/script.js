function mostrarTransacciones() {
  fetch('http://localhost:3000/transacciones')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('conttabla');
      tableBody.innerHTML = '';
      data.forEach((transaction, index) => {
        const row = `
          <tr>
            <td>${transaction.id || index + 1}</td>
            <td>${transaction.tipo}</td>
            <td>${transaction.producto}</td>
            <td>${transaction.cantidad}</td>
            <td>${transaction.fechaHora}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => {
      console.error('Error al obtener las transacciones:', error);
    });
}

mostrarTransacciones();