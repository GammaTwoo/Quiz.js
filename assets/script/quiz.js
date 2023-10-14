// Pun not intended

// Its kind of intended

/*

Ready?
Press any button to continue

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