// ==========================================
// SECCIÓN: MÓDULO DE CAJA Y FINANZAS
// ==========================================

export class Caja {
    constructor(referenciaCocina) {
        this.cocina = referenciaCocina;
        this.pedidos = []; 
        this.idPedidoActual = 1;
        this.totalArticulosVendidos = 0;
        this.gananciasTotales = 0;
    }

    procesarOrden(nombreCliente, itemsSolicitados) {
        let itemsValidos = [];

        for (let req of itemsSolicitados) {
            const { idProducto, cantidad } = req; 
            const producto = this.cocina.productos.find(p => p.id === idProducto);
            
            if (!producto || producto.stock < cantidad) {
                console.log(`\n-> Producto ID ${idProducto} no disponible o stock insuficiente. Ignorado.`);
                continue;
            }

            producto.stock -= cantidad;
            let precioFinal = producto.precioConDescuento();
            let costoArticulos = precioFinal * cantidad;

            itemsValidos.push({
                id: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                precioCobrado: precioFinal,
                subtotal: costoArticulos
            });

            this.totalArticulosVendidos += cantidad;
        }

        if (itemsValidos.length === 0) {
            console.log("\nNo se pudo procesar ningún artículo. Pedido cancelado.\n");
            return;
        }

        const subtotalOrden = itemsValidos.reduce((acc, item) => acc + item.subtotal, 0);
        const ivaOrden = subtotalOrden * 0.16;
        const totalConIvaOrden = subtotalOrden + ivaOrden;

        const nuevoPedido = {
            idPedido: this.idPedidoActual++,
            cliente: nombreCliente,
            items: itemsValidos,
            totalSinIva: subtotalOrden,
            totalConIva: totalConIvaOrden,
            estado: "Pedido recibido"
        };

        this.pedidos.push(nuevoPedido);
        this.gananciasTotales += nuevoPedido.totalConIva;
        console.log(`\n¡Pedido #${nuevoPedido.idPedido} a nombre de "${nombreCliente}" registrado exitosamente!\n`);
    }

    listarPedidos() {
        console.log("\nLISTA DE PEDIDOS GENERALES\n");
        if (this.pedidos.length === 0) {
            console.log("No hay pedidos registrados\n");
        } else {
            const tabla = this.pedidos.map(p => ({
                "ID Pedido": p.idPedido,
                "Cliente": p.cliente,
                "Artículos Totales": p.items.reduce((acc, item) => acc + item.cantidad, 0),
                "Total (Con IVA)": `$${p.totalConIva.toFixed(2)}`,
                "Estado Actual": p.estado
            }));
            console.table(tabla);
        }
    }

    mostrarFinanzas() {
        console.log("\n=== FINANZAS Y ESTADÍSTICAS ===");
        console.log(`Total de pedidos realizados: ${this.pedidos.length}`);
        console.log(`Total de artículos vendidos: ${this.totalArticulosVendidos}`);
        console.log(`Ganancias totales (Total cobrado con IVA): $${this.gananciasTotales.toFixed(2)}`);
        console.log("===============================\n");
    }

    calcularTicket(idPedido) {
        const pedido = this.pedidos.find(p => p.idPedido === idPedido);
        if (!pedido) {
            console.log(`\nError: No se encontró el pedido con ID #${idPedido}.\n`);
            return;
        }

        console.log(`\n=========================================`);
        console.log(`        TICKET DE COMPRA - #${pedido.idPedido}`);
        console.log(` Cliente: ${pedido.cliente}`);
        console.log(`=========================================`);
        pedido.items.forEach(item => {
            console.log(` ${item.cantidad}x ${item.nombre.padEnd(15)} $${item.precioCobrado.toFixed(2)} c/u -> $${item.subtotal.toFixed(2)}`);
        });
        console.log(`-----------------------------------------`);
        const iva = pedido.totalSinIva * 0.16;
        console.log(` Subtotal:   $${pedido.totalSinIva.toFixed(2)}`);
        console.log(` IVA (16%):  $${iva.toFixed(2)}`);
        console.log(` TOTAL:      $${pedido.totalConIva.toFixed(2)}`);
        console.log(`=========================================\n`);
    }

    // [IMPLEMENTACIÓN DE IMAGEN: USO DE CALLBACKS EN EL MÓDULO DE CAJA]
    obtenerEstatusPedido(idPedido, callback) {
        const pedido = this.pedidos.find(p => p.idPedido === idPedido);
        if (!pedido) {
            callback("El ID de pedido solicitado no existe en la base de datos de Caja.", null);
        } else {
            callback(null, pedido);
        }
    }
}

// ==========================================
// SECCIÓN: INTERFAZ DE CONSOLA DE CAJA
// ==========================================

export function uiAgregarPedidoCaja(rl, caja, callbackMenu) {
    rl.question("Nombre del Cliente: ", nombreCliente => {
        let itemsSolicitados = [];
        console.log("\n--- AGREGAR PRODUCTOS (Escriba 0 en ID para finalizar pedido) ---");

        const pedirProducto = () => {
            rl.question("ID del producto: ", id => {
                if (id === "0") {
                    if (itemsSolicitados.length > 0) {
                        caja.procesarOrden(nombreCliente, itemsSolicitados);
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

export function uiGenerarTicketCaja(rl, caja, callbackMenu) {
    if (caja.pedidos.length === 0) {
        console.log("\nNo hay pedidos para generar ticket.\n");
        return callbackMenu();
    }
    caja.listarPedidos(); 
    rl.question("Ingrese el ID del pedido para imprimir su ticket: ", id => {
        caja.calcularTicket(Number(id));
        callbackMenu();
    });
}