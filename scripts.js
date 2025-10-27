// Contador de ejercicios resueltos
let solvedExercises = 0;

// Función general para generar opciones
function generateOptions(correctAnswer, otherOptions = 3, min = 1, max = 50) {
    const options = [correctAnswer];
    while (options.length < otherOptions + 1) {
        const option = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

// Ejercicios de suma y resta con opción múltiple
function generateAdditionSubtraction() {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    document.getElementById('addition-subtraction-problem').textContent =`${num1} ${operation} ${num2}`
    const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
    const options = generateOptions(correctAnswer);
    
    const optionsContainer = document.getElementById('addition-subtraction-options');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(button);
        optionsContainer.appendChild(button);
    });
    
    return correctAnswer;
}
let correctResultAddSub = generateAdditionSubtraction();
let selectedOption = null;

function selectOption(button) {
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    selectedOption = button;
    button.classList.add('selected');
}

function checkAdditionSubtraction() {
    if (!selectedOption) {
        alert('Por favor, selecciona una opción');
        return;
    }
    
    const resultElement = document.getElementById('addition-subtraction-result');
    const userAnswer = parseInt(selectedOption.textContent);
    
    if (userAnswer === correctResultAddSub) {
        resultElement.textContent = '¡Correcto! Bien hecho!';
        resultElement.className = 'result success';
        solvedExercises++;
        updateSolvedCount();
         /* === GUARDAR PROGRESO (al responder) === */
        const user = JSON.parse(localStorage.getItem("userData"));
        if (user) {
            const key = "solved_" + user.email;
            const anteriores = parseInt(localStorage.getItem(key) || "0");
            localStorage.setItem(key, anteriores + 1);          // +1 ejercicio
            localStorage.setItem("last_" + user.email, new Date().toLocaleString());
        }
        /* ========================================= */
    
    } else {
        resultElement.textContent = `Incorrecto. La respuesta correcta es ${correctResultAddSub}`;
        resultElement.className = 'result error';
    }
    resultElement.style.display = 'block';
    setTimeout(() => {
        selectedOption = null;
        resultElement.style.display = 'none';
        document.getElementById('addition-subtraction-options').innerHTML = '';
        correctResultAddSub = generateAdditionSubtraction();
    }, 2000);
    
}

// Ejercicios de multiplicación con opción múltiple
function generateMultiplication() {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    
    document.getElementById('multiplication-problem').textContent = `${num1} × ${num2}`;
    
    const correctAnswer = num1 * num2;
    const options = generateOptions(correctAnswer, 3, 1, 150);
    
    const optionsContainer = document.getElementById('multiplication-options');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(button);
        optionsContainer.appendChild(button);
    });
    
    return correctAnswer;
}
let correctResultMult = generateMultiplication();

function checkMultiplication() {
    if (!selectedOption) {
        alert('Por favor, selecciona una opción');
        return;
    }
    
    const resultElement = document.getElementById('multiplication-result');
    const userAnswer = parseInt(selectedOption.textContent);
    
    if (userAnswer === correctResultMult) {
        resultElement.textContent = '¡Correcto! Excelente!';
        resultElement.className = 'result success';
        solvedExercises++;
        updateSolvedCount();
                /* === GUARDAR PROGRESO === */
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
        const key = "solved_" + user.email;
        const anteriores = parseInt(localStorage.getItem(key) || "0");
        localStorage.setItem(key, anteriores + 1);
        localStorage.setItem("last_" + user.email, new Date().toLocaleString());

    // Guardar datos del usuario (solo la primera vez)
    if (!localStorage.getItem("userData_" + user.email)) {
        localStorage.setItem("userData_" + user.email, JSON.stringify({
            name: user.name,
            email: user.email
        }));
    }
}
    } 
    else {
        resultElement.textContent = `Incorrecto. La respuesta correcta es ${correctResultMult}`;
        resultElement.className = 'result error';
    }
    
    resultElement.style.display = 'block';
    setTimeout(() => {
        selectedOption = null;
        resultElement.style.display = 'none';
        document.getElementById('multiplication-options').innerHTML = '';
        correctResultMult = generateMultiplication();
    }, 2000);
}

