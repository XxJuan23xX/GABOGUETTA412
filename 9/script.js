class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

class Pila {
    constructor() {
        this.cima = null;
        this.tamaño = 0;
    }

    push(valor) {
        const nuevoNodo = new Nodo(valor);
        nuevoNodo.siguiente = this.cima;
        this.cima = nuevoNodo;
        this.tamaño++;
    }

    pop() {
        if (this.isEmpty()) return null;
        const valor = this.cima.valor;
        this.cima = this.cima.siguiente;
        this.tamaño--;
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

    reemplazar(indice, viejo, nuevo) {
        if (this.isEmpty()) return null; 
        if (indice < 0 || indice >= this.tamaño) return 'Índice no válido'; 

        let elementos = []; 
        let encontrado = false; 

        for (let i = 0; i < this.tamaño; i++) {
            const valor = this.pop(); //DESAPILAR EL VALOR
            if (i === indice) {
                if (valor === viejo) {
                    elementos.push(nuevo); 
                    encontrado = true; 
                } else {
                    elementos.push(valor);
                }
            } else {
                elementos.push(valor); 
            }
        }

        for (let i = elementos.length - 1; i >= 0; i--) { //APILAR DE NUEVO
            this.push(elementos[i]);
        }

        return encontrado ? 'Valor reemplazado correctamente' : 'Valor viejo no encontrado en la posición dada';
    }
}

const pila = new Pila();

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("agregarBtn").addEventListener("click", () => {
        const numero = document.getElementById('numeroInput').value;

        if (numero) {
            pila.push(Number(numero)); 
            document.getElementById('numeroInput').value = '';
            document.getElementById('resultado').textContent = 'Número agregado a la pila.';
        } else {
            alert('Por favor, ingrese un número.');
        }
    });

    document.getElementById("reemplazarBtn").addEventListener("click", () => {
        const indice = Number(document.getElementById('posicionInput').value);
        const viejo = Number(document.getElementById('viejoInput').value);
        const nuevo = Number(document.getElementById('nuevoInput').value);

        if (!isNaN(indice) && !isNaN(viejo) && !isNaN(nuevo)) {
            const resultado = pila.reemplazar(indice, viejo, nuevo);
            document.getElementById('resultado').textContent = resultado;
        } else {
            alert('Por favor, ingrese valores válidos.');
        }
    });

    document.getElementById("mostrarBtn").addEventListener("click", () => {
        const elementos = pila.mostrar();
        document.getElementById('resultado').textContent = `Elementos en la pila: ${elementos.join(', ')}`;
    });
});
