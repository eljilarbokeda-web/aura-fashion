// ==========================================
// CONFIGURACIÓN
// ==========================================

// PON AQUÍ TU NÚMERO DE WHATSAPP
// IMPORTANTE:
// Colombia = 57
//
// Ejemplo:
// 573001234567

const NUMERO_WHATSAPP = "573147122064";


// ==========================================
// PRODUCTOS
// ==========================================

const productos = [
    {
        id: 1,
        nombre: "Buso Hellstar 1",
        categoria: "HOMBRE",
        descripcion: "Comodo y de buena calidad.",
        precio: 85000,
        imagen: "BUSOHELLSTAR1.jpg"
    },
    {
        id: 2,
        nombre: "Buso Hellstar 2",
        categoria: "HOMBRE",
        descripcion: "Estilo urbano y moderno.",
        precio: 120000,
        imagen: "BUSOHELLSTAR2.jpg"
    },
    {
        id: 3,
        nombre: "Sudadera Hellstar 1",
        categoria: "HOMBRE",
        descripcion: "Sudadera cómoda de alta calidad.",
        precio: 110000,
        imagen: "SUDADERAHELLSTAR3.jpg"
    },
    {
        id: 4,
        nombre: "Sudadera Hellstar 2",
        categoria: "HOMBRE",
        descripcion: "Diseño exclusivo y abrigado.",
        precio: 95000,
        imagen: "SUDADERAHELLSTAR4.jpg"
    },
    {
        id: 5,
        nombre: "",
        categoria: "HOMBRE",
        descripcion: ".",
        precio: 115000,
        imagen: "producto5.jpg"
    },
    {
        id: 6,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 150000,
        imagen: "producto6.jpg"
    },
    {
        id: 7,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 150000,
        imagen: "producto7.jpg"
    },
    {
        id: 8,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 150000,
        imagen: "producto8.jpg"
    },
    {
        id: 9,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 150000,
        imagen: "producto9.jpg"
    },
    {
        id: 10,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 50000,
        imagen: "producto10.jpg"
    },
    {
        id: 11,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 150000,
        imagen: "producto9.jpg"
    },
    {
        id: 12,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 150000,
        imagen: "producto9.jpg"
    },
    {
        id: 13,
        nombre: "",
        categoria: "Novedades",
        descripcion: ".",
        precio: 150000,
        imagen: "producto9.jpg"
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
    const contenedor = document.getElementById("productos-container");
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
                        onclick="agregarAlCarrito(${producto.id}, this)">
                        + Añadir
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}


// ==========================================
// NOTIFICACIÓN FLOTANTE (TOAST)
// ==========================================

function mostrarNotificacion(mensaje) {
    // Si ya hay una notificación en pantalla, la quitamos para que no se monten
    const alertaPrevia = document.getElementById("notificacion-carrito");
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const toast = document.createElement("div");
    toast.id = "notificacion-carrito";
    toast.textContent = mensaje;

    Object.assign(toast.style, {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        backgroundColor: "#111111",
        color: "#ffffff",
        padding: "14px 22px",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "14px",
        fontWeight: "600",
        zIndex: "9999",
        opacity: "0",
        transform: "translateY(10px)",
        transition: "all 0.3s ease"
    });

    document.body.appendChild(toast);

    // Animación de entrada
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 10);

    // Desaparece después de 2.5 segundos
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}


// ==========================================
// AÑADIR AL CARRITO
// ==========================================

function agregarAlCarrito(id, boton) {
    const producto = productos.find(producto => producto.id === id);
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();

    // 1. Mostrar notificación flotante en la esquina
    mostrarNotificacion("🛍️ Añadiste una compra al carrito");

    // 2. Cambiar temporalmente el botón presionado
    if (boton) {
        const textoOriginal = boton.innerText;
        boton.innerText = "✓ Añadido";
        boton.style.backgroundColor = "#25D366";
        boton.style.color = "#ffffff";

        setTimeout(() => {
            boton.innerText = textoOriginal;
            boton.style.backgroundColor = "";
            boton.style.color = "";
        }, 1200);
    }
}


// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function actualizarCarrito() {
    const contenedor = document.getElementById("carrito-productos");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    contador.textContent = carrito.reduce(
        (total, producto) => total + producto.cantidad,
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
        const item = document.createElement("div");
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
                    <button onclick="cambiarCantidad(${producto.id}, -1)">
                        −
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button onclick="cambiarCantidad(${producto.id}, 1)">
                        +
                    </button>

                    <button class="remove" onclick="eliminarProducto(${producto.id})">
                        Eliminar
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(item);
    });

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );

    totalElemento.textContent = formatoPrecio(total);
}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(item => item.id !== id);
    }

    actualizarCarrito();
}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
}


// ==========================================
// ABRIR CARRITO
// ==========================================

function abrirCarrito() {
    document.getElementById("carrito-overlay").classList.add("active");
}


// ==========================================
// CERRAR CARRITO
// ==========================================

function cerrarCarrito() {
    document.getElementById("carrito-overlay").classList.remove("active");
}


// ==========================================
// COMPRAR POR WHATSAPP
// ==========================================

function comprarWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola, Aura Fashion 👋\n\n";
    mensaje += "Quiero realizar el siguiente pedido:\n\n";

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;

        mensaje += `🛍️ ${producto.nombre}\n`;
        mensaje += `Cantidad: ${producto.cantidad}\n`;
        mensaje += `Precio: ${formatoPrecio(producto.precio)}\n`;
        mensaje += `Subtotal: ${formatoPrecio(subtotal)}\n\n`;
    });

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );

    mensaje += `💰 TOTAL: ${formatoPrecio(total)}\n\n`;
    mensaje += "Quedo atento/a para confirmar mi pedido. 😊";

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}


// ==========================================
// BOTÓN CONTACTAR WHATSAPP
// ==========================================

function contactarWhatsApp() {
    const mensaje = "Hola Aura Fashion 👋, quiero obtener información sobre sus productos.";
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}


// ==========================================
// INICIAR PÁGINA
// ==========================================

mostrarProductos();
actualizarCarrito();