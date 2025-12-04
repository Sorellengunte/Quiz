const questions = [
    {
        question: "Quel est la capitale du Cameroun ?",
        reponses: [
            { text: "Bafoussam", correct: false },
            { text: "Douala", correct: false },
            { text: "Yaoundé", correct: true },
            { text: "Kribi", correct: false },
        ]
    },

    {
        question: "Le Cameroun a combien de régions ?",
        reponses: [
            { text: "20", correct: false },
            { text: "10", correct: true },
            { text: "1", correct: false },
            { text: "5", correct: false },
        ]
    },

    {
        question: "Dans quel continent est situé le Cameroun ?",
        reponses: [
            { text: "Américain", correct: false },
            { text: "Asiatique", correct: false },
            { text: "Océanique", correct: false },
            { text: "Africain", correct: true },
        ]
    },

    {
        question: "Le monde a combien de continents ?",
        reponses: [
            { text: "7", correct: true },
            { text: "3", correct: false },
            { text: "10", correct: false },
            { text: "9", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); // affiche la premiere questions
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; //affiche le texte de la questions

    currentQuestion.reponses.forEach(reponse => {
        const button = document.createElement("button");
        button.innerHTML = reponse.text;
        button.className = "text-black py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 transition";

        button.dataset.correct = reponse.correct; //pour stocker la vrai reponse
        answerButtons.appendChild(button);

        button.addEventListener("click", selectAnswer);
    });
}
// cache le bouuton next lorsq'on n'a pas repondu en supprimants tous ses enfants
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    selectedBtn.classList.remove("bg-gray-200", "hover:bg-gray-300");

    if(isCorrect){
        selectedBtn.classList.add("bg-green-500", "text-white");
        score++;
    } else {
        selectedBtn.classList.add("bg-red-500", "text-white");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("bg-green-500", "text-white");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}
  
function showScore(){
    resetState();
    questionElement.innerHTML = `Ton score est de : ${score} / ${questions.length}`;
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block";
}
// incremente l'indice de la question
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
