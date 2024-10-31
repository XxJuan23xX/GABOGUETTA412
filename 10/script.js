class Nodo {
    constructor(cliente) {
        this.cliente = cliente;
        this.siguiente = null;
    }
}

class Cola {
    constructor() {
        this.frente = null;
        this.final = null;
        this.tamaño = 0;
        this.numeroTurnoActual = 1; // Contador para los números de turno, comienza en 1
        this.limite = 5; // Limite de personas en la cola
    }

    insertar(cliente) {
        if (this.tamaño >= this.limite) {
            return false; // No se puede agregar más personas
        }
        const nuevoNodo = new Nodo(cliente);
        if (this.isEmpty()) {
            this.frente = nuevoNodo;
            this.final = nuevoNodo;
        } else {
            this.final.siguiente = nuevoNodo;
            this.final = nuevoNodo;
        }
        this.tamaño++;
        return true; // Persona agregada exitosamente
    }

    atender() {
        if (this.isEmpty()) return null;
        const clienteAtendido = this.frente.cliente;
        this.frente = this.frente.siguiente;
        this.tamaño--;
        return clienteAtendido;
    }

    isEmpty() {
        return this.tamaño === 0;
    }

    mostrar() {
        let elementos = [];
        let actual = this.frente;
        while (actual) {
            elementos.push(actual.cliente);
            actual = actual.siguiente;
        }
        return elementos; 
    }

    tiempoDeEspera() {
        return this.tamaño * 10; 
    }

    obtenerYIncrementarTurno() {
        const turno = this.numeroTurnoActual;
        this.numeroTurnoActual++; // Incrementar para el siguiente cliente
        return turno;
    }
}

const cola = new Cola();

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("agregarBtn").addEventListener("click", () => {
        const nombreCliente = document.getElementById('nombreInput').value;
        const tipoMovimiento = document.getElementById('tipoMovimientoInput').value;
        const horaLlegada = new Date().toLocaleString(); 

        if (nombreCliente && tipoMovimiento) {
            if (cola.tamaño >= 10) {
                alert('La cola ha alcanzado el límite de 10 personas. No se pueden agregar más.');
            } else {
                const cliente = {
                    numeroTurno: cola.obtenerYIncrementarTurno(), 
                    nombre: nombreCliente,
                    tipoMovimiento: tipoMovimiento,
                    horaLlegada: horaLlegada
                };
                if (cola.insertar(cliente)) {
                    document.getElementById('nombreInput').value = '';
                    document.getElementById('tipoMovimientoInput').value = '';
                    document.getElementById('resultado').textContent = 'Cliente agregado a la cola.';
                }
            }
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    document.getElementById("atenderBtn").addEventListener("click", () => {
        const clienteAtendido = cola.atender();
        if (clienteAtendido) {
            const tiempoEspera = cola.tiempoDeEspera();
            alert(`Cliente atendido: ${clienteAtendido.nombre}\nTiempo de espera en la cola: ${tiempoEspera} segundos`);
            document.getElementById('resultado').textContent = `Cliente atendido: ${clienteAtendido.nombre}`;
        } else {
            alert('No hay clientes en la cola.');
        }
    });

    document.getElementById("mostrarBtn").addEventListener("click", () => {
        const elementos = cola.mostrar();
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = ''; 

        elementos.forEach((cliente, index) => {
            resultadoDiv.innerHTML += `
                <div class="cliente">
                    <h4>Cliente ${index + 1}</h4>
                    <p><strong>Número de Turno:</strong> ${cliente.numeroTurno}</p>
                    <p><strong>Nombre:</strong> ${cliente.nombre}</p>
                    <p><strong>Tipo de Movimiento:</strong> ${cliente.tipoMovimiento}</p>
                    <p><strong>Hora de Llegada:</strong> ${cliente.horaLlegada}</p>
                </div>
                <hr>
            `;
        });
    });
});
