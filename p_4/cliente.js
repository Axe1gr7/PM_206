// ==========================================
// SECCIÓN: MÓDULO DEL CLIENTE
// ==========================================

export class Cliente {
    constructor(referenciaCocina, referenciaCaja) {
        this.cocina = referenciaCocina;
        this.caja = referenciaCaja;
    }

    consultarProductos() {
        this.cocina.listarProductosPublico();
    }

    crearPedidoCompleto(cliente, items) {
        this.caja.procesarOrden(cliente, items);
    }

    listarPedidos() {
        this.caja.listarPedidos();
    }

    verPromociones() {
        console.log("\n--- PROMOCIONES VIGENTES ---");
        const enOferta = this.cocina.productos.filter(p => p.promocion > 0);
        
        if (enOferta.length === 0) {
            console.log("No hay promociones por ahora.");
        } else {
            const tablaPromociones = enOferta.map(p => ({
                "ID": p.id,
                "Producto": p.nombre,
                "Descuento": `${p.promocion}% OFF`,
                "Precio Normal": `$${p.precio.toFixed(2)}`,
                "Precio Final": `$${p.precioConDescuento().toFixed(2)}`
            }));
            console.table(tablaPromociones);
        }
        console.log("----------------------------\n");
    }
}

// ==========================================
// SECCIÓN: INTERFAZ DE CONSOLA DE CLIENTE
// ==========================================

export function uiAgregarPedidoCliente(rl, cliente, callbackMenu) {
    rl.question("Escribe tu nombre: ", nombreCliente => {
        let itemsSolicitados = [];
        console.log("\n--- ARMA TU PEDIDO (Escriba 0 en ID para finalizar y ordenar) ---");

        const pedirProducto = () => {
            rl.question("ID del producto: ", id => {
                if (id === "0") {
                    if (itemsSolicitados.length > 0) {
                        cliente.crearPedidoCompleto(nombreCliente, itemsSolicitados);
                    } else {
                        console.log("\nPedido cancelado (vacío).\n");
                    }
                    return callbackMenu();
                }
                rl.question("Cantidad: ", cantidad => {
                    itemsSolicitados.push({ idProducto: Number(id), cantidad: Number(cantidad) });
                    pedirProducto();
                });
            });
        };
        pedirProducto();
    });
}

// [IMPLEMENTACIÓN DE IMAGEN: ASINCRONÍA Y SETTIMEOUT ÚNICAMENTE PARA REVISAR ESTATUS]
export function uiRevisarEstatusCliente(rl, cliente, callbackMenu) {
    if (cliente.caja.pedidos.length === 0) {
        console.log("\nAún no hay pedidos registrados.\n");
        return callbackMenu();
    }
    cliente.listarPedidos();
    rl.question("Ingrese el ID de su pedido para revisar el estatus actual: ", id => {
        const idPedido = Number(id);

        console.log("\n[ASÍNCRONO] Consultando el estado de tu orden en tiempo real...");
        
        setTimeout(() => {
            cliente.caja.obtenerEstatusPedido(idPedido, (err, pedido) => {
                if (err) {
                    console.log(`\nError devuelto por el Callback: ${err}\n`);
                    return callbackMenu();
                }

                console.log(`\n========================================`);
                console.log(`ESTADO DE TU PEDIDO: [${pedido.estado}]`);
                console.log(`========================================`);

                if (pedido.estado.startsWith("Cancelado")) {
                    console.log("[ALERTA]: Tu pedido fue cancelado por un incidente en cocina.");
                    console.log("Asiste a la ventanilla para aclaraciones.");
                } else if (pedido.estado === "Listo") {
                    console.log("¡Tu pedido está listo! Ya puedes pasar a recogerlo.");
                } else {
                    console.log("El pedido aún se encuentra en preparación por el personal de cocina.");
                }
                console.log(`========================================\n`);
                callbackMenu();
            });
        }, 1500); 
    });
}

// [IMPLEMENTACIÓN DE IMAGEN: GENERACIÓN INDEPENDIENTE DEL TICKET DE COMPRA EN EL CLIENTE]
export function uiGenerarTicketCliente(rl, cliente, callbackMenu) {
    if (cliente.caja.pedidos.length === 0) {
        console.log("\nAún no hay pedidos registrados.\n");
        return callbackMenu();
    }
    cliente.listarPedidos();
    rl.question("Ingrese el ID de su pedido para imprimir su ticket: ", id => {
        const idPedido = Number(id);

        cliente.caja.obtenerEstatusPedido(idPedido, (err, pedido) => {
            if (err) {
                console.log(`\nError: ${err}\n`);
                return callbackMenu();
            }

            if (pedido.estado.startsWith("Cancelado")) {
                console.log("\n[ERROR] No se puede generar el ticket de un pedido con estatus de cancelación.\n");
            } else {
                cliente.caja.calcularTicket(idPedido);
            }
            callbackMenu();
        });
    });
}