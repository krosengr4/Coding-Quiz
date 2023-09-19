// The four questions that are displayed throughout the quiz. Stored in an array.
const questions = [
    {
        question: "Q1. What is a function?",
        answers: [
            { text: "Reusable code", correct: true},
            { text: "A special variable that can hold more than one value", correct: false},
            { text: "A selector that matches an element based on the value of the element's id attribute", correct: false},
            { text: "All of the above", correct: false},
        ]
    }, 
    {
        question: "Q2. What is an array?",
        answers: [
            { text: "Reusable code", correct: false},
            { text: "A popular CSS framework for developing responsive and mobile-first websites", correct: false},
            { text: "A type of variable that can be used to store multiple values", correct: true},
            { text: "All of the above", correct: false},
        ]
    },
    {
        question: "Q3. What is an ID selector?",
        answers: [
            { text: "Using console.log() to display values in the console window", correct: false},
            { text: "A special variable that can hold more than one value", correct: false},
            { text: "A selector that matches an element based on the value of the element's id attribute", correct: true},
            { text: "All of the above", correct: false},
        ]
    },
    { 
        question: "Q4. What is a method to debug your code?",
        answers: [
            { text: "Reusable code", correct: false},
            { text: "Using console.log() to display values in the console window", correct: true},
            { text: "A popular CSS framework for developing responsive and mobile-first websites", correct: false},
            { text: "All of the above", correct: false},
        ]
    }
]; 

var questionElement = document.getElementById("question");
var results = document.getElementById('question1');
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreButton = document.getElementById("highScore");
const answer = document.getElementById("answer");
const timer1 = document.getElementById("timer1");
const timer2 = document.getElementById("timer2");
var timervar;

console.log(answer);
console.log(scoreButton);


let currentQuestionIndex = 0;
let score = 0;

var timeAllowed = 60;
var timeLeft = timeAllowed;
let highScore = 0;


// Function that is run after the page is opened. Calls timer and showQuestion functions.
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    timer();
    showQuestion(); 
}
// Code to display the questions 
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;


    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        console.log("after select answer");
    });
}

function stopQuiz() {
    console.log("stop test");
}

// Function to make the timer work.
function timer() {
    timeLeft = timeAllowed;
    console.log("timer called");
    timervar = setInterval(function(){
    if (timeLeft<=0) {
        clearInterval(timervar);
        stopQuiz();
    }

    timer1.value = timeLeft;
    timer2.innerHTML = timeLeft + " seconds";

    timeLeft -=1;
    }, 1000)
}
 

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function resetAfterScores(){
    console.log(results);
    while(results.firstChild){
        results.removeChild(results.firstChild);
    }
}

// Function to determine wether user answer is correct or incorrect. 
function selectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        answer.innerHTML = "Correct";
        console.log(score, "correct");
    }else{
        selectedBtn.classList.add("incorrect");
        answer.innerHTML = "Incorrect - 3 second penalty";
        timeLeft -= 3;

        console.log(score ,"incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

let inputBox = "KR";

// Function that shows the users score at the end of the quiz and prompts user to enter initials.
function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ' + timeLeft + ' out of ' + timeAllowed + '.' + '\n' + 
    'Enter your initials: ';
    
    inputBox = document.createElement("input");
    document.getElementById('question').appendChild(inputBox);

    nextButton.innerHTML = "Submit"; 
    nextButton.style.display = "block";
    userScores.unshift(timeLeft);
    clearInterval(timervar);

    console.log(userScores);
};


function handleNextButton(){
    if (currentQuestionIndex === -1) {

        console.log('[p[pe');
        resetAfterScores();
        nextButton.innerHTML = "Next";  
        nextButton.style.display = "block";
        timeLeft = timeAllowed;
        timer();
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
    answer.innerHTML = "";
}


nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        saveScore();
    }
});


var userScores = [];
var userInitials = [];


function saveScore() {
    console.log("In save score");
    resetState();
    questionElement.innerHTML = 'High Scores'
    userInitials.unshift(inputBox.value);
    console.log(userInitials);
    
    console.log(results);

    for (i=0; i < userScores.length; i++){
        let highResults = userInitials[i] + '   |   ' + userScores[i];

        console.log(userScores[i]);
        console.log(userInitials[i]);

        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('p');

        link.textContent = highResults;

        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        results.appendChild(createTableRow);
    };

        
        nextButton.innerHTML = "Restart";  
        nextButton.style.display = "block";
        currentQuestionIndex = -1;
};





scoreButton.addEventListener('click', displayHighScores);

function displayHighScores() {
    score = timeLeft;
    
    
    console.log('u clicked', scoreButton);

};

console.log(displayHighScores, 'scores');

startQuiz(); // <--- When page is opened, this function will run automatically.

