document.addEventListener("DOMContentLoaded", () => {
    const readingSection = document.getElementById("reading-section");
    const quizSection = document.getElementById("quiz-section");
    const startQuizBtn = document.getElementById("start-quiz-btn");
    
    const quizContainer = document.getElementById("quiz-container");
    const validateBtn = document.getElementById("validate-btn");
    const commitmentContainer = document.getElementById("commitment-container");
    const commitmentCheck = document.getElementById("commitment-check");
    const nextBtn = document.getElementById("next-btn");
    const livesContainer = document.getElementById("lives-container");

    if (!window.levelData) return;

    let lives = 3;
    let selectedQuestions = [];

    const cardinalSVG = `
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <rect x="6" y="2" width="4" height="2" fill="#ff0033"/>
            <rect x="4" y="4" width="8" height="2" fill="#ff0033"/>
            <rect x="2" y="6" width="10" height="2" fill="#ff0033"/>
            <rect x="12" y="6" width="2" height="2" fill="orange"/>
            <rect x="10" y="4" width="2" height="2" fill="black"/>
            <rect x="2" y="8" width="12" height="4" fill="#ff0033"/>
            <rect x="4" y="12" width="8" height="2" fill="#990000"/>
            <rect x="6" y="14" width="2" height="2" fill="white"/>
            <rect x="10" y="14" width="2" height="2" fill="white"/>
        </svg>
    `;

    function renderLives() {
        livesContainer.innerHTML = "";
        for(let i=0; i<3; i++) {
            let life = document.createElement("div");
            life.className = "cardinal " + (i >= lives ? "dead" : "");
            life.innerHTML = cardinalSVG;
            livesContainer.appendChild(life);
        }
    }

    function initQuiz() {
        quizContainer.innerHTML = "";
        // Barajar y tomar 2 preguntas aleatorias
        let shuffled = window.levelData.sort(() => 0.5 - Math.random());
        selectedQuestions = shuffled.slice(0, 2);

        selectedQuestions.forEach((q, qIdx) => {
            const qDiv = document.createElement("div");
            qDiv.className = "quiz-box";
            qDiv.innerHTML = `<p class="question">> ${q.question}</p>`;
            
            const optionsDiv = document.createElement("div");
            optionsDiv.className = "options";
            
            q.options.forEach((opt, oIdx) => {
                optionsDiv.innerHTML += `
                    <label class="option-item">
                        <input type="radio" name="q${qIdx}" value="${oIdx}"> ${opt}
                    </label>
                `;
            });
            
            qDiv.appendChild(optionsDiv);
            quizContainer.appendChild(qDiv);
        });
        renderLives();
    }

    if(startQuizBtn) {
        startQuizBtn.addEventListener("click", () => {
            readingSection.classList.add("hidden");
            quizSection.classList.remove("hidden");
            lives = 3;
            initQuiz();
        });
    }

    if(validateBtn) {
        validateBtn.addEventListener("click", () => {
            let correctCount = 0;
            selectedQuestions.forEach((q, qIdx) => {
                const selectedOpt = document.querySelector(`input[name="q${qIdx}"]:checked`);
                if (selectedOpt && parseInt(selectedOpt.value) === q.answer) {
                    correctCount++;
                }
            });

            if (correctCount === 2) {
                alert("¡RESPUESTAS CORRECTAS! Código desencriptado...");
                quizContainer.classList.add("hidden");
                validateBtn.classList.add("hidden");
                livesContainer.classList.add("hidden");
                commitmentContainer.classList.remove("hidden");
            } else {
                lives--;
                renderLives();
                
                if (lives > 0) {
                    alert(`UUY: Has perdido una vida. Te quedan ${lives} Cardenales. Se han generado nuevas preguntas.`);
                    initQuiz(); 
                } else {
                    alert("GAME OVER EN ESTE NIVEL. Se te acabaron las vidas, vuelve a leer el documento.");
                    quizSection.classList.add("hidden");
                    readingSection.classList.remove("hidden");
                }
            }
        });
    }

    if(commitmentCheck) {
        commitmentCheck.addEventListener("change", () => {
            if (commitmentCheck.checked) {
                nextBtn.classList.remove("hidden");
            } else {
                nextBtn.classList.add("hidden");
            }
        });
    }
});
