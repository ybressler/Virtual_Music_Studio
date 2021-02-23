"use strict"

let labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let data = [30, 10, 62, 15, 5, 97, 25];
let colors = ['#FCD5BE;', '#F8B195', '#F67280', '#C06C84', '#A8A0B1', '#6C5B7B', '#355C7D'];

// myChart1 = the query in 2D context
let myChart = document.getElementById("myChart").getContext('2d');

// render the chart
let chart = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: labels, 
        datasets: [ {
            data: data,
            backgroundColor: colors
        }] 
    },
    options: {
        // title = the question we are asking
        title: {
            text: "How many minutes did you practice per day this week?",
            display: true
        },
        legend: {
            display: false
        }
    }
});
// ________________________________________________________________________________________________________________________

$.get('/charts.json', (res) => {
    const data = res.data.map((practiceTotal) => {
        return {x: practiceTotal.date, y: practiceTotal.minutes_practiced};
    });

    let colors = ['#FCD5BE;', '#F8B195', '#F67280', '#C06C84', '#A8A0B1', '#6C5B7B', '#355C7D'];


    new Chart(
        $('#line-time'),
        {
            type: 'bar',
            data: {
                labels: 'Minutes Practiced',
                datasets: [
                    {   
                        data: data,
                        backgroundColor: colors,
                    }
                ]
            },
            options: {
                title: {
                    text: "How many minutes did you practice per day this week?",
                    display: true
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {   
                            // categoryPercentage: 1,
                            // barPercentage: .9,
                            type: 'time',
                            time: {
                                unit: 'day',
                                round: 'day',
                                displayFormats: {
                                    day: 'MMM D'
                                },
                            },
                            gridLines: {
                                offsetGridLines: false,
                                drawTicks: true,
                                display: true
                            },
                            stacked: true,
                            distribution: 'series'
                        }
                    ],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: (tooltipItem) => {
                            return moment(tooltipItem.label).format('MMM D');
                        }
                    }
                }
            }
        }
    )
});

//________________________________________________________________________________________________________________________
$.get('/charts.json'), (res) => {
    const data = res.data.map((practiceTotal) => {
        return {x: practiceTotal.date, y: practiceTotal.minutes_practiced};
    });

    let colors = ['#FCD5BE;', '#F8B195', '#F67280', '#C06C84', '#A8A0B1', '#6C5B7B', '#355C7D'];

    

    new Chart( $('#thirdChart'), {
        type: 'bar',
        data: {
            labels: 'Minutes Practiced',
            datasets: [ {
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            title: {
                text: 'How many minutes did you practice in a day?',
                display: true
            }
        }
    })

};

