export class Caja {
    constructor(referenciaCocina) {
        this.cocina = referenciaCocina;
        this.pedidos = [];
        this.totalAcumulado = 0;
    }

    agregarPedido(id, cantidad) {
        const producto = this.cocina.productos.find(p => p.id === id);
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return;
        }
        if (producto.stock < cantidad) {
            console.log(`\nStock insuficiente. Solo quedan ${producto.stock} unidades de "${producto.nombre}".\n`);
            return;
        }
        
        producto.stock -= cantidad;
        this.pedidos.push({
            id: producto.id,
            nombre: producto.nombre,
            cantidad: cantidad,
            precioCobrado: producto.precioConDescuento() // Se guarda el precio con descuento para el ticket
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

    calcularTicket() {
        console.log("\n=== TICKET DE COMPRA ===");
        if (this.pedidos.length === 0) {
            console.log("No hay pedidos para cobrar.\n");
            return;
        }

        const subtotal = this.pedidos.reduce((acc, { cantidad, precioCobrado }) => acc + (cantidad * precioCobrado), 0);
        const iva = subtotal * 0.16;
        const total = subtotal + iva;

        console.log(`Subtotal: $${subtotal.toFixed(2)}`);
        console.log(`IVA (16%): $${iva.toFixed(2)}`);
        console.log(`TOTAL A PAGAR: $${total.toFixed(2)}`);
        console.log("========================\n");
    }
}

// --- INTERFAZ DE CONSOLA PARA CAJA ---
export function uiAgregarPedidoCaja(rl, caja, callbackMenu) {
    rl.question("ID del producto: ", id => {
        rl.question("Cantidad: ", cantidad => {
            caja.agregarPedido(Number(id), Number(cantidad));
            callbackMenu();
        });
    });
}