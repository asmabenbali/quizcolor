// Assuming questions.js exports an array of questions as the default export
import questions from './questions.js';

// Selecting elements from the document
const questionElement = document.querySelector('.question');
const resultatElement = document.querySelector('.resultat');
const spnQtdElement = document.querySelector('.spnQtd');
const textFinishElement = document.querySelector('.finish span');
const contentElement = document.querySelector('.content');
const contentFinishElement = document.querySelector('.finish');
const btnRestart = document.querySelector('.finish button');

// Initializing state variables
let currentIndex = 0;
let questionsCorrect = 0;

// Restart button click event
btnRestart.addEventListener('click', () => {
    // Resetting the quiz to its initial state
    contentElement.style.display = 'block'; // Assuming flex was used previously for layout
    contentFinishElement.style.display = 'none';
    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
});

function nextQuestion(e) {
    // Checking if the selected answer is correct
    if (e.target.getAttribute('data-correct') === 'true') {
        questionsCorrect++;
    }
    // Moving to the next question or finishing the quiz
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        finish();
    }
}

function finish() {
    // Displaying the result and hiding the quiz content
    textFinishElement.innerHTML = `Votre résultat est ${questionsCorrect} sur ${questions.length}.`;
    contentElement.style.display = 'none';
    contentFinishElement.style.display = 'block';
}

function loadQuestion() {
    // Updating the UI with the current question and its answers
    const item = questions[currentIndex];
    spnQtdElement.innerHTML = `${currentIndex + 1}/${questions.length}`;
    questionElement.innerHTML = item.question;
    resultatElement.innerHTML = ''; // Clear previous answers

    item.resultat.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = answer.option;
        button.classList.add('answer');
        button.setAttribute('data-correct', answer.correct);
        button.addEventListener('click', nextQuestion);
        resultatElement.appendChild(button);
    });
}

// Initial load of the first question
document.addEventListener('DOMContentLoaded', loadQuestion);
