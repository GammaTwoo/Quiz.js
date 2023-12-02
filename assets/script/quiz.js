// Pun not intended

// Its kind of intended

let currentQuestionIndex = 0
let userScore = 0
let elapsedTime = 0
let intervalId
let existingScoreArray;

try {
    existingScoreArray = JSON.parse(localStorage.getItem('scores')) || [];
} catch (error) {
    existingScoreArray = [];
}

// i didnt want to do it this way but i couldnt figure out how to load the JSON file for the life of me
let quizData = [
    {
      "question": "What does JS stand for?",
      "options": ["JustScript", "JavaSyntax", "JavaScript", "JavaSource"],
      "correctAnswer": "JavaScript"
    },
    {
      "question": "Which of the following is not a valid JavaScript data type?",
      "options": ["Number", "String", "Boolean", "Float"],
      "correctAnswer": "Float"
    },
    {
      "question": "How can you check the length of a string in JavaScript?",
      "options": ["string.size()", "string.length()", "string.count()", "string.size"],
      "correctAnswer": "string.length()"
    },
    {
      "question": "What is the purpose of the Array.push() method in JavaScript?",
      "options": ["Removes the last element from an array", "Adds one or more elements to the end of an array", "Reverses the order of elements in an array", "Sorts the elements of an array"],
      "correctAnswer": "Adds one or more elements to the end of an array"
    },
    {
      "question": "Which symbol is used for single-line comments in JavaScript?",
      "options": ["//", "--", "/*", "#"],
      "correctAnswer": "//"
    },
    {
      "question": "What will the following code output: console.log(typeof null);?",
      "options": ["Object", "Null", "Undefined", "String"],
      "correctAnswer": "Object"
    },
    {
      "question": "What is the purpose of the Array.pop() method in JavaScript?",
      "options": ["Adds one or more elements to the end of an array", "Removes the first element from an array", "Removes the last element from an array", "Sorts the elements of an array"],
      "correctAnswer": "Removes the last element from an array"
    },
    {
      "question": "How do you declare a constant variable in JavaScript?",
      "options": ["var", "let", "const", "constant"],
      "correctAnswer": "const"
    },
    {
      "question": "Which function is used to convert a string to lowercase letters in JavaScript?",
      "options": ["tolowercase()", "lowerCase()", "toLower()", "toLowerCase()"],
      "correctAnswer": "toLowerCase()"
    },
    {
      "question": "What does the typeof operator in JavaScript return for an array?",
      "options": ["Object", "Array", "List", "Undefined"],
      "correctAnswer": "Object"
    }
]
// what an ugly block of object text in the middle of my beautiful code

/***** Utility *****/

// Promise-based setTimeout so I can execute the quiz after the countdown without having to hard code timings into it
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/***** Quiz Logic *****/

// clears old question if its there, and puts the new question in its place
function showQuestion() {
    const questionElement = document.getElementById('question')
    const optionsElement = document.getElementById('options')
    const currentQuestion = quizData[currentQuestionIndex]

    questionElement.textContent = currentQuestion.question

    optionsElement.innerHTML = ""
    currentQuestion.options.forEach((option, index) => {
        const listItem = document.createElement('li')
        listItem.textContent = option
        listItem.addEventListener('click', () => selectOption(index)) 
        optionsElement.appendChild(listItem)
    document.removeEventListener('keydown', keydownHandler)
})
}

// checks to see if the selected option was correct. increments score if so
function selectOption(index) {
    const currentQuestion = quizData[currentQuestionIndex]
    const selectedOption = currentQuestion.options[index]

    if (selectedOption === currentQuestion.correctAnswer) {
        userScore++
    }

    nextQuestion()
}

// increments the current question index, checks if its less than the total amount of questions. if it is, shows next question. if not, ends quiz
async function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

/***** Local Storage/Data Handling *****/

// takes the results from the quiz and pushes it to the scores array. puts the scores array in local storage and then switches to the home screen
function localStorageHandler(initials, score, time) {
    let userData = {
        "initials": `${initials}`,
        "score": `${score}/10`,
        "time": `${time}`
    };
    existingScoreArray.push(userData);

    localStorage.setItem('scores', JSON.stringify(existingScoreArray))

    window.history.pushState(null, null, '../../index.html')
}

// removes old event listeners, then creates a form so that you can enter your initials to save your score
function scoreSaver(score, time) {
    btnYes.removeEventListener('click', () => scoreSaver(score, time))

    btnNo.removeEventListener('click', () => {
        window.history.pushState(null, null, '../../index.html')
    })

    form.innerHTML = `
        <h1>Enter your initials below to save your score of ${score}/10 in ${time}</h1>
        <input type="text" id="initialInput" name="initialInput" placeholder="Initial Here"
        maxlength="3" pattern="[A-Za-z]{1,3}" title="Enter up to 3 alphabetical characters">
        <button id="initialSubmit">Submit</button>
    `
    let initialInput = document.getElementById('initialInput')
    let initialSubmit = document.getElementById('initialSubmit')
    initialSubmit.addEventListener('click', () => localStorageHandler(initialInput.value, score, time))
}

/***** UI Functions *****/

// shows your score and asks if you want to save it to the leaderboard
function formHandler(score, time) {
    let form = document.createElement('form')
        form.classList.add('form')
        form.id = 'form'

    form.innerHTML = `
        <h1>Would you like to save your score?</h1>
        <p>You got ${score}/10 questions correct in ${time} seconds</p>
        <div class="button-container">
            <button id="btnYes">Yes</button>
            <button id="btnNo">No</button>
        </div>
        `
    document.body.appendChild(form)
    
    let btnYes = document.getElementById('btnYes')
    let btnNo = document.getElementById('btnNo')
    
    btnYes.addEventListener('click', () => scoreSaver(score, time))

    btnNo.addEventListener('click', () => {
        window.history.pushState(null, null, '../../index.html')
    })
}

// clears the quiz elements to make room for the form stuff
function quizRemover() {
    while (document.body.firstChild) {
        document.body.firstChild.remove(document.body.firstChild)
    }

    formHandler(userScore, elapsedTime)
}

/***** Quiz Lifecycle functions *****/

// stops the timer and calls the quiz remover
function endQuiz() {
    clearInterval(intervalId)
    quizRemover()
}

// starts the timer
function startStopwatch() {
        let startTime = new Date().getTime()
        let timer = document.getElementById('timer')

        intervalId = setInterval(() => {
        const currentTime = new Date().getTime()
        elapsedTime = Math.floor((currentTime - startTime) / 1000)
    
        timer.textContent = elapsedTime
        }, 1000)
}

// starts the quiz after a dramatic "ready, set, go" screen
async function updateCountdown() {
    let countdown = document.getElementById('countdown')
    let screens = [ 
        "Ready?",
        "Set?",
        "Go!"
    ]

    for (let i = 0 ; i < screens.length ; i++ ) {
        countdown.textContent = screens[i]
        await delay(1000)
    }
}

/***** Event listener/handler *****/

// removes the prompt to make way for the countdown, then starts the countdown
// once the countdown is complete, it removes the involved elements
// once that is complete, it calls startStopwatch and showQuestion to start the quiz
const keydownHandler = () => {
    let countdownPrompt = document.getElementById('prompt')

    countdownPrompt.remove()

    updateCountdown().then(() => {
        let promptContainer = document.getElementById('promptContainer')

        promptContainer.remove()

        const quizContainer = document.getElementById('quizContainer')
        quizContainer.classList.remove('hidden')

    }).then(() => {
        startStopwatch(),
        showQuestion()
    })
}

// adds the event listener to trigger the quiz. any keyboard button will start the quiz (normal ones at least)
document.addEventListener('keydown', keydownHandler)