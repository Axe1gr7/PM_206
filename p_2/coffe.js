import readline from "readline";
import { Cocina } from "./cocina.js";
import { Caja } from "./caja.js";
import { Cliente } from "./cliente.js";

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
            case "1": mostrarMenuCaja(); break;
            case "2": mostrarMenuCocina(); break;
            case "3": mostrarMenuCliente(); break;
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
                caja.interfazAgregarPedido(rl, mostrarMenuCaja);
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
5. Buscar por categoría (Nueva función)
6. Regresar al menu principal

==============================
`);

    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1": cocina.interfazAgregarProducto(rl, mostrarMenuCocina); break;
            case "2": 
                cocina.listarProductos();
                mostrarMenuCocina();
                break;
            case "3": cocina.interfazEditarProducto(rl, mostrarMenuCocina); break;
            case "4": cocina.interfazEliminarProducto(rl, mostrarMenuCocina); break;
            case "5": cocina.interfazBuscarPorCategoria(rl, mostrarMenuCocina); break;
            case "6": mostrarMenuPrincipal(); break;
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
                cliente.interfazCrearPedido(rl, mostrarMenuCliente);
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

mostrarMenuPrincipal();