var userQuestionAnswer = ""

const localStorageEnadeTest = window.localStorage.getItem('enadeTest')
var jsonEnadeTest = JSON.parse(localStorageEnadeTest)

var testAlternatives = jsonEnadeTest.test.alternatives
var testResult = jsonEnadeTest.test.result
var testAnswers = jsonEnadeTest.test.answers

const questionNumberSplit = document.getElementById('question-number').textContent.split(' ')
const questionNumber = questionNumberSplit[1]

// LISTAGEM DOS LINKS, MARCANDO CERTO E ERRADO
const listQuestionsLinks = () => {
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
        <p class="modal-title">${testAlternatives[questionNumber-1] == testAnswers[questionNumber-1] ? "Resposta Correta" : "Resposta Errada"}</p>
        <hr>

        ${
            testAlternatives[questionNumber-1] == testAnswers[questionNumber-1] ?
                `
                    <span>Alternativa certa:</span> 
                    <p class="modal-alternative-text modal-alternative-text-correct">${correctTextAlternative}</p>
                `
            :
                `
                    <span>Você marcou:</span>
                    <p class="modal-alternative-text modal-alternative-text-wrong">${wrongTextAlternative}</p>        
                    
                    <span>Alternativa certa:</span> 
                    <p class="modal-alternative-text modal-alternative-text-correct">${correctTextAlternative}</p>
                `
        }

        <div class="modal-button">
            <button class="modal-close-button" onclick="closeModal('modal-answer')">FECHAR</button>
            <button class="modal-accept-button" onclick="window.location.href = './Eq6_Q${Number(questionNumber)+1}.html'">PRÓXIMA QUESTÃO</button>
        </div>
    `
}

const answerQuestion = () => {
    testAlternatives[questionNumber-1] = userQuestionAnswer
    userQuestionAnswer == testAnswers[questionNumber-1] ? testResult[questionNumber-1] = true : testResult[questionNumber-1] = false

    localStorage.setItem('enadeTest', JSON.stringify({
        "startAt": enadeTest.startAt,
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


window.onload = listQuestionsLinks(), listQuestionsAlternatives()