// Juego de suma rápida
let sumGameScore = 0;
let sumGameInterval;

function startSumGame() {
    sumGameScore = 0;
    document.getElementById('sum-game-score').textContent = `Puntuación: ${sumGameScore}`;
    document.getElementById('sum-game').style.display = 'block';
    
    generateSumGameProblem();
    
    sumGameInterval = setInterval(() => {
        generateSumGameProblem();
    }, 5000);
}

function generateSumGameProblem() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    document.getElementById('sum-game-problem').textContent = `${num1} ${operation} ${num2}`;
    
    const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
    const options = generateOptions(correctAnswer, 3, 1, 50);
    
    const optionsContainer = document.getElementById('sum-game-options');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(button);
        optionsContainer.appendChild(button);
    });
}

function checkSumGame() {
    if (!selectedOption) {
        alert('Por favor, selecciona una opción');
        return;
    }
    
    const problemText = document.getElementById('sum-game-problem').textContent;
    let correctAnswer;
    
    try {
        correctAnswer = eval(problemText.replace('÷', '/'));
    } catch (e) {
        correctAnswer = 0;
    }
    
    const userAnswer = parseInt(selectedOption.textContent);
    
    if (userAnswer === correctAnswer) {
        sumGameScore++;
        document.getElementById('sum-game-score').textContent = `Puntuación: ${sumGameScore}`;
    }
    
    selectedOption = null;
    generateSumGameProblem();
}

// Juego de comparación de fracciones
let fractionGameScore = 0;

function startFractionGame() {
    fractionGameScore = 0;
    document.getElementById('fraction-game-score').textContent = `Puntuación: ${fractionGameScore}`;
    document.getElementById('fraction-game').style.display = 'block';
    generateFractionGameProblem();
}

function generateFractionGameProblem() {
    let numerator1, denominator1, numerator2, denominator2;
    
    do {
        numerator1 = Math.floor(Math.random() * 5) + 1;
        denominator1 = Math.floor(Math.random() * 5) + numerator1;
        
        numerator2 = Math.floor(Math.random() * 5) + 1;
        denominator2 = Math.floor(Math.random() * 5) + numerator2;
    } while (denominator1 === 0 || denominator2 === 0);
    
    document.getElementById('fraction-game-problem').textContent = `${numerator1}/${denominator1} ___ ${numerator2}/${denominator2}`;
}

function selectFractionOption(button, option) {
    const options = document.querySelectorAll('#fraction-game-options button');
    options.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedOption = option;
}

function checkFractionGame() {
    if (!selectedOption) {
        alert('Por favor, selecciona una opción');
        return;
    }
    
    const problemText = document.getElementById('fraction-game-problem').textContent;
    const [frac1, frac2] = problemText.split(' ___ ');
    const [n1, d1] = frac1.split('/').map(Number);
    const [n2, d2] = frac2.split('/').map(Number);
    
    const value1 = n1 / d1;
    const value2 = n2 / d2;
    
    let correctOption;
    if (value1 > value2) correctOption = 'greater';
    else if (value1 < value2) correctOption = 'less';
    else correctOption = 'equal';
    
    if (selectedOption === correctOption) {
        fractionGameScore++;
        document.getElementById('fraction-game-score').textContent = `Puntuación: ${fractionGameScore}`;
    }
    
    selectedOption = null;
    generateFractionGameProblem();
}

function updateSolvedCount() {
    document.getElementById('solved-count').textContent = solvedExercises;
}
// === DIVISIÓN ===
let correctResultDiv;

function generateDivision() {
    // Evitamos división por 0 y que el resultado sea exacto
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = Math.floor(Math.random() * 10) + 1;
    const num1 = num2 * result;

    document.getElementById('division-problem').textContent = `${num1} ÷ ${num2}`;

    const options = generateOptions(result, 3, 1, 20);
    const container = document.getElementById('division-options');
    container.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectOption(btn);
        container.appendChild(btn);
    });

    correctResultDiv = result;
}
generateDivision();

