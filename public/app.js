const btnCargar = document.getElementById('btnCargar');
const mensaje = document.getElementById('mensaje');
const listaProductos = document.getElementById('listaProductos');
const spinner = document.getElementById('spinner');
const inputBuscar = document.getElementById('inputBuscar');
const buscadorWrapper = document.getElementById('buscadorWrapper');

let productosGuardados = [];

btnCargar.addEventListener('click', cargarProductos);

inputBuscar.addEventListener('input', () => {
    const texto = inputBuscar.value.toLowerCase();
    const filtrados = productosGuardados.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
});

async function cargarProductos() {
    mensaje.textContent = '';
    listaProductos.innerHTML = '';
    spinner.style.display = 'flex';
    buscadorWrapper.style.display = 'none';
    inputBuscar.value = '';

    try {
        const respuesta = await fetch('/api/productos');

        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información');
        }

        const productos = await respuesta.json();
        productosGuardados = productos;

        spinner.style.display = 'none';
        mensaje.textContent = 'Productos cargados correctamente';
        buscadorWrapper.style.display = 'flex';

        mostrarProductos(productos);

    } catch (error) {
        spinner.style.display = 'none';
        mensaje.textContent = 'Ocurrió un error al cargar los productos';
        console.error(error);
    }
}

function mostrarProductos(productos) {
    listaProductos.innerHTML = '';

    if (productos.length === 0) {
        listaProductos.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        tarjeta.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
      `;

        listaProductos.appendChild(tarjeta);
    });
}