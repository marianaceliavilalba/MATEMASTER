// Funciones de la calculadora
let calcDisplay = '';

function addToCalc(value) {
    calcDisplay += value;
    document.getElementById('calc-display').value = calcDisplay;
}

function clearCalc() {
    calcDisplay = '';
    document.getElementById('calc-display').value = '';
}

function insertFromCalc() {
    const problema = document.getElementById('problema');
    problema.value += calcDisplay;
    clearCalc();
}

function clearProblem() {
    document.getElementById('problema').value = '';
}

// Motor de resolución de problemas matemáticos
class ResolutorMatematicas {
    constructor() {
        this.inicializarEventos();
        this.setupCalculatorKeyboard();
    }

    inicializarEventos() {
        document.getElementById('btnResolver').addEventListener('click', () => this.resolverProblema());
        document.getElementById('btnNuevosEjercicios').addEventListener('click', () => this.generarEjercicios());
        document.getElementById('btnResolverOtro').addEventListener('click', () => this.volverAlInicio());
        
        // Permitir resolver con Enter
        document.getElementById('problema').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.resolverProblema();
            }
        });
    }

    setupCalculatorKeyboard() {
        // Permitir usar teclado en la calculadora
        document.addEventListener('keydown', (e) => {
            if (document.activeElement.id === 'calc-display') {
                e.preventDefault();
                if (e.key >= '0' && e.key <= '9') {
                    addToCalc(e.key);
                } else if (['+', '-', '*', '/', '(', ')', '.'].includes(e.key)) {
                    addToCalc(e.key);
                } else if (e.key === 'Enter') {
                    insertFromCalc();
                } else if (e.key === 'Escape') {
                    clearCalc();
                }
            }
        });
    }

    async resolverProblema() {
        const tema = document.getElementById('tema').value;
        const problema = document.getElementById('problema').value.trim();

        if (!tema) {
            alert('Por favor selecciona un tema');
            return;
        }

        if (!problema) {
            alert('Por favor escribe un problema');
            return;
        }

        // Mostrar loading
        this.mostrarLoading();

        try {
            // Simular procesamiento
            await this.delay(1000);

            // Resolver según el tema
            const solucion = this.procesarProblema(tema, problema);
            
            // Mostrar solución
            this.mostrarSolucion(solucion);
            
            // Generar ejercicios adicionales
            this.generarEjercicios(tema);
            
        } catch (error) {
            this.mostrarError('No pude resolver este problema. Por favor, verifica que esté bien escrito.');
        }
    }

    procesarProblema(tema, problema) {
        // Aquí iría la lógica real de resolución
        // Por ahora usaremos ejemplos predefinidos
        
        const ejemplos = {
            'factor-comun': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Identificamos el factor común en todos los términos.',
                        operacion: '6x² + 9x\nFactor común: 3x'
                    },
                    {
                        numero: 2,
                        explicacion: 'Extraemos el factor común de cada término.',
                        operacion: '6x² = 3x × 2x\n9x = 3x × 3'
                    },
                    {
                        numero: 3,
                        explicacion: 'Escribimos la expresión factorizada.',
                        operacion: '6x² + 9x = 3x(2x + 3)'
                    },
                    {
                        numero: 4,
                        explicacion: 'Verificación: distribuimos el factor común.',
                        operacion: '3x(2x + 3) = 6x² + 9x ✓'
                    }
                ],
                respuesta: '3x(2x + 3)'
            },
            'diferencia-cuadrados': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Identificamos que es una diferencia de cuadrados: a² - b²',
                        operacion: 'x² - 9'
                    },
                    {
                        numero: 2,
                        explicacion: 'Reconocemos que x² = (x)² y 9 = (3)²',
                        operacion: 'x² - 9 = (x)² - (3)²'
                    },
                    {
                        numero: 3,
                        explicacion: 'Aplicamos la fórmula: a² - b² = (a + b)(a - b)',
                        operacion: '(x)² - (3)² = (x + 3)(x - 3)'
                    },
                    {
                        numero: 4,
                        explicacion: 'Verificación: multiplicamos los factores.',
                        operacion: '(x + 3)(x - 3) = x² - 3x + 3x - 9 = x² - 9 ✓'
                    }
                ],
                respuesta: '(x + 3)(x - 3)'
            },
            'aspa-simple': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Buscamos dos números que multiplicados den el término independiente y sumados den el coeficiente de x.',
                        operacion: 'x² + 7x + 12'
                    },
                    {
                        numero: 2,
                        explicacion: 'Buscamos los factores de 12 que sumen 7.',
                        operacion: 'Factores de 12: (1,12), (2,6), (3,4)\n3 + 4 = 7 ✓'
                    },
                    {
                        numero: 3,
                        explicacion: 'Escribimos la factorización.',
                        operacion: 'x² + 7x + 12 = (x + 3)(x + 4)'
                    },
                    {
                        numero: 4,
                        explicacion: 'Verificación aplicando distributiva.',
                        operacion: '(x + 3)(x + 4) = x² + 4x + 3x + 12 = x² + 7x + 12 ✓'
                    }
                ],
                respuesta: '(x + 3)(x + 4)'
            },
            'trinomio-cuadrado-perfecto': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Verificamos si es un trinomio cuadrado perfecto: a² + 2ab + b² o a² - 2ab + b²',
                        operacion: 'x² + 6x + 9'
                    },
                    {
                        numero: 2,
                        explicacion: 'Identificamos: x² = (x)², 9 = (3)², 6x = 2(x)(3)',
                        operacion: 'x² + 6x + 9 = (x)² + 2(x)(3) + (3)²'
                    },
                    {
                        numero: 3,
                        explicacion: 'Aplicamos la fórmula: (a + b)² = a² + 2ab + b²',
                        operacion: '(x)² + 2(x)(3) + (3)² = (x + 3)²'
                    },
                    {
                        numero: 4,
                        explicacion: 'Verificación desarrollando el cuadrado.',
                        operacion: '(x + 3)² = x² + 6x + 9 ✓'
                    }
                ],
                respuesta: '(x + 3)²'
            },
            'aspa-doble': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Identificamos un trinomio de la forma: ax² + bx + c',
                        operacion: '2x² + 7x + 6'
                    },
                    {
                        numero: 2,
                        explicacion: 'Multiplicamos a × c = 2 × 6 = 12',
                        operacion: 'Buscamos factores de 12 que sumen 7'
                    },
                    {
                        numero: 3,
                        explicacion: 'Factores de 12: (3,4) porque 3 + 4 = 7',
                        operacion: 'Reescribimos: 2x² + 3x + 4x + 6'
                    },
                    {
                        numero: 4,
                        explicacion: 'Factorizamos por agrupación.',
                        operacion: '(2x² + 3x) + (4x + 6) = x(2x + 3) + 2(2x + 3) = (x + 2)(2x + 3)'
                    }
                ],
                respuesta: '(x + 2)(2x + 3)'
            },
            'ecuaciones-lineales': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Identificamos que es una ecuación lineal con una incógnita.',
                        operacion: '2x + 5 = 13'
                    },
                    {
                        numero: 2,
                        explicacion: 'Restamos 5 de ambos lados para aislar el término con x.',
                        operacion: '2x + 5 - 5 = 13 - 5\n2x = 8'
                    },
                    {
                        numero: 3,
                        explicacion: 'Dividimos ambos lados entre 2 para despejar x.',
                        operacion: '2x / 2 = 8 / 2\nx = 4'
                    },
                    {
                        numero: 4,
                        explicacion: 'Verificamos la solución sustituyendo x = 4 en la ecuación original.',
                        operacion: '2(4) + 5 = 8 + 5 = 13 ✓'
                    }
                ],
                respuesta: 'x = 4'
            },
            'fracciones': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Identificamos las fracciones y el denominador común.',
                        operacion: '1/2 + 1/3'
                    },
                    {
                        numero: 2,
                        explicacion: 'Encontramos el mínimo común denominador (mcd).',
                        operacion: 'mcd(2, 3) = 6'
                    },
                    {
                        numero: 3,
                        explicacion: 'Convertimos cada fracción al denominador común.',
                        operacion: '1/2 = 3/6\n1/3 = 2/6'
                    },
                    {
                        numero: 4,
                        explicacion: 'Sumamos las fracciones equivalentes.',
                        operacion: '3/6 + 2/6 = 5/6'
                    }
                ],
                respuesta: '5/6'
            },
            'porcentajes': {
                pasos: [
                    {
                        numero: 1,
                        explicacion: 'Convertimos el porcentaje a decimal.',
                        operacion: '25% = 25/100 = 0.25'
                    },
                    {
                        numero: 2,
                        explicacion: 'Multiplicamos el número por el decimal.',
                        operacion: '80 × 0.25 = 20'
                    }
                ],
                respuesta: '20'
            }
        };

        // Si no hay ejemplo para el tema, generar uno genérico
        return ejemplos[tema] || this.generarSolucionGenerica(problema);
    }

    generarSolucionGenerica(problema) {
        return {
            pasos: [
                {
                    numero: 1,
                    explicacion: 'Analizando el problema dado...',
                    operacion: problema
                },
                {
                    numero: 2,
                    explicacion: 'Aplicando las reglas matemáticas correspondientes...',
                    operacion: 'Procesando...'
                },
                {
                    numero: 3,
                    explicacion: 'Simplificando la expresión...',
                    operacion: 'Resultado obtenido'
                }
            ],
            respuesta: 'Consulta con tu profesor para verificación'
        };
    }

    mostrarSolucion(solucion) {
        const solucionSection = document.getElementById('solucion-section');
        const pasosContainer = document.getElementById('solucion-pasos');
        const respuestaFinal = document.getElementById('respuesta-final');

        // Limpiar contenido anterior
        pasosContainer.innerHTML = '';

        // Mostrar pasos
        solucion.pasos.forEach(paso => {
            const pasoDiv = document.createElement('div');
            pasoDiv.className = 'paso';
            pasoDiv.innerHTML = `
                <div class="paso-numero">Paso ${paso.numero}</div>
                <div class="paso-explicacion">${paso.explicacion}</div>
                <div class="paso-operacion">${paso.operacion}</div>
            `;
            pasosContainer.appendChild(pasoDiv);
        });

        // Mostrar respuesta final
        respuestaFinal.textContent = solucion.respuesta;

        // Mostrar sección
        solucionSection.style.display = 'block';
        solucionSection.scrollIntoView({ behavior: 'smooth' });
        
        this.ocultarLoading();
    }

    generarEjercicios(temaActual = null) {
        const tema = temaActual || document.getElementById('tema').value;
        const ejerciciosSection = document.getElementById('ejercicios-section');
        const ejerciciosLista = document.getElementById('ejercicios-lista');

        const ejerciciosPorTema = {
            'factor-comun': [
                'Factorizar: 8x³ + 12x²',
                'Factorizar: 15a²b - 10ab²',
                'Factorizar: 6x²y + 9xy² - 3xy',
                'Factorizar: 4m³n² + 8m²n - 12mn²'
            ],
            'diferencia-cuadrados': [
                'Factorizar: x² - 16',
                'Factorizar: 9y² - 25',
                'Factorizar: 4a² - 81b²',
                'Factorizar: 49x² - 64y²'
            ],
            'aspa-simple': [
                'Factorizar: x² + 5x + 6',
                'Factorizar: y² - 8y + 15',
                'Factorizar: a² + 2a - 15',
                'Factorizar: x² - x - 12'
            ],
            'trinomio-cuadrado-perfecto': [
                'Factorizar: x² + 10x + 25',
                'Factorizar: y² - 14y + 49',
                'Factorizar: 4a² + 12a + 9',
                'Factorizar: 9x² - 30x + 25'
            ],
            'aspa-doble': [
                'Factorizar: 3x² + 10x + 8',
                'Factorizar: 2x² - 5x - 3',
                'Factorizar: 4x² + 12x + 9',
                'Factorizar: 6x² + x - 2'
            ],
            'ecuaciones-lineales': [
                'Resolver: 3x - 7 = 14',
                'Resolver: 5x + 2 = 2x + 11',
                'Resolver: 4(x - 3) = 2x + 6',
                'Resolver: (2x + 1)/3 = 5'
            ],
            'sistemas-ecuaciones': [
                'Resolver: x + y = 5, x - y = 1',
                'Resolver: 2x + 3y = 12, x - y = 1',
                'Resolver: y = 2x + 1, y = -x + 4',
                'Resolver: 3x - 2y = 7, x + 4y = -3'
            ],
            'fracciones': [
                'Calcular: 3/4 + 2/5',
                'Calcular: 5/6 - 1/3',
                'Calcular: 2/3 × 3/4',
                'Calcular: 3/4 ÷ 2/5'
            ],
            'porcentajes': [
                'Calcular el 30% de 150',
                '¿Qué porcentaje de 80 es 20?',
                'Si el 25% de un número es 50, ¿cuál es el número?',
                'Aumentar 200 en un 15%'
            ],
            'potencias': [
                'Calcular: 2^5',
                'Calcular: 3^3 × 3^2',
                'Calcular: (2^4)^2',
                'Calcular: 5^0 + 2^3'
            ],
            'derivadas': [
                'Derivar: f(x) = 3x^2 + 2x - 5',
                'Derivar: f(x) = sen(x) + cos(x)',
                'Derivar: f(x) = e^x × ln(x)',
                'Derivar: f(x) = (2x + 1)/(x - 3)'
            ],
            'integrales': [
                'Integrar: ∫(2x + 3)dx',
                'Integrar: ∫sen(x)dx',
                'Integrar: ∫x^2 dx',
                'Integrar: ∫(1/x)dx'
            ],
            'logaritmos': [
                'Calcular: log₂(8)',
                'Calcular: ln(e^3)',
                'Resolver: log(x) + log(2) = log(10)',
                'Calcular: log₅(25) + log₅(5)'
            ]
        };

        const ejercicios = ejerciciosPorTema[tema] || [
            'Resolver: 2x + 3 = 7',
            'Calcular: 15% de 200',
            'Simplificar: (3x^2 + 6x)/3x',
            'Resolver: x^2 - 4 = 0'
        ];

        // Mezclar ejercicios
        const ejerciciosMezclados = this.mezclarArray([...ejercicios]);

        // Limpiar y mostrar ejercicios
        ejerciciosLista.innerHTML = '';
        
        ejerciciosMezclados.slice(0, 3).forEach((ejercicio, index) => {
            const ejercicioDiv = document.createElement('div');
            ejercicioDiv.className = 'ejercicio-item';
            ejercicioDiv.innerHTML = `
                <div class="ejercicio-enunciado">${ejercicio}</div>
                <div class="ejercicio-tema">Tema: ${this.getNombreTema(tema)}</div>
            `;
            
            ejercicioDiv.addEventListener('click', () => {
                document.getElementById('problema').value = ejercicio;
                this.volverAlInicio();
            });
            
            ejerciciosLista.appendChild(ejercicioDiv);
        });

        ejerciciosSection.style.display = 'block';
    }

    getNombreTema(tema) {
        const nombres = {
            'factor-comun': 'Factor Común',
            'diferencia-cuadrados': 'Diferencia de Cuadrados',
            'aspa-simple': 'Aspa Simple',
            'trinomio-cuadrado-perfecto': 'Trinomio Cuadrado Perfecto',
            'aspa-doble': 'Aspa Doble',
            'ecuaciones-lineales': 'Ecuaciones Lineales',
            'sistemas-ecuaciones': 'Sistemas de Ecuaciones',
            'derivadas': 'Derivadas',
            'integrales': 'Integrales',
            'fracciones': 'Fracciones',
            'porcentajes': 'Porcentajes',
            'potencias': 'Potencias y Raíces',
            'logaritmos': 'Logaritmos',
            'ecuaciones-cuadraticas': 'Ecuaciones Cuadráticas'
        };
        return nombres[tema] || 'Matemáticas';
    }

    mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    volverAlInicio() {
        document.getElementById('solucion-section').style.display = 'none';
        document.getElementById('ejercicios-section').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    mostrarLoading() {
        const btnResolver = document.getElementById('btnResolver');
        btnResolver.innerHTML = '<div class="spinner"></div> Resolviendo...';
        btnResolver.disabled = true;
    }

    ocultarLoading() {
        const btnResolver = document.getElementById('btnResolver');
        btnResolver.innerHTML = '🔍 Resolver Problema';
        btnResolver.disabled = false;
    }

    mostrarError(mensaje) {
        this.ocultarLoading();
        alert(mensaje);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ResolutorMatematicas();
});
