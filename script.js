// ==========================================
// CONFIGURACIÓN
// ==========================================

// PON AQUÍ TU NÚMERO DE WHATSAPP
// IMPORTANTE:
// Colombia = 57
//
// Ejemplo:
// 573001234567

const NUMERO_WHATSAPP = "3147122064";


// ==========================================
// PRODUCTOS
// ==========================================

const productos = [

    {
        id: 1,
        nombre: "Camisa Casual",
        categoria: "Mujer",
        descripcion: "Camisa moderna y cómoda para cualquier ocasión.",
        precio: 85000,
        imagen: "producto1.jpg"
    },

    {
        id: 2,
        nombre: "Vestido Elegante",
        categoria: "Mujer",
        descripcion: "Vestido ideal para ocasiones especiales.",
        precio: 120000,
        imagen: "producto2.jpg"
    },

    {
        id: 3,
        nombre: "Jean Clásico",
        categoria: "Mujer",
        descripcion: "Jean cómodo con diseño moderno.",
        precio: 110000,
        imagen: "producto3.jpg"
    },

    {
        id: 4,
        nombre: "Camisa Hombre",
        categoria: "Hombre",
        descripcion: "Camisa casual para un estilo moderno.",
        precio: 95000,
        imagen: "producto4.jpg"
    },

    {
        id: 5,
        nombre: "Pantalón Hombre",
        categoria: "Hombre",
        descripcion: "Pantalón cómodo y versátil.",
        precio: 115000,
        imagen: "producto5.jpg"
    },

    {
        id: 6,
        nombre: "Conjunto Fashion",
        categoria: "Novedades",
        descripcion: "Conjunto moderno para destacar tu estilo.",
        precio: 150000,
        imagen: "producto6.jpg"
    },
     {
        id: 7,
        nombre: "Conjunto Fashion",
        categoria: "Novedades",
        descripcion: "Conjunto moderno para destacar tu estilo.",
        precio: 150000,
        imagen: "producto6.jpg"
    },
     {
        id: 8,
        nombre: "Conjunto Fashion",
        categoria: "Novedades",
        descripcion: "Conjunto moderno para destacar tu estilo.",
        precio: 150000,
        imagen: "producto6.jpg"
    },
     {
        id: 9,
        nombre: "Conjunto Fashion",
        categoria: "Novedades",
        descripcion: "Conjunto moderno para destacar tu estilo.",
        precio: 150000,
        imagen: "producto6.jpg"
    },
     {
        id: 10,
        nombre: "Conjunto Fashion",
        categoria: "Novedades",
        descripcion: "Conjunto moderno para destacar tu estilo.",
        precio: 50000,
        imagen: "producto6.jpg"
    }

];


// ==========================================
// CARRITO
// ==========================================

let carrito = [];


// ==========================================
// FORMATO DE DINERO
// ==========================================

function formatoPrecio(precio) {

    return precio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });

}


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos() {

    const contenedor =
        document.getElementById("productos-container");

    contenedor.innerHTML = "";


    productos.forEach(producto => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("product-card");


        tarjeta.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="product-image"
            >

            <div class="product-info">

                <span class="product-category">
                    ${producto.categoria}
                </span>

                <h3 class="product-name">
                    ${producto.nombre}
                </h3>

                <p class="product-description">
                    ${producto.descripcion}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ${formatoPrecio(producto.precio)}
                    </span>

                    <button
                        class="add-button"
                        onclick="agregarAlCarrito(${producto.id})">

                        + Añadir

                    </button>

                </div>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


// ==========================================
// AÑADIR AL CARRITO
// ==========================================

function agregarAlCarrito(id) {

    const producto = productos.find(
        producto => producto.id === id
    );


    const productoExistente =
        carrito.find(item => item.id === id);


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            ...producto,

            cantidad: 1

        });

    }


    actualizarCarrito();


    // Abrir carrito automáticamente

    abrirCarrito();

}


// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function actualizarCarrito() {

    const contenedor =
        document.getElementById("carrito-productos");

    const contador =
        document.getElementById("contador");

    const totalElemento =
        document.getElementById("total");


    contador.textContent =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

        totalElemento.textContent = "$0";

        return;

    }


    contenedor.innerHTML = "";


    carrito.forEach(producto => {

        const item =
            document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <div class="cart-item-info">

                <h4>
                    ${producto.nombre}
                </h4>

                <div class="cart-item-price">
                    ${formatoPrecio(producto.precio)}
                </div>

                <div class="quantity">

                    <button
                        onclick="cambiarCantidad(
                            ${producto.id},
                            -1
                        )">

                        −

                    </button>


                    <span>
                        ${producto.cantidad}
                    </span>


                    <button
                        onclick="cambiarCantidad(
                            ${producto.id},
                            1
                        )">

                        +

                    </button>


                    <button
                        class="remove"
                        onclick="eliminarProducto(
                            ${producto.id}
                        )">

                        Eliminar

                    </button>

                </div>

            </div>

        `;


        contenedor.appendChild(item);

    });


    const total =
        carrito.reduce(
            (suma, producto) =>
                suma +
                producto.precio *
                producto.cantidad,
            0
        );


    totalElemento.textContent =
        formatoPrecio(total);

}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(item => item.id === id);


    if (!producto) return;


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(
                item => item.id !== id
            );

    }


    actualizarCarrito();

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            producto => producto.id !== id
        );


    actualizarCarrito();

}


// ==========================================
// ABRIR CARRITO
// ==========================================

function abrirCarrito() {

    document
        .getElementById("carrito-overlay")
        .classList
        .add("active");

}


// ==========================================
// CERRAR CARRITO
// ==========================================

function cerrarCarrito() {

    document
        .getElementById("carrito-overlay")
        .classList
        .remove("active");

}


// ==========================================
// COMPRAR POR WHATSAPP
// ==========================================

function comprarWhatsApp() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    let mensaje =
        "Hola, Aura Fashion 👋\n\n";

    mensaje +=
        "Quiero realizar el siguiente pedido:\n\n";


    carrito.forEach(producto => {

        const subtotal =
            producto.precio *
            producto.cantidad;


        mensaje +=
            `🛍️ ${producto.nombre}\n`;

        mensaje +=
            `Cantidad: ${producto.cantidad}\n`;

        mensaje +=
            `Precio: ${formatoPrecio(producto.precio)}\n`;

        mensaje +=
            `Subtotal: ${formatoPrecio(subtotal)}\n\n`;

    });


    const total =
        carrito.reduce(
            (suma, producto) =>
                suma +
                producto.precio *
                producto.cantidad,
            0
        );


    mensaje +=
        `💰 TOTAL: ${formatoPrecio(total)}\n\n`;

    mensaje +=
        "Quedo atento/a para confirmar mi pedido. 😊";


    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;


    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// BOTÓN CONTACTAR WHATSAPP
// ==========================================

function contactarWhatsApp() {

    const mensaje =
        "Hola Aura Fashion 👋, quiero obtener información sobre sus productos.";


    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;


    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// INICIAR PÁGINA
// ==========================================

mostrarProductos();

actualizarCarrito();