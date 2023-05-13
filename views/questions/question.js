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

const nextQuestion = () => window.location.href = `./Eq6_Q${parseInt(questionNumber)+1}.html`

const openModalGraphic = () => {
    const chartData = [
        [1,'D',[29,12,4,7,46]],
        [2,'E',[13,11,17,21,37]],
        [3,'D',[9,52,6,24,9]],
        [4,'E',[27,12,7,17,36]],
        [5,'C',[9,52,6,24,9]],
        [6,' A',[61,6,21,7,5]],
        [7,'B',[14,62,12,4,8]],
        [8,' D',[19,21,26,2,14]],
        [9,'E',[16,81,25,27,14]],
        [10,'A',[39,18,22,6,15]],
        [11,'B',[21,19,17,2,22]],
        [12,' C',[25,18,26,21,11]],
        [13,'D',[2,3,89,3,3]],
        [14,'E',[2,62,6,11,18]],
        [15,'A',[6,1,6,14,11]],
        [16,'B',[6,11,47,2,17]],
        [17,'A',[21,18,15,16,29]],
        [18,'D',[46,9,14,17,14]],
        [19,'B',[25,14,9,42,1]],
        [20,'A',[11,19,35,11,24]],
        [21,'E',[28,2,12,3,9]],
        [22,'C',[12,13,22,16,38]],
        [23,'A',[7,6,16,8,9]],
        [24,'E',[58,9,18,1,5]],
        [25,'D',[29,9,2,15,27]],
        [26,'C',[18,21,24,21,15]],
        [27,'C',[21,21,21,21,21]],
        [28,'B',[21,32,31,1,5]],
        [29,'C',[1,21,17,19,33]],
        [30,'D',[3,5,14,43,7]],
        [31,'E',[18,6,1,3,9]],
        [32,' E',[3,5,4,54,34]],
        [33,'A',[8,1,13,6,63]],
        [34,'B',[23,31,15,11,2]],
        [35,'D',[9,19,53,11,8]]
    ]

    document.getElementById('modal-graphic').style.display = 'flex'
    document.getElementById('modal-graphic').children[0].innerHTML = ''
    document.getElementById('modal-graphic').children[0].innerHTML += 
    `
        <div class="modal-header">
            <p class="modal-title">Questão ${chartData[questionNumber-1][0]}</p>
            <button class="modal-close-button" onclick="closeModal('modal-graphic')"> <img src="../../imgs/x-icon.svg" alt="Fechar"> </button>
        </div>
        <hr>
        
        <p class="modal-text">Gráfico com a porcentagem de distribuição de respostas por alternativa</p>
        <canvas id="myChart" style="display: felx; justify-self: center; max-height: 220px";></canvas>
        <p style="width: 100%; text-align: center; font-size: 12px;">Alternativa correta: <span style="font-weight: 700;">${chartData[questionNumber-1][1]}</span> </p>
        <span class="question-source">fonte: Dados fictícios</span>
    `

    const ctx = document.getElementById('myChart');
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                data: [chartData[questionNumber-1][2][0], chartData[questionNumber-1][2][1], chartData[questionNumber-1][2][2], chartData[questionNumber-1][2][3], chartData[questionNumber-1][2][4]],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(80, 191, 75)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                ],
            }]
        },
        options: {
            scales:{},
            plugins: {
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        const datapoints = ctx.chart.data.datasets[0].data
                        function totalSum (total, datapoint) {
                            return total + datapoint
                        }
                        const totalPorcentage = datapoints.reduce(totalSum, 0)
                        const percentageValue = (value/totalPorcentage*100).toFixed(1)

                        return `${percentageValue}%`
                    },
                    color: '#fff',
                }
            }
        },
        plugins: [ChartDataLabels]
    })
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
        <div class="modal-header">
            <p class="modal-title">${testAlternatives[questionNumber-1] == testAnswers[questionNumber-1] ? "Resposta Correta" : "Resposta Errada"}</p>
            <button class="modal-close-button" onclick="closeModal('modal-answer')"> <img src="../../imgs/x-icon.svg" alt="Fechar"> </button>
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

        ${questionNumber != 35 ? `<button id="next-question-button" onclick="nextQuestion()">Próxima Questão</button>` : ""}
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