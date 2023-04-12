const localStorageEnadeTest = window.localStorage.getItem('enadeTest')
var jsonEnadeTest = JSON.parse(localStorageEnadeTest)

var testAlternatives = jsonEnadeTest.test.alternatives
var testResult = jsonEnadeTest.test.result
var testAnswers = jsonEnadeTest.test.answers
var testStartTime = jsonEnadeTest.startAt

const listMyAnswers = () => {
    const tableMyAnswers = document.getElementById('table-my-answers-results')
    testAlternatives.map((element, elementIndex) => {
        tableMyAnswers.innerHTML +=
        `
            <tr>
                <td><a href="../questions/Eq6_Q${elementIndex+1}.html">${elementIndex+1}</a></td>
                <td class="${element == testAnswers[elementIndex] ? "correct-alternative" : "wrong-alternative"}">${element == null ? "-" : element}</td>
            </tr>
        `
    })
}

const listMyResults = () => {
    var correct_answers = 0
    var wrong_answers = 0
    var null_answers = 0
    
    testResult.map((element) => {
        switch (element) {
            case true: correct_answers += 1
                break;

            case false: wrong_answers += 1
                break;

            case null: null_answers += 1
                break;
        
            default:
                break;
        }
    })

    document.getElementById('my-results-percent-correct').innerText = correct_answers    
    document.getElementById('my-results-percent-wrong').innerText = wrong_answers + null_answers
    document.getElementById('my-results-percent-null').innerText = null_answers
    
    const startAtSplit = jsonEnadeTest.startAt.split(':')
    const finishedAtSplit = jsonEnadeTest.finishedAt.split(':')
    document.getElementById('my-results-time').innerText =
        String(finishedAtSplit[0] - startAtSplit[0] < 0 ? (finishedAtSplit[0] - startAtSplit[0])*(-1) : (finishedAtSplit[0] - startAtSplit[0])).padStart(2, '0')
            + ":" + 
        String(finishedAtSplit[1] - startAtSplit[1] < 0 ? (finishedAtSplit[1] - startAtSplit[1])*(-1) : (finishedAtSplit[1] - startAtSplit[1])).padStart(2, '0')
            + ":" +
        String(finishedAtSplit[2] - startAtSplit[2] < 0 ? (finishedAtSplit[2] - startAtSplit[2])*(-1) : (finishedAtSplit[2] - startAtSplit[2])).padStart(2, '0')
}

window.onload = listMyAnswers(), listMyResults()