function checkDivision() {
    if (!selectedOption) return alert('Selecciona una opción');
    const resultEl = document.getElementById('division-result');
    const user = parseInt(selectedOption.textContent);

    if (user === correctResultDiv) {
        resultEl.textContent = '¡Correcto!';
        resultEl.className = 'result success';
        solvedExercises++;
        updateSolvedCount();
    } 
    else {
        resultEl.textContent = `Incorrecto. La respuesta es ${correctResultDiv}`;
        resultEl.className = 'result error';
    }
    resultEl.style.display = 'block';

    setTimeout(() => {
        resultEl.style.display = 'none';
        selectedOption = null;
        generateDivision();
    }, 2000);
}
// === FACTORIZACIÓN ===
let correctFact;
function generateFactoring() {
    const pairs = [[2,3],[1,4],[-2,5],[-3,-4]];
    const [r1, r2] = pairs[Math.floor(Math.random()*pairs.length)];
    const b = r1 + r2;
    const c = r1 * r2;
    correctFact = `(x ${r1>=0?'+':''} ${r1})(x ${r2>=0?'+':''} ${r2})`;
    document.getElementById('factoring-problem').textContent = `x² ${b>=0?'+':''} ${b}x ${c>=0?'+':''} ${c}`;
    const opts = [correctFact,
                  `(x+1)(x+${c})`,
                  `(x+2)(x+${c-1})`,
                  `(x+${b})(x+${c})`].sort(()=>Math.random()-0.5);
    const box = document.getElementById('factoring-options');
    box.innerHTML='';
    opts.forEach(txt=>{
        const btn=document.createElement('button');
        btn.className='option-btn';
        btn.textContent=txt;
        btn.onclick=()=>selectOption(btn);
        box.appendChild(btn);
    });
}
generateFactoring();

function checkFactoring() {
    if(!selectedOption){alert('Selecciona una opción');return;}
    const ok=selectedOption.textContent===correctFact;
    const res=document.getElementById('factoring-result');
    res.textContent=ok?'¡Correcta factorización!':`Incorrecto, es ${correctFact}`;
    res.className=ok?'result success':'result error';
    res.style.display='block';
    if(ok){solvedExercises++;updateSolvedCount();
     /* === GUARDAR PROGRESO (al responder) === */
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
        const key = "solved_" + user.email;
        const anteriores = parseInt(localStorage.getItem(key) || "0");
        localStorage.setItem(key, anteriores + 1);          // +1 ejercicio
        localStorage.setItem("last_" + user.email, new Date().toLocaleString());
    }
    /* ========================================= */
    }
    setTimeout(()=>{res.style.display='none';selectedOption=null;generateFactoring();},2000);
}
// === ESTADÍSTICA – MEDIA ===
let correctMean;
function generateStatistics() {
    const count=3+Math.floor(Math.random()*3);
    const nums=Array.from({length:count},()=>Math.floor(Math.random()*20)+1);
    correctMean=(nums.reduce((a,b)=>a+b,0)/count).toFixed(1);
    document.getElementById('statistics-problem').textContent=nums.join(', ');
    const opts=[parseFloat(correctMean),
                parseFloat(correctMean)+1,
                parseFloat(correctMean)-1,
                parseFloat(correctMean)+2].sort(()=>Math.random()-0.5);
    const box=document.getElementById('statistics-options');
    box.innerHTML='';
    opts.forEach(v=>{
        const btn=document.createElement('button');
        btn.className='option-btn';
        btn.textContent=v;
        btn.onclick=()=>selectOption(btn);
        box.appendChild(btn);
    });
}
generateStatistics();

function checkStatistics() {
    if(!selectedOption){alert('Selecciona una opción');return;}
    const ok=Math.abs(parseFloat(selectedOption.textContent)-correctMean)<0.01;
    const res=document.getElementById('statistics-result');
    res.textContent=ok?'¡Media correcta!':`Incorrecto, la media es ${correctMean}`;
    res.className=ok?'result success':'result error';
    res.style.display='block';
    if(ok){solvedExercises++;updateSolvedCount();
    /* === GUARDAR PROGRESO (al responder) === */
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
        const key = "solved_" + user.email;
        const anteriores = parseInt(localStorage.getItem(key) || "0");
        localStorage.setItem(key, anteriores + 1);          // +1 ejercicio
        localStorage.setItem("last_" + user.email, new Date().toLocaleString());
    }
    /* ========================================= */
    }
    setTimeout(()=>{res.style.display='none';selectedOption=null;generateStatistics();},2000);
}
// === ÁLGEBRA – ECUACIÓN LINEAL ===
let correctX;
function generateAlgebra() {
    const x=Math.floor(Math.random()*10)+1;
    const a=Math.floor(Math.random()*5)+1;
    const b=Math.floor(Math.random()*20)-10;
    document.getElementById('algebra-problem').textContent=`${a}x ${b>=0?'+':''} ${b} = ${a*x+b}`;
    const opts=[x,x+1,x-1,x+2].sort(()=>Math.random()-0.5);
    const box=document.getElementById('algebra-options');
    box.innerHTML='';
    opts.forEach(v=>{
        const btn=document.createElement('button');
        btn.className='option-btn';
        btn.textContent=v;
        btn.onclick=()=>selectOption(btn);
        box.appendChild(btn);
    });
    correctX=x;
}
generateAlgebra();

function checkAlgebra() {
    if(!selectedOption){alert('Selecciona una opción');return;}
    const ok=parseInt(selectedOption.textContent)===correctX;
    const res=document.getElementById('algebra-result');
    res.textContent=ok?'¡Valor de x correcto!':`Incorrecto, x = ${correctX}`;
    res.className=ok?'result success':'result error';
    res.style.display='block';
   if(ok){solvedExercises++; updateSolvedCount();
    /* === GUARDAR PROGRESO (al responder) === */
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
        const key = "solved_" + user.email;
        const anteriores = parseInt(localStorage.getItem(key) || "0");
        localStorage.setItem(key, anteriores + 1); // +1 ejercicio
        localStorage.setItem("last_" + user.email, new Date().toLocaleString());
    }
    /* ========================================= */
   }
    setTimeout(()=>{res.style.display='none';selectedOption=null;generateAlgebra();},2000);
}
/* ========= PIZARRA POR EJERCICIO ========= */

function mostrarPizarra(ejercicio) {
  document.getElementById(`pizarra-${ejercicio}-contenedor`).style.display = 'block';
  inicializarPizarra(ejercicio);
}

function cerrarPizarra(ejercicio) {
  document.getElementById(`pizarra-${ejercicio}-contenedor`).style.display = 'none';
}

function borrarPizarra(ejercicio) {
  const canvas = document.getElementById(`pizarra-${ejercicio}`);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

function inicializarPizarra(ejercicio) {
  const canvas = document.getElementById(`pizarra-${ejercicio}`);
  const ctx = canvas.getContext('2d');
  let dibujando = false;

  function getX(e) {
    return e.touches ? e.touches[0].clientX - canvas.offsetLeft : e.offsetX;
  }
  function getY(e) {
    return e.touches ? e.touches[0].clientY - canvas.offsetTop : e.offsetY;
  }

  function start(e) {
    dibujando = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
  }

  function draw(e) {
    if (!dibujando) return;
    ctx.lineWidth = document.getElementById(`grosor-${ejercicio}`).value;
    ctx.strokeStyle = document.getElementById(`color-${ejercicio}`).value;
    ctx.lineTo(getX(e), getY(e));
    ctx.stroke();
  }

  function stop() {
    dibujando = false;
  }

  // Eventos ratón
  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stop);

  // Eventos táctiles
  canvas.addEventListener('touchstart', start, {passive:true});
  canvas.addEventListener('touchmove', draw, {passive:true});
  canvas.addEventListener('touchend', stop, {passive:true});
}
function borrarPizarra(ejercicio) {
  const canvas = document.getElementById(`pizarra-${ejercicio}`);
  const ctx    = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 👉  Importante: cierra el camino actual
  ctx.beginPath();
}