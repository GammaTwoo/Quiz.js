// Pun not intended

// Its kind of intended

let currentQuestionIndex = 0
let userScore = 0
let elapsedTime = 0
let intervalId
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

// making setTimeout promise based so i can use it in the for loop and have intended results
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// shuffles the questions into a new array so they appear in a random order
function shuffleArray(array) {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
}

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
})
}

function selectOption(index) {
    const currentQuestion = quizData[currentQuestionIndex]
    const selectedOption = currentQuestion.options[index]

    if (selectedOption === currentQuestion.correctAnswer) {
        userScore++
    }

    nextQuestion()
}

async function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function formHandler(score, time) {
    let form = document.createElement('form')
    let headerEl = document.createElement('h1')
    let scoreEl = document.createElement('p')
    let initialInput = document.createElement('input')
    let submitButton = document.createElement('button')
}

function clearHandler() {
    while (document.body.firstChild) {
        document.body.firstChild.remove(document.body.firstChild)
    }

    formHandler(userScore, elapsedTime)
}

function endQuiz() {
    clearInterval(intervalId)
    clearHandler()
}

// handles the stopwatch to keep time
function startStopwatch() {
        let startTime = new Date().getTime()
        let timer = document.getElementById('timer')

        intervalId = setInterval(() => {
        const currentTime = new Date().getTime()
        elapsedTime = Math.floor((currentTime - startTime) / 1000)
    
        timer.textContent = elapsedTime
        }, 1000)
}

// counts down to the start of the quiz
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
    // i used a for loop and a promise based setTimeout so i didnt have to use setTimeout 3 times. ie, less clunky code and arguably easier to update/troubleshoot if necessary
}

document.addEventListener('keydown', () => {
    let countdownPrompt = document.getElementById('prompt')

    countdownPrompt.remove()

    updateCountdown().then(() => {
        let promptContainer = document.getElementById('promptContainer')

        promptContainer.remove()

    }).then(() => {
        startStopwatch(),
        showQuestion()
    })
})



/*
Press any button to continue

Ready?

Set

Go!

on page load,  start a timer (probably count up instead of count down)

    timer = on

load questions from quiz.json

    const questionAmount = 10
    let array = 1-50
    shuffle array
    i = 0-9
    parse JSON per question for arr[i] where arr[i]+1=question number

then, display first question

    document body = (
        question = '' => an empty string for later question
        a ''
        b ''
        c ''
        d ''
    )


answering questions will display the next question, regardless of right or wrong

    add event listener class option
    await click?
    on click, parse json for next question

keep track of right/10

    let correctAnswrs = 0
    if (correct) { return correctAnswers = correctAnswers+1 } else { timer+1 }

answering wrong will add 1 second to the timer

at the end, store time, #/10, and allow a name (probably and initial) to be added, into local storage as a JSON object

    document body = (
        input textarea
        submit button
    )

    name = textarea.value()

    to local storage => name {
        "correctOfTen":`${correctAnswers}/10`
        "time":`${time}` => in seconds to the nearest hundredth
    }

*/