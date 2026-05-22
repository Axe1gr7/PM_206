export class Producto {
    constructor(id, nombre, precio, stock, categoria, promocion = 0) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.promocion = promocion; // porcentaje de descuento (0-100)
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
        if (!this.categorias.includes(categoria)) {
            this.categorias.push(categoria);
        }
        const nuevoProducto = new Producto(
            this.idActual++,
            nombre,
            precio,
            stock,
            categoria,
            promocion
        );
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
                categoria: p.categoria,
                oferta: p.promocion > 0 ? `${p.promocion}% desc -> $${p.precioConDescuento().toFixed(2)}` : "Sin promoción"
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
        if (!this.categorias.includes(categoria)) {
            this.categorias.push(categoria);
        }
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

    buscarMasBaratos() {
        if (this.productos.length === 0) return [];
        const minPrecio = Math.min(...this.productos.map(p => p.precio));
        return this.productos.filter(p => p.precio === minPrecio);
    }

    buscarMasCaros() {
        if (this.productos.length === 0) return [];
        const maxPrecio = Math.max(...this.productos.map(p => p.precio));
        return this.productos.filter(p => p.precio === maxPrecio);
    }

    buscarPorCategoria(categoria) {
        return this.productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    listarCategorias() {
        console.log("\nCategorías disponibles:", this.categorias.join(", "));
    }

    // --- INTERFACES DE CONSOLA PARA COCINA ---

    interfazAgregarProducto(rl, callback) {
        rl.question("Nombre del producto: ", nombre => {
            rl.question("Precio: ", precio => {
                rl.question("Stock: ", stock => {
                    rl.question("Categoría: ", categoria => {
                        rl.question("Promoción (% de descuento): ", promocion => {
                            this.agregarProducto(
                                nombre, 
                                Number(precio), 
                                Number(stock), 
                                categoria, 
                                Number(promocion)
                            );
                            callback();
                        });
                    });
                });
            });
        });
    }

    interfazEditarProducto(rl, callback) {
        rl.question("Ingrese ID del producto: ", id => {
            const existe = this.productos.find(p => p.id === Number(id));
            if (!existe) {
                console.log("\nProducto no encontrado\n");
                return callback();
            }

            rl.question("Nuevo nombre: ", nombre => {
                rl.question("Nuevo precio: ", precio => {
                    rl.question("Nuevo stock: ", stock => {
                        rl.question("Nueva categoría: ", categoria => {
                            rl.question("Nueva promoción (%): ", promocion => {
                                this.editarProducto(
                                    Number(id), nombre, Number(precio), 
                                    Number(stock), categoria, Number(promocion)
                                );
                                callback();
                            });
                        });
                    });
                });
            });
        });
    }

    interfazEliminarProducto(rl, callback) {
        rl.question("Ingrese ID del producto a eliminar: ", id => {
            this.eliminarProducto(Number(id));
            callback();
        });
    }

    interfazBuscarPorCategoria(rl, callback) {
        this.listarCategorias();
        rl.question("\nIngrese la categoría a buscar: ", categoria => {
            const resultados = this.buscarPorCategoria(categoria);
            if (resultados.length === 0) {
                console.log("\nNo se encontraron productos en esa categoría\n");
            } else {
                console.log(`\nPRODUCTOS DE LA CATEGORÍA: ${categoria.toUpperCase()}\n`);
                console.table(resultados.map(p => ({ id: p.id, nombre: p.nombre, precio: p.precio })));
            }
            callback();
        });
    }
}