const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const endContainer = document.getElementById('end-container');
const questionElement = document.getElementById('question');
const timerElement = document.getElementById('time');
const initialsForm = document.getElementById('initials-form');
const finalScoreElement = document.getElementById('final-score');
const highScoresBtn = document.getElementById('high-scores-btn');
const highScoreContainer = document.getElementById('high-score-container');
const highScoreList = document.getElementById('high-score-list');
// gathering elements by id


let currentQuestionIndex = 0; // initializing variable at 0. referenced as index number for array of questions.
let timeLeft = 60; // initializing variable at 60. timer starts at 60.
let timerInterval;


const questions = [ // array containing objects. each object contains a question, four choices as an array, and one correct answer.
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlink Text Markdown Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        choices: ["string", "boolean", "tuple", "number"],
        answer: "tuple"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        choices: ["//", "/*", "<!--", "*/"],
        answer: "//"
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlink Text Markdown Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        choices: ["string", "boolean", "tuple", "number"],
        answer: "tuple"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        choices: ["//", "/*", "<!--", "*/"],
        answer: "//"
    }
]; // array containing objects. each object contains a question, four choices as an array, and one correct answer.


startButton.addEventListener('click', startQuiz); // targeting startButton. startButton click begins startQuiz function.


function startQuiz() { // initiated by 'click' event.
    startButton.classList.add('hide'); // add class='hide' to startButton to hide the HTML element.
    questionContainer.classList.remove('hide'); // remove class='hide' from questionContainer to reveal the HTML element.
    showQuestion(); // initiate showQuestion function.
    timerInterval = setInterval(updateTimer, 1000); // declaring timerInterval to repeatedly update (updateTimer function) every 1000ms (1s) using JS setInterval function. 
}

// Function to show a question
function showQuestion() {
    const question = questions[currentQuestionIndex]; // grabbing question from 'questions' array using index number from currentQuestionIndex var
    questionElement.innerText = question.question; // populate questionElement with the text of the current question as declared ^
    question.choices.forEach((choice, index) => { // loop through the choices index of each question. choice represents current element processed. gathering index of each choice.
        const button = document.getElementsByClassName('btn')[index]; // target a button element and index it.
        button.innerText = choice; // populate targeted button with current choice being processed by loop.
        button.addEventListener('click', () => { // event listen for click on targeted button
            checkAnswer(choice); // click event sends selected choice to checkAnswer function
        });
    });
}

// Function to check answer
function checkAnswer(choice) { // function for checking answer, initiated by click event.
    if (choice === questions[currentQuestionIndex].answer) { // if selected choice is absolutely equal to the current question object's value for answer, proceed.
        
    } else { // if selected choice is not absolutely equal to current question object's value for answer...
        timeLeft -= 10; // ...subtract 10 seconds from timeLeft
        if (timeLeft < 0) { // if timeLeft gets to 0 or below...
            timeLeft = 0; // ...then make timeLeft = 0
        }
    }

    if (currentQuestionIndex < questions.length - 1) { // if currentQuestionIndex is less than the length of the questions array - 1...
        currentQuestionIndex++; // ...then increment index of questions array (move to the next question)...       
        showQuestion(); // ...and run showQuestion() function
    } else { // else, if the currentQuestionIndex reaches the length of the questions array... 
        endQuiz(); // ...then run the endQuiz function
    }
}

function updateTimer() { // function to update timer
    timerElement.innerText = timeLeft; // populate timerElement with timeLeft value
    timeLeft--; // decrement timeLeft
    if (timeLeft < 0) { // if timeLeft value goes below zero...
        endQuiz(); // ...then initiate endQuiz function
    }
}

function endQuiz() { // function to end quiz
    clearInterval(timerInterval); // calls the clearInterval function to stop the timerInterval value from updating
    questionContainer.classList.add('hide'); // add class = 'hide' to questionContainer to hide the questions
    endContainer.classList.remove('hide'); // remove class = 'hide' from endContainer to show completion message and final score
    finalScoreElement.innerText = timeLeft; // populate finalScoreElement with value of timeLeft upon endQuiz function initiation
}

initialsForm.addEventListener('submit', function(event) { // listen for initialsForm submit button to trigger function(event)
    event.preventDefault(); // prevent default so event does not trigger page reload
    const initials = document.getElementById('initials').value; // declare variable based on value of initials input
    saveHighScore(initials, timeLeft); // run saveHighScore function with initials and timeLeft
    showHighScores();
    // console.log(initials, timeLeft); // logs initials and timeLeft final score to the console
});


highScoresBtn.addEventListener('click', showHighScores); // event listener for "View High Scores" button


function showHighScores() { // function to show the high score sheet
    questionContainer.classList.add('hide'); // add class = 'hide' to questionContainer to hide the element
    endContainer.classList.add('hide'); // add class = 'hide' to endContainer to hide the element
    highScoreContainer.classList.remove('hide'); // remove class = 'hide' from highScoreContainer to show the element

    highScoreList.innerHTML = ''; // clear existing highScoreList

    const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // define variable of highScores by pulling 'highScores'(key used to store scores) from localStorage. convert value from string (localStorage) into an array using JSON.parse(). | |(or) if there are no highScores in localStorage, return an empty array--also ensures highScores will initiate as an array.

    highScores.forEach(score => { // iterates over each element in highScores array (each high score)
        const li = document.createElement('li'); // inside DOM, creates a <li> element. represents one high score entry.
        li.textContent = `${score.initials}: ${score.score}`; // populates <li> element as a string value containing intials and score values reference by Jquery
        highScoreList.appendChild(li); // append <li> element to the highScoreList <ol> element
    });
}

function saveHighScore(initials, score) { // function to save high scores to local storage. takes two parameters (initials, score)

    const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // retrieves stored highScores from local storage and parses them from a string to an array

    highScores.push({ initials, score }); // adds high score entry as a two-property object, to the end of highScores array

    highScores.sort((a, b) => b.score - a.score); // sort method used to rearrange highScores array in descending order by score. comparator used to place greater numbers earlier in the array.

    highScores.splice(5); // after sorting, removes elements from index 5 onward, keeping the maximum number of entries at five.

    localStorage.setItem('highScores', JSON.stringify(highScores)); // save item in local storage as a string. value must be a string to be stored locally.
}