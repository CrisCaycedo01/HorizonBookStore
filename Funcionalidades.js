// Selecciona todos los botones de carrito
document.querySelectorAll('.btn-carrito').forEach((btn, idx) => {
  btn.addEventListener('click', function() {
    // Encuentra el contenedor del libro
    const card = btn.closest('.card-libro');
    const img = card.querySelector('img').getAttribute('src');
    const titulo = card.querySelector('img').getAttribute('alt') || 'Libro';
    const precio = card.querySelector('.precio').textContent.replace('$', '').trim();

    // Crea el objeto libro
    const libro = { titulo, precio, img };

    // Obtiene el carrito actual o crea uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(libro);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Redirige a la página de pago
    window.location.href = 'payment.html';
  });
});
// Selecciona el contenedor donde se mostrarán los libros
const contenedorLibros = document.querySelector('.contenedor-libros');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderCarrito() {
  contenedorLibros.innerHTML = '';
  carrito.forEach((libro, idx) => {
    contenedorLibros.innerHTML += `
      <div class="libro-card">
        <img src="${libro.img}" alt="${libro.titulo}" class="img7" height="120" width="80"/>
        <div class="libro-info">
          <p>${libro.titulo}</p>
          <p class="precio">$${libro.precio}</p>
          <button class="btn-eliminar" data-idx="${idx}">Eliminar</button>
        </div>
      </div>
    `;
  });

  // Botón eliminar
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', function() {
      carrito.splice(this.dataset.idx, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
    });
  });
}

renderCarrito();