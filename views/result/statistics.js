const localStorageEnadeTest = window.localStorage.getItem('enadeTest')
var jsonEnadeTest = JSON.parse(localStorageEnadeTest)

var testAlternatives = jsonEnadeTest.test.alternatives

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


const listCharts = (testAlternatives, chartData) => {
    chartData.map((element, elementIndex) => {
        document.getElementById("chart-section").innerHTML += 
        `
            <div class="chart">
                <div class="test-info">
                    <h3>Questão ${element[0]}</h3>

                    ${
                        testAlternatives[elementIndex] == null ?
                        `<p class="question-result" style="background-color: #c9c9c92f;">Questão não respondida<p/>`
                        : element[1].trim() == testAlternatives[elementIndex].trim() ?
                        `<p class="question-result correct-alternative">Resposta correta<p/>`
                        :
                        `<p class="question-result wrong-alternative">Resposta incorreta<p/>`
                    }

                    <hr>
                    <p class="question-answer">Você marcou a alternativa: <b>${testAlternatives[elementIndex] != null ? testAlternatives[elementIndex] : " -" }</b></p>
                    <p class="question-answer">Alternativa correta: <b>${element[1]}</b></p>
                    <hr>
                    <div class="chart-js">
                        <canvas id="myChart${element[0]}" style="display: flex; justify-self: center;"></canvas>
                    </div>
                    <span class="source">fonte: Dados fictícios</span>
                    <hr>
                    <a href="../questions/Eq6_Q${element[0]}.html">Ver Questão</a>
                </div>
            </div>
        `
    })
    
    for (let i = 0; i < chartData.length; i++) {
        new Chart(document.getElementById(`myChart${i+1}`), {
            type: 'pie',
            data: {
                labels: ['A', 'B', 'C', 'D', 'E'],
                datasets: [{
                    data: [
                        chartData[i][2][0],
                        chartData[i][2][1],
                        chartData[i][2][2],
                        chartData[i][2][3],
                        chartData[i][2][4]
                    ],
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
}

window.onload = listCharts(testAlternatives, chartData)