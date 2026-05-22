export class Caja {
    constructor(referenciaCocina) {
        this.cocina = referenciaCocina;
        this.pedidos = [];
        this.totalArticulos = 0;
        this.totalDinero = 0;
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
        console.log(`Artículos vendidos: ${this.totalArticulos}`);
        console.log(`Ingresos totales: $${this.totalDinero.toFixed(2)}\n`);
    }

    procesarPedido(id, cantidad) {
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
        const precioAplicado = producto.precioConDescuento();
        const subtotal = precioAplicado * cantidad;

        this.pedidos.push({ 
            id: producto.id,
            nombre: producto.nombre, 
            cantidad: cantidad,
            precioUnitario: `$${precioAplicado.toFixed(2)}`,
            subtotal: `$${subtotal.toFixed(2)}`
        });
        
        this.totalArticulos += cantidad;
        this.totalDinero += subtotal;
        console.log("\nPedido agregado correctamente\n");
    }

    // --- INTERFACES DE CONSOLA PARA CAJA ---
    interfazAgregarPedido(rl, callback) {
        rl.question("ID del producto: ", id => {
            rl.question("Cantidad a pedir: ", cantidad => {
                this.procesarPedido(Number(id), Number(cantidad));
                callback();
            });
        });
    }
}