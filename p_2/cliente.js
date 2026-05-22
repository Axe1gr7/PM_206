export class Cliente {
    constructor(referenciaCocina, referenciaCaja) {
        this.cocina = referenciaCocina;
        this.caja = referenciaCaja;
    }

    consultarProductos() {
        this.cocina.listarProductosPublico();
    }

    listarPedidos() {
        this.caja.listarPedidos();
    }

    // --- INTERFACES DE CONSOLA PARA CLIENTE ---
    interfazCrearPedido(rl, callback) {
        rl.question("ID del producto: ", id => {
            rl.question("Cantidad a pedir: ", cantidad => {
                this.caja.procesarPedido(Number(id), Number(cantidad));
                callback();
            });
        });
    }
}