var userQuestionAnswer = ""

const localStorageEnadeTest = window.localStorage.getItem('enadeTest')
var jsonEnadeTest = JSON.parse(localStorageEnadeTest)

var testAlternatives = jsonEnadeTest.test.alternatives
var testResult = jsonEnadeTest.test.result
var testAnswers = jsonEnadeTest.test.answers

const questionNumberSplit = document.getElementById('question-number').textContent.split(' ')
const questionNumber = (questionNumberSplit[1].split('/'))[0]

// LISTAGEM DOS LINKS, MARCANDO CERTO E ERRADO
const listQuestionsLinks = () => {
    console.log(questionNumber)
    const ul_questions_link = document.getElementById('questions-link')

    ul_questions_link.innerHTML = ''

    testResult.map((element, elementIndex) => 
        ul_questions_link.innerHTML += `
            <li class="${elementIndex+1 == questionNumber && element == false ? "actual-question wrong-answer" : elementIndex+1 == questionNumber && element == true ? "actual-question correct-answer" : elementIndex+1 == questionNumber ? "actual-question" : element == null ? "no-answer" : element == true ? "correct-answer" : "wrong-answer"}">
                <a href="./Eq6_Q${elementIndex+1}.html">${elementIndex+1}</a>
            </li>
        `
    )
}

// LISTAGEM DAS ALTERNATIVAS, MARCANDO CERTO E ERRADO
const listQuestionsAlternatives = () => {
    const li_question_alternatives = document.getElementsByClassName('alternative')

    if (jsonEnadeTest.finishedAt != undefined) {
        document.getElementById('finish-test-button').style.display = "none"
        document.getElementById('test-results-button').style.display = "flex"

        for (let counter = 0; counter < 5; counter++) {
            const li_div_question_alternatives = li_question_alternatives[counter].children[0]
            li_question_alternatives[counter].className = "alternative disable-alternative"
            li_div_question_alternatives.disabled = true
        }
    } else{

        if(testResult[questionNumber - 1] == null){
            for (let counter = 0; counter < 5; counter++) {
                li_question_alternatives[counter].className = "alternative no-alternative"
            }
        } else {
            for (let counter = 0; counter < 5; counter++) {
                const li_div_question_alternatives = li_question_alternatives[counter].children[0]
    
                const alternativeSplit = li_div_question_alternatives.id.split('_')
                const alternative = alternativeSplit[1].split('A').toString().toUpperCase()
    
                if(alternative[1] == testAnswers[questionNumber-1]){
                    li_question_alternatives[counter].className = "alternative correct-alternative"
                    li_div_question_alternatives.disabled = true
                    if(testAlternatives[questionNumber-1] == testAnswers[questionNumber-1]){
                        li_div_question_alternatives.disabled = false
                        li_div_question_alternatives.checked = true
                    }
                } else if (alternative[1] == testAlternatives[questionNumber-1]) {
                    li_question_alternatives[counter].className = "alternative wrong-alternative"
                    li_div_question_alternatives.disabled = false
                    li_div_question_alternatives.checked = true
                } else {
                    li_question_alternatives[counter].className = "alternative disable-alternative"
                    li_div_question_alternatives.disabled = true
                }
    
                const answerQuestionButton = document.getElementById('answer-question-button')
                answerQuestionButton.style = "background-color: #b6b6b6; cursor: default"
                answerQuestionButton.disabled = true
    
                const statsQuestionButton = document.getElementById('question-stats-button')
                statsQuestionButton.style = "background-color: #0072D4; cursor: pointer"
                statsQuestionButton.disabled = false
            }
        }
    }
}

const nextQuestion = (id) => window.location.href = `./Eq6_Q${parseInt(questionNumber)+1}.html`


const openModalAnswer = () => {
    document.getElementById('modal-answer').style.display = 'flex'

    const li_question_alternatives = document.getElementsByClassName('alternative')
    var correctTextAlternative = ''
    var wrongTextAlternative = ''
    
    for (let counter = 0; counter < 5; counter++) {
        const li_div_question_alternatives = li_question_alternatives[counter].children[0]
        const alternativeSplit = li_div_question_alternatives.id.split('_')
        const alternative = alternativeSplit[1].split('A').toString().toUpperCase()

        if (alternative[1] == testAnswers[questionNumber-1]) {
            correctTextAlternative = li_question_alternatives[counter].children[1].textContent
        } else if (alternative[1] == testAlternatives[questionNumber-1]){
            wrongTextAlternative = li_question_alternatives[counter].children[1].textContent
        }
    }
    
    document.getElementById('modal-answer').children[0].innerHTML = ''
    document.getElementById('modal-answer').children[0].innerHTML += 
    `
        <div class="modal-header">
            <p class="modal-title">${testAlternatives[questionNumber-1] == testAnswers[questionNumber-1] ? "Resposta Correta" : "Resposta Errada"}</p>
            <button class="modal-close-button" onclick="closeModal('modal-answer')"> <img src="../../imgs/x-icon.svg" alt="Close modal"> </button>
        </div>
        <hr>

        ${
            testAlternatives[questionNumber-1] == testAnswers[questionNumber-1] ?
                `
                    <p style="width: 100%; text-align: start; font-size: 16px;">Alternativa correta: <span style="font-weight: 700;">${testAnswers[questionNumber-1]}</span> </p> 
                    <p class="modal-alternative-text modal-alternative-text-correct">${correctTextAlternative}</p>
                `
            :
                `
                <p style="width: 100%; text-align: start; font-size: 16px;">Você assinalou a opção: <span style="font-weight: 700;">${testAlternatives[questionNumber-1]}</span> </p>
                    <p class="modal-alternative-text modal-alternative-text-wrong">${wrongTextAlternative}</p>        
                    
                    <p style="width: 100%; text-align: start; font-size: 16px;">Alternativa correta: <span style="font-weight: 700;">${testAnswers[questionNumber-1]}</span> </p>
                    <p class="modal-alternative-text modal-alternative-text-correct">${correctTextAlternative}</p>
                `
        }
    `
}

const answerQuestion = () => {
    testAlternatives[questionNumber-1] = userQuestionAnswer
    userQuestionAnswer == testAnswers[questionNumber-1] ? testResult[questionNumber-1] = true : testResult[questionNumber-1] = false

    localStorage.setItem('enadeTest', JSON.stringify({
        "startAt": jsonEnadeTest.startAt,
        "test": {
            "alternatives": testAlternatives,
            "result": testResult,
            "answers": testAnswers
        }
    }))
    
    listQuestionsLinks()
    listQuestionsAlternatives()
    openModalAnswer()
}

const handleRadioChange = (radioButton) => {
    const answerQuestionButton = document.getElementById('answer-question-button')
    answerQuestionButton.style = "background-color: #0072D4; cursor: pointer"
    answerQuestionButton.disabled = false

    radioButtonAlternativeSplit = radioButton.id.split('_')
    radioButtonAlternative = radioButtonAlternativeSplit[1].split('A')
    userQuestionAnswer = radioButtonAlternative[1].toUpperCase()
}

const finishTest = () => {
    const now = new Date();

    localStorage.setItem('enadeTest', JSON.stringify({
        "startAt": jsonEnadeTest.startAt,
        "finishedAt": String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0'),
        "test": {
            "alternatives": testAlternatives,
            "result": testResult,
            "answers": testAnswers
        }
    }))
}


window.onload = listQuestionsLinks(), listQuestionsAlternatives()