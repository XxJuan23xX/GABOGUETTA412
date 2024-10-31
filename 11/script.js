class Nodo {
    constructor(coche) {
        this.coche = coche;
        this.siguiente = null;
    }
}

class Cola {
    constructor() {
        this.frente = null;
        this.final = null;
        this.tamaño = 0;
    }

    insertar(coche) {
        const nuevoNodo = new Nodo(coche);
        if (this.isEmpty()) {
            this.frente = nuevoNodo;
            this.final = nuevoNodo;
        } else {
            this.final.siguiente = nuevoNodo;
            this.final = nuevoNodo;
        }
        this.tamaño++;
    }

    atender() {
        if (this.isEmpty()) return null;
        const cocheAtendido = this.frente.coche;
        this.frente = this.frente.siguiente;
        this.tamaño--;
        return cocheAtendido;
    }

    isEmpty() {
        return this.tamaño === 0;
    }

    mostrar() {
        let elementos = [];
        let actual = this.frente;
        while (actual) {
            elementos.push(actual.coche);
            actual = actual.siguiente;
        }
        return elementos;
    }

    cantidad() {
        return this.tamaño;
    }
}

const cola = new Cola();
let record = { cantidad: 0 };
let intervalId;

document.addEventListener("DOMContentLoaded", function() {
    // Agregar coches a la cola cada 5 segundos
    intervalId = setInterval(() => {
        if (cola.cantidad() < 5) { // Solo agregar coches si hay menos de 5
            const nuevoCoche = `Coche ${cola.cantidad() + 1}`; // Nombre del coche
            const colorAleatorio = obtenerColorAleatorio(); // Obtener un color aleatorio
            cola.insertar({ nombre: nuevoCoche, color: colorAleatorio });
            document.getElementById('resultado').textContent = `Coches en la cola: ${cola.mostrar().map(c => `${c.nombre} (Color: ${c.color})`).join(', ')}`;
            actualizarColaVisual(); // Actualizar visualmente la cola de coches
        } else {
            clearInterval(intervalId); // Detener el intervalo si hay 5 coches
            alert(`Juego terminado. Total de coches pintados: ${record.cantidad}.`);
            desactivarBotones(); // Desactivar botones
        }
    }, 5000);

    const botonesColor = document.querySelectorAll('.color-btn');
    botonesColor.forEach(boton => {
        boton.addEventListener('click', () => {
            // Verificar si el juego ha terminado
            if (cola.cantidad() >= 5) {
                alert(`Juego terminado. Total de coches pintados: ${record.cantidad}.`);
                return; // No hacer nada si el juego ha terminado
            }

            const cocheAtendido = cola.frente ? cola.frente.coche : null; // Obtener el coche que se va a atender
            if (cocheAtendido) {
                if (boton.textContent.toLowerCase() === cocheAtendido.color.toLowerCase()) {
                    record.cantidad++;
                    alert(`Coche ${cocheAtendido.nombre} pintado de ${cocheAtendido.color}.`);

                    // Mostrar el coche pintado
                    mostrarCochePintado(cocheAtendido.color); // Llamar a la función para mostrar el coche pintado

                    // Eliminar el coche de la cola
                    cola.atender(); // Eliminar el coche atendido
                } else {
                    alert(`No se pintó ${cocheAtendido.nombre}, color incorrecto. Intenta de nuevo.`);
                }

                document.getElementById('resultado').textContent = `Coches en la cola: ${cola.mostrar().map(c => `${c.nombre} (Color: ${c.color})`).join(', ')}`;
                document.getElementById('contador').textContent = `Coches pintados: ${record.cantidad}`; // Actualizar contador

                // Verificar si la cola ha alcanzado 5 coches
                if (cola.cantidad() >= 5) {
                    clearInterval(intervalId);
                    alert(`Juego terminado. Total de coches pintados: ${record.cantidad}.`);
                    desactivarBotones(); // Desactivar botones
                }
            } else {
                alert('No hay coches en la cola para pintar.');
            }
        });
    });
});

// Función para obtener un color aleatorio
function obtenerColorAleatorio() {
    const colores = ['Naranja', 'Rojo', 'Verde'];
    return colores[Math.floor(Math.random() * colores.length)];
}

// Función para mostrar el coche pintado
function mostrarCochePintado(color) {
    const imagenCocheDiv = document.getElementById('cochePintado');
    const cocheImagen = document.createElement('img');
    cocheImagen.src = `${color.toLowerCase()}.jpg`; // Usa el nombre del color como nombre de archivo
    cocheImagen.alt = `Coche ${color}`;
    cocheImagen.style.width = '80px'; // Ajusta el tamaño de la imagen como desees
    imagenCocheDiv.innerHTML = ''; // Limpiar la imagen anterior
    imagenCocheDiv.appendChild(cocheImagen);
    setTimeout(() => {
        imagenCocheDiv.innerHTML = ''; // Ocultar la imagen después de 3 segundos
    }, 2000);
}

// Función para actualizar la visualización de la cola
function actualizarColaVisual() {
    const listaCoches = cola.mostrar();
    const colaDiv = document.getElementById('colaVisual');
    colaDiv.innerHTML = ''; // Limpiar la cola visual

    listaCoches.forEach(coche => {
        const cocheDiv = document.createElement('div');
        cocheDiv.className = 'coche';
        cocheDiv.innerHTML = `<img src="carrito.jpg" alt="${coche.nombre}" style="width: 50px; margin-right: 10px;" />`; // Usar la imagen del coche
        colaDiv.appendChild(cocheDiv);
    });
}

// Desactivar botones
function desactivarBotones() {
    const botonesColor = document.querySelectorAll('.color-btn');
    botonesColor.forEach(boton => {
        boton.disabled = true;
    });
}
