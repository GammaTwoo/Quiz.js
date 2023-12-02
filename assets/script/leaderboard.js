let tableBody = document.getElementById('tableBody')
let scores

try {
    scores = JSON.parse(localStorage.getItem('scores')) || []
} catch (error) {
    scores = []
}

function createTable() {
    let slicedScores = scores.slice(0, 10)
    
    for (let i = 0 ; i < slicedScores.length ; i++) {
        let row = document.createElement('tr')

        let cellInitial = document.createElement('td')
            cellInitial.textContent = slicedScores[i].initials
            row.appendChild(cellInitial)

        let cellScore = document.createElement('td')
            cellScore.textContent = slicedScores[i].score
            row.appendChild(cellScore)

        let cellTime = document.createElement('td')
            cellTime.textContent = slicedScores[i].time
            row.appendChild(cellTime)

        tableBody.appendChild(row)
    }
}

document.addEventListener('DOMContentLoaded', createTable())