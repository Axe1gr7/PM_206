// ==========================================
// SECCIÓN: MÓDULO DE COCINA Y PRODUCTOS
// ==========================================

export class Producto {
    constructor(id, nombre, precio, stock, categoria, promocion = 0) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.promocion = promocion;
    }

    precioConDescuento() {
        if (this.promocion > 0) {
            return this.precio * (1 - this.promocion / 100);
        }
        return this.precio;
    }
}

export class Cocina {
    constructor() {
        this.productos = [
            new Producto(1, "Cafe", 30, 100, "bebida", 0),
            new Producto(2, "Conchas", 15, 50, "postre", 10),
            new Producto(3, "Te", 25, 80, "bebida", 0),
            new Producto(4, "Fresas", 40, 30, "postre", 5),
            new Producto(5, "Hotcakes", 50, 40, "desayuno", 0)
        ];
        this.idActual = 6;
        this.categorias = ["bebida", "postre", "desayuno"];
    }

    agregarCategoria(categoria) {
        if (!this.categorias.includes(categoria)) {
            this.categorias.push(categoria);
        }
    }

    agregarProducto(nombre, precio, stock, categoria, promocion = 0) {
        this.agregarCategoria(categoria);
        const nuevoProducto = new Producto(this.idActual++, nombre, precio, stock, categoria, promocion);
        this.productos.push(nuevoProducto);
        console.log("\nProducto agregado correctamente\n");
    }

    listarProductos() {
        console.log("\nLISTA DE PRODUCTOS (Administrador)\n");
        if (this.productos.length === 0) {
            console.log("No hay productos registrados\n");
        } else {
            const tabla = this.productos.map(p => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                stock: p.stock,
                categoria: p.categoria,
                promocion: p.promocion + "%"
            }));
            console.table(tabla);
        }
    }

    listarProductosPublico() {
        console.log("\nPRODUCTOS DISPONIBLES\n");
        if (this.productos.length === 0) {
            console.log("No hay productos registrados\n");
        } else {
            const productosPublico = this.productos.map(p => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                oferta: p.promocion > 0 ? `${p.promocion}% descuento: $${p.precioConDescuento().toFixed(2)}` : "Sin promoción"
            }));
            console.table(productosPublico);
        }
    }

    editarProducto(id, nombre, precio, stock, categoria, promocion) {
        const producto = this.productos.find(p => p.id === id);
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return false;
        }
        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        producto.categoria = categoria;
        producto.promocion = promocion;
        this.agregarCategoria(categoria);
        console.log("\nProducto actualizado correctamente\n");
        return true;
    }

    eliminarProducto(id) {
        const indice = this.productos.findIndex(p => p.id === id);
        if (indice === -1) {
            console.log("\nProducto no encontrado\n");
            return false;
        }
        this.productos.splice(indice, 1);
        console.log("\nProducto eliminado correctamente\n");
        return true;
    }

    buscarMasBaratos() { return this.productos.filter(p => p.precio < 40); }
    buscarMasCaros() { return this.productos.filter(p => p.precio > 40); }
    buscarPorCategoria(categoria) { return this.productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase()); }
    buscarBebidas() { return this.buscarPorCategoria("bebida"); }
    buscarPostres() { return this.buscarPorCategoria("postre"); }
    
    listarCategorias() {
        console.log("\nCategorías disponibles:", this.categorias.join(", "));
    }

    // [IMPLEMENTACIÓN DE IMAGEN: USO DE PROMESAS EN EL MÓDULO COCINA]
    actualizarEstatusPedidoPromesa(pedido, nuevoEstatus) {
        return new Promise((resolve, reject) => {
            if (!pedido) {
                reject("El pedido referenciado es inválido o no existe.");
            } else {
                pedido.estado = nuevoEstatus;
                resolve(`Estado del pedido actualizado exitosamente a: ${nuevoEstatus}`);
            }
        });
    }
}

// ==========================================
// SECCIÓN: INTERFAZ DE CONSOLA DE COCINA
// ==========================================

export function uiMostrarBusqueda(resultados, titulo) {
    console.log(`\n${titulo}:\n`);
    if (resultados.length === 0) {
        console.log("No se encontraron productos.\n");
    } else {
        console.table(resultados.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            categoria: p.categoria,
            promocion: p.promocion + "%"
        })));
    }
}

export function uiAgregarProductoCocina(rl, cocina, callbackMenu) {
    rl.question("Nombre: ", nombre => {
        rl.question("Precio: ", precio => {
            rl.question("Stock: ", stock => {
                cocina.listarCategorias();
                rl.question("Categoria (o nueva): ", categoria => {
                    rl.question("Promocion (% descuento, 0 si no): ", promocion => {
                        cocina.agregarProducto(nombre, Number(precio), Number(stock), categoria, Number(promocion));
                        callbackMenu();
                    });
                });
            });
        });
    });
}

export function uiEditarProductoCocina(rl, cocina, callbackMenu) {
    rl.question("ID del producto: ", id => {
        const producto = cocina.productos.find(p => p.id === Number(id));
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return callbackMenu();
        }
        rl.question(`Nuevo nombre (${producto.nombre}): `, nombre => {
            rl.question(`Nuevo precio (${producto.precio}): `, precio => {
                rl.question(`Nuevo stock (${producto.stock}): `, stock => {
                    cocina.listarCategorias();
                    rl.question(`Nueva categoria (${producto.categoria}): `, categoria => {
                        rl.question(`Nueva promocion % (${producto.promocion}): `, promocion => {
                            cocina.editarProducto(
                                Number(id),
                                nombre || producto.nombre,
                                Number(precio) || producto.precio,
                                Number(stock) || producto.stock,
                                categoria || producto.categoria,
                                Number(promocion) || producto.promocion
                            );
                            callbackMenu();
                        });
                    });
                });
            });
        });
    });
}

export function uiEliminarProductoCocina(rl, cocina, callbackMenu) {
    rl.question("ID del producto: ", id => {
        cocina.eliminarProducto(Number(id));
        callbackMenu();
    });
}

export function uiGestionarEstatusPedidos(rl, caja, cocina, callbackMenu) {
    console.log("\n--- CAMBIAR ESTADO DEL PEDIDO ---");
    if (caja.pedidos.length === 0) {
        console.log("No hay pedidos registrados en el sistema.\n");
        return callbackMenu();
    }
    caja.listarPedidos();

    rl.question("\nSelecciona el ID del pedido (0 para regresar): ", id => {
        if (id === "0") return callbackMenu();

        const pedido = caja.pedidos.find(p => p.idPedido === Number(id));
        if (!pedido) {
            console.log("\n[ERROR] El ID del pedido no existe.\n");
            return callbackMenu();
        }

        console.log("\n1. Preparando");
        console.log("2. Falta de ingredientes");
        console.log("3. Error de cocina");
        console.log("4. Listo");

        rl.question("Seleccione una opcion (1-4): ", opcion => {
            let nuevoEstatus = "";
            switch (opcion.trim()) {
                case "1": nuevoEstatus = "Preparando"; break;
                case "2": nuevoEstatus = "Falta de ingredientes"; break;
                case "3": nuevoEstatus = "Error de cocina"; break;
                case "4": nuevoEstatus = "Listo"; break;
                default:
                    console.log("\nOpción inválida. Regresando.\n");
                    return callbackMenu();
            }

            // [CONSUMO DE LA PROMESA DESDE LA INTERFAZ DE COCINA]
            cocina.actualizarEstatusPedidoPromesa(pedido, nuevoEstatus)
                .then(mensaje => {
                    console.log(`\n${mensaje}\n`);
                    callbackMenu();
                })
                .catch(error => {
                    console.log(`\n[ERROR] ${error}\n`);
                    callbackMenu();
                });
        });
    });
}

export function uiCancelarPedidoError(rl, caja, cocina, callbackMenu) {
    console.log("\n--- SECCIÓN DE ERRORES: CANCELACIÓN DE PEDIDOS ---");
    if (caja.pedidos.length === 0) {
        console.log("No hay pedidos registrados para gestionar errores.\n");
        return callbackMenu();
    }
    caja.listarPedidos();

    rl.question("\nSelecciona el ID del pedido a cancelar por error (0 para regresar): ", id => {
        if (id === "0") return callbackMenu();

        const pedido = caja.pedidos.find(p => p.idPedido === Number(id));
        if (!pedido) {
            console.log("\n[ERROR] El ID de pedido no existe.\n");
            return callbackMenu();
        }

        if (pedido.estado === "Listo" || pedido.estado.startsWith("Cancelado")) {
            console.log(`\n[ERROR] No se puede cambiar por error un pedido con estatus: '${pedido.estado}'.\n`);
            return callbackMenu();
        }

        console.log(`\n--- SELECCIONAR ERROR DE COCINA PARA PEDIDO #${pedido.idPedido} ---`);
        console.log("1. Falta de ingredientes (Agotado en Almacén)");
        console.log("2. Error de cocina (Platillo Quemado / Mal Elaborado)");
        console.log("3. Error de captura (Ticket Duplicado o Confuso)");

        rl.question("Seleccione una opcion: ", opcion => {
            let motivoError = "";
            switch (opcion.trim()) {
                case "1": motivoError = "Falta de ingredientes"; break;
                case "2": motivoError = "Error de cocina"; break;
                case "3": motivoError = "Error de captura"; break;
                default:
                    console.log("\nOpción de error inválida.\n");
                    return callbackMenu();
            }

            pedido.items.forEach(item => {
                const producto = cocina.productos.find(p => p.id === item.id);
                if (producto) producto.stock += item.cantidad;
            });

            const totalArticulos = pedido.items.reduce((acc, item) => acc + item.cantidad, 0);
            caja.totalArticulosVendidos -= totalArticulos;
            caja.gananciasTotales -= pedido.totalConIva;
            pedido.estado = `Cancelado por: ${motivoError}`;

            console.log(`\nEstado actualizado a: ${pedido.estado}`);
            console.log("Insumos devueltos al stock e importes financieros restados de Caja.\n");
            callbackMenu();
        });
    });
}