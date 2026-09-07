const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used to style a web page?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correct: 1
    },
    {
        question: "Which language is used to add interactivity to a website?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            "var",
            "define",
            "variable",
            "int"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [
            ".",
            "#",
            "*",
            "@"
        ],
        correct: 1
    },
    {
        question: "Which method is used to select an element by ID?",
        answers: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "queryId()"
        ],
        correct: 0
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            "<link>",
            "<href>",
            "<a>",
            "<url>"
        ],
        correct: 2
    },
    {
        question: "Which property changes the background color in CSS?",
        answers: [
            "color",
            "background-color",
            "bgcolor",
            "background"
        ],
        correct: 1
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        answers: [
            "==",
            "=",
            "===",
            "!="
        ],
        correct: 2
    },
    {
        question: "Which storage method keeps data after the browser is closed?",
        answers: [
            "sessionStorage",
            "localStorage",
            "temporaryStorage",
            "browserStorage"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");

const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

const resultBox = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");


// Initial screen
quizScreen.style.display = "none";
resultBox.style.display = "none";


// Start Quiz
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    startQuiz();
});


function startQuiz() {

    currentQuestion = 0;
    score = 0;

    resultBox.style.display = "none";
    nextButton.style.display = "block";

    showQuestion();
}


function showQuestion() {

    clearInterval(timer);

    timeLeft = 30;
    timerElement.textContent = "Time: 30s";

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent = current.question;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer");
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(button, index);
        });

        answersElement.appendChild(button);
    });

    startTimer();
}


function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            disableAnswers();
        }

    }, 1000);
}


function checkAnswer(button, selectedIndex) {

    clearInterval(timer);

    const correctIndex =
        questions[currentQuestion].correct;

    const allAnswers =
        document.querySelectorAll(".answer");

    allAnswers.forEach(answer => {
        answer.disabled = true;
    });

    if (selectedIndex === correctIndex) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        allAnswers[correctIndex].classList.add("correct");
    }
}


function disableAnswers() {

    const allAnswers =
        document.querySelectorAll(".answer");

    allAnswers.forEach(answer => {
        answer.disabled = true;
    });

    const correctIndex =
        questions[currentQuestion].correct;

    allAnswers[correctIndex].classList.add("correct");
}


// Next Question
nextButton.addEventListener("click", () => {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        finishQuiz();
    }

});


function finishQuiz() {

    clearInterval(timer);

    quizScreen.style.display = "none";

    resultBox.style.display = "block";

    scoreElement.textContent =
        `${score}/${questions.length}`;
}


// Restart Quiz
restartButton.addEventListener("click", () => {

    resultBox.style.display = "none";

    quizScreen.style.display = "block";

    startQuiz();

});