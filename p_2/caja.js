const readline = require('readline');

const productos = [
    { id: 1, nombre: "Cafe", precio: 30 },
    { id: 2, nombre: "Conchas", precio: 15 },
    { id: 3, nombre: "Te", precio: 25 },
    { id: 4, nombre: "Fresas", precio: 40 },
    { id: 5, nombre: "Hotcakes", precio: 50 }
];

const pedidos = [];
let totalAcumulado = 0;

const interfaz = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function agregarPedido(idProducto, cantidad) {
    let productoEncontrado = null;
    
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === idProducto) {
            productoEncontrado = productos[i];
        }
    }

    if (productoEncontrado !== null) {
        let subtotal = productoEncontrado.precio * cantidad;
        pedidos.push({ nombre: productoEncontrado.nombre, cantidad: cantidad, subtotal: subtotal });
        totalAcumulado = totalAcumulado + subtotal;
        console.log(`\nPedido agregado correctamente`);
    } else {
        console.log(`\nProducto no encontrado`);
    }
}

function verPedidos() {
    console.log(`\n--- LISTA DE PEDIDOS ---`);
    if (pedidos.length === 0) {
        console.log(`La lista de pedidos esta vacia`);
    } else {
        for (let i = 0; i < pedidos.length; i++) {
            console.log(`${pedidos[i].cantidad}x ${pedidos[i].nombre} - $${pedidos[i].subtotal}`);
        }
    }
    console.log(`Total acumulado: $${totalAcumulado}`);
}

function mostrarMenu() {
    console.log(`\n--- MENU CAJA ---`);
    console.log(`1. Agregar pedido`);
    console.log(`2. Ver lista de pedidos y total acumulado`);
    console.log(`3. Salir`);
    interfaz.question(`Elige una opcion: `, procesarOpcion);
}

function procesarOpcion(opcion) {
    if (opcion === "1") {
        interfaz.question(`ID del producto: `, function(id) {
            interfaz.question(`Cantidad: `, function(cantidad) {
                agregarPedido(parseInt(id), parseInt(cantidad));
                mostrarMenu();
            });
        });
    } else if (opcion === "2") {
        verPedidos();
        mostrarMenu();
    } else if (opcion === "3") {
        console.log(`Saliendo...`);
        interfaz.close();
    } else {
        console.log(`Opcion incorrecta`);
        mostrarMenu();
    }
}

mostrarMenu();