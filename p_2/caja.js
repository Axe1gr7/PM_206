const readline = require("readline");

class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

class Cocina {
    constructor() {
        this.productos = [
            new Producto(1, "Cafe", 30, 100),
            new Producto(2, "Conchas", 15, 50),
            new Producto(3, "Te", 25, 80),
            new Producto(4, "Fresas", 40, 30),
            new Producto(5, "Hotcakes", 50, 40)
        ];
        this.idActual = 6;
    }

    agregarProducto(nombre, precio, stock) {
        const nuevoProducto = new Producto(
            this.idActual++,
            nombre,
            precio,
            stock
        );
        this.productos.push(nuevoProducto);
        console.log("\nProducto agregado correctamente\n");
    }

    // Listado completo (con stock) - para módulo Cocina
    listarProductos() {
        console.log("\nLISTA DE PRODUCTOS (Administrador)\n");
        if (this.productos.length === 0) {
            console.log("No hay productos registrados\n");
        } else {
            console.table(this.productos);
        }
    }

    // Listado público (sin stock) - para clientes
    listarProductosPublico() {
        console.log("\nPRODUCTOS DISPONIBLES\n");
        if (this.productos.length === 0) {
            console.log("No hay productos registrados\n");
        } else {
            const productosPublico = this.productos.map(p => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio
            }));
            console.table(productosPublico);
        }
    }

    editarProducto(id, nombre, precio, stock) {
        const producto = this.productos.find(
            producto => producto.id === id
        );

        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return false;
        }

        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        console.log("\nProducto actualizado correctamente\n");
        return true;
    }

    eliminarProducto(id) {
        const indice = this.productos.findIndex(
            producto => producto.id === id
        );

        if (indice === -1) {
            console.log("\nProducto no encontrado\n");
            return false;
        }

        this.productos.splice(indice, 1);
        console.log("\nProducto eliminado correctamente\n");
        return true;
    }
}

class Caja {
    constructor(referenciaCocina) {
        this.cocina = referenciaCocina;
        this.pedidos = [];
        this.totalAcumulado = 0;
    }

    agregarPedido(id, cantidad) {
        const producto = this.cocina.productos.find(
            producto => producto.id === id
        );

        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return;
        }

        // Verificar stock suficiente
        if (producto.stock < cantidad) {
            console.log(`\nStock insuficiente. Solo quedan ${producto.stock} unidades de "${producto.nombre}".\n`);
            return;
        }

        // Reducir stock
        producto.stock -= cantidad;

        this.pedidos.push({ 
            id: producto.id,
            nombre: producto.nombre, 
            cantidad: cantidad 
        });
        this.totalAcumulado += cantidad;
        console.log("\nPedido agregado correctamente\n");
    }

    listarPedidos() {
        console.log("\nLISTA DE PEDIDOS\n");
        if (this.pedidos.length === 0) {
            console.log("No hay pedidos registrados\n");
        } else {
            console.table(this.pedidos);
        }
    }

    mostrarTotalAcumulado() {
        console.log("\nTOTAL ACUMULADO\n");
        console.log(`Total de artículos pedidos: ${this.totalAcumulado}\n`);
    }
}

class Cliente {
    constructor(referenciaCocina, referenciaCaja) {
        this.cocina = referenciaCocina;
        this.caja = referenciaCaja;
    }

    consultarProductos() {
        // El cliente ve solo id, nombre y precio (sin stock)
        this.cocina.listarProductosPublico();
    }

    crearPedido(id, cantidad) {
        this.caja.agregarPedido(id, cantidad);
    }

    listarPedidos() {
        this.caja.listarPedidos();
    }
}

const cocina = new Cocina();
const caja = new Caja(cocina);
const cliente = new Cliente(cocina, caja);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenuPrincipal() {
    console.log(`
==============================
      SISTEMA PRINCIPAL
==============================

1. Modulo Caja
2. Modulo Cocina
3. Modulo Cliente
4. Salir

==============================
`);

    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                mostrarMenuCaja();
                break;
            case "2":
                mostrarMenuCocina();
                break;
            case "3":
                mostrarMenuCliente();
                break;
            case "4":
                console.log("\nPrograma finalizado");
                rl.close();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuPrincipal();
                break;
        }
    });
}

function mostrarMenuCaja() {
    console.log(`
==============================
        MODULO CAJA
==============================

1. Lista de pedidos
2. Total acumulado
3. Agregar pedido
4. Regresar al menu principal

==============================
`);

    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                caja.listarPedidos();
                mostrarMenuCaja();
                break;
            case "2":
                caja.mostrarTotalAcumulado();
                mostrarMenuCaja();
                break;
            case "3":
                agregarPedidoCaja();
                break;
            case "4":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuCaja();
                break;
        }
    });
}

function mostrarMenuCocina() {
    console.log(`
==============================
       MODULO COCINA
==============================

1. Agregar producto
2. Listar productos
3. Editar producto
4. Eliminar producto
5. Regresar al menu principal

==============================
`);

    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                agregarProductoCocina();
                break;
            case "2":
                cocina.listarProductos();
                mostrarMenuCocina();
                break;
            case "3":
                editarProductoCocina();
                break;
            case "4":
                eliminarProductoCocina();
                break;
            case "5":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuCocina();
                break;
        }
    });
}

function mostrarMenuCliente() {
    console.log(`
==============================
       MODULO CLIENTE
==============================

1. Consultar Productos
2. Crear pedido
3. Listar pedidos
4. Regresar al menu principal

==============================
`);

    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                cliente.consultarProductos();
                mostrarMenuCliente();
                break;
            case "2":
                agregarPedidoCliente();
                break;
            case "3":
                cliente.listarPedidos();
                mostrarMenuCliente();
                break;
            case "4":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuCliente();
                break;
        }
    });
}

function agregarProductoCocina() {
    rl.question("Nombre del producto: ", nombre => {
        rl.question("Precio: ", precio => {
            rl.question("Stock: ", stock => {
                cocina.agregarProducto(
                    nombre,
                    Number(precio),
                    Number(stock)
                );
                mostrarMenuCocina();
            });
        });
    });
}

function editarProductoCocina() {
    rl.question("Ingrese ID del producto: ", id => {
        const productoExiste = cocina.productos.find(
            producto => producto.id === Number(id)
        );

        if (!productoExiste) {
            console.log("\nProducto no encontrado\n");
            mostrarMenuCocina();
            return;
        }

        rl.question("Nuevo nombre: ", nombre => {
            rl.question("Nuevo precio: ", precio => {
                rl.question("Nuevo stock: ", stock => {
                    cocina.editarProducto(
                        Number(id),
                        nombre,
                        Number(precio),
                        Number(stock)
                    );
                    mostrarMenuCocina();
                });
            });
        });
    });
}

function eliminarProductoCocina() {
    rl.question("Ingrese ID del producto a eliminar: ", id => {
        cocina.eliminarProducto(Number(id));
        mostrarMenuCocina();
    });
}

function agregarPedidoCaja() {
    rl.question("ID del producto: ", id => {
        rl.question("Cantidad a pedir: ", cantidad => {
            caja.agregarPedido(Number(id), Number(cantidad));
            mostrarMenuCaja();
        });
    });
}

function agregarPedidoCliente() {
    rl.question("ID del producto: ", id => {
        rl.question("Cantidad a pedir: ", cantidad => {
            cliente.crearPedido(Number(id), Number(cantidad));
            mostrarMenuCliente();
        });
    });
}

mostrarMenuPrincipal();