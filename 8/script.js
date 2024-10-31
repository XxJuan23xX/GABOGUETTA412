class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

class Pila {
    constructor() {
        this.cima = null;
    }

    push(valor) {
        const nuevoNodo = new Nodo(valor);
        nuevoNodo.siguiente = this.cima;
        this.cima = nuevoNodo;
    }

    pop() {
        if (this.isEmpty()) return null;
        const valor = this.cima.valor;
        this.cima = this.cima.siguiente;
        return valor;
    }

    isEmpty() {
        return this.cima === null;
    }

    mostrar() {
        let elementos = [];
        let actual = this.cima;
        while (actual) {
            elementos.push(actual.valor);
            actual = actual.siguiente;
        }
        return elementos.reverse(); 
    }
}

const pila = new Pila();

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("sumarBtn").addEventListener("click", () => {
        const numero = document.getElementById('numeroInput').value;

        if (numero) {
            pila.push(numero);
            document.getElementById('numeroInput').value = '';
            document.getElementById('resultado').textContent = 'Número agregado a la pila.';
        } else {
            alert('Por favor, ingrese un número.');
        }
    });

    document.getElementById("calcularBtn").addEventListener("click", () => {
        let suma = BigInt(0);
        while (!pila.isEmpty()) {
            suma += BigInt(pila.pop());
        }
        document.getElementById('resultado').textContent = `La suma total es: ${suma}`;
    });

    document.getElementById("mostrarBtn").addEventListener("click", () => {
        const elementos = pila.mostrar();
        document.getElementById('resultado').textContent = `Elementos en la pila: ${elementos.join(', ')}`;
    });
});
