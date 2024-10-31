// Nodo para el auto
class Auto {
    constructor(placa, propietario, horaEntrada) {
        this.placa = placa;
        this.propietario = propietario;
        this.horaEntrada = horaEntrada;
        this.next = null; // Siguiente nodo
        this.prev = null; // Nodo anterior
    }
}

// Cola Circular Doblemente Enlazada
class Estacionamiento {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Método para ingresar un auto
    entradaAuto(placa, propietario) {
        const horaEntrada = new Date();
        const nuevoAuto = new Auto(placa, propietario, horaEntrada);

        if (this.size === 0) {
            this.head = nuevoAuto;
            this.tail = nuevoAuto;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            nuevoAuto.prev = this.tail;
            nuevoAuto.next = this.head;
            this.tail.next = nuevoAuto;
            this.head.prev = nuevoAuto;
            this.tail = nuevoAuto;
        }

        this.size++;
        this.log(`Auto con placa ${placa} ingresado a las ${horaEntrada.toLocaleTimeString()}`);
        this.actualizarListaEstacionamiento();
    }

    // Método para sacar un auto
    salidaAuto() {
        if (this.size === 0) {
            this.log('El estacionamiento está vacío');
            return;
        }

        const autoSalida = this.head;
        const horaSalida = new Date();
        const tiempoEstacionado = Math.floor((horaSalida - autoSalida.horaEntrada) / 1000); // en segundos
        const costo = tiempoEstacionado * 2; // $2 por segundo

        this.log(`Placa: ${autoSalida.placa}`);
        this.log(`Propietario: ${autoSalida.propietario}`);
        this.log(`Hora de entrada: ${autoSalida.horaEntrada.toLocaleTimeString()}`);
        this.log(`Hora de salida: ${horaSalida.toLocaleTimeString()}`);
        this.log(`Tiempo estacionado: ${tiempoEstacionado} segundos`);
        this.log(`Costo total: $${costo}`);

        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.tail.next = this.head;
            this.head.prev = this.tail;
        }

        this.size--;
        this.actualizarListaEstacionamiento();
    }

    // Verifica si el estacionamiento está vacío
    estaVacio() {
        return this.size === 0;
    }

    // Método para registrar mensajes en el log
    log(message) {
        const logOutput = document.getElementById('logOutput');
        logOutput.textContent += message + '\n';
    }

    // Método para actualizar la lista de autos en el estacionamiento
    actualizarListaEstacionamiento() {
        const listaEstacionamiento = document.getElementById('listaEstacionamiento');
        listaEstacionamiento.innerHTML = ''; // Limpiar lista

        if (this.size === 0) {
            listaEstacionamiento.innerHTML = '<li>No hay autos en el estacionamiento</li>';
            return;
        }

        let actual = this.head;
        for (let i = 0; i < this.size; i++) {
            const li = document.createElement('li');
            li.textContent = `Placa: ${actual.placa}, Propietario: ${actual.propietario}, Entrada: ${actual.horaEntrada.toLocaleTimeString()}`;
            listaEstacionamiento.appendChild(li);
            actual = actual.next;
        }
    }
}

// Simulación del sistema
const estacionamiento = new Estacionamiento();

document.getElementById('entradaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const placa = document.getElementById('placa').value;
    const propietario = document.getElementById('propietario').value;
    estacionamiento.entradaAuto(placa, propietario);
    this.reset();
});

document.getElementById('salidaAuto').addEventListener('click', function() {
    estacionamiento.salidaAuto();
});
