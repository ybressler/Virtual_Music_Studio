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


// _________________________________________Chart 1_______________________________________________________________
$.get('/charts.json', (res) => {
    const dates = res.dates_practiced; // give us a list of dates
    // ["Feb 28", "Feb 27", "Feb 26", "Feb 25", "Feb 24", "Feb 23", "Feb 22"]
    const practice_times = res.minutes_practiced; // associated practice minutes only
    // [0, 0, 120, 12, 45, 35, 100]

    let myChart2 = document.getElementById("bar-time").getContext('2d');

    let colors2 = ['#FCD5BE;', '#F8B195', '#F67280', '#C06C84', '#A8A0B1', '#6C5 B7B', '#355C7D', '#A8A0B1'];
    let chart2 = new Chart(myChart2, {
        type: 'bar',
        data: {
            labels: dates, 
            datasets: [ {
                data: practice_times,
                backgroundColor: colors2
            }] 
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
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 150
                    }
                }]
            }
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    time: {
                        unit: 'day',
                        round: 'day',
                        displayFormats: {
                            day: 'MMM D'
                        },
                    },
                    distribution: 'series'
                }
            ],
            yAxes: [{
                ticks: {
                    beginAtZero: true
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
    })
});



// ________________________________________________________________________________________________________________________
$.get('/charts/2.json', (res) => {
    const dates_in_month = res.dates_in_month; // give us a list of dates over 4 weeks
    // ["Feb 28", "Feb 27", "Feb 26", "Feb 25", "Feb 24", "Feb 23", "Feb 22", "Feb 21", "Feb 20", "Feb 19", "Feb 18", "Feb 17", "Feb 16", "Feb 15", "Feb 14", "Feb 13", "Feb 12", "Feb 11", "Feb 10", "Feb  9", "Feb  8", "Feb  7", "Feb  6", "Feb  5", "Feb  4", "Feb  3", "Feb  2", "Feb  1"]
    let dates_practiced_in_month = res.log_date; // associated dates on which student practiced
    // [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0]

    let viewDates = [
                        `${dates_in_month[6]} - ${dates_in_month[0]}`, // Feb 28 - Feb 21
                        `${dates_in_month[13]} - ${dates_in_month[7]}`, 
                        `${dates_in_month[20]} - ${dates_in_month[14]}`, 
                        `${dates_in_month[27]} - ${dates_in_month[21]}`
                    ];
    
    const count_dates = function(num_list) {
        let count = 0;
    
        for (let num of num_list) {
            count += num;
        }
        return count;
    };

    let week1 = count_dates(dates_practiced_in_month.slice(0, 6));
    let week2 = count_dates(dates_practiced_in_month.slice(7, 13));
    let week3 = count_dates(dates_practiced_in_month.slice(14, 20));
    let week4 = count_dates(dates_practiced_in_month.slice(21, 27));

    dates_practiced_in_month = [week1, week2, week3, week4];


    let myChart3 = document.getElementById("chart-3").getContext('2d');


    let colors3 = ['#FCD5BE;', '#F8B195', '#F67280', '#C06C84', '#A8A0B1', '#6C5B7B', '#355C7D', '#A8A0B1'];
    let chart3 = new Chart(myChart3, {
        type: 'bar',
        data: {
            labels: viewDates.reverse(), 
            datasets: [ {
                data: dates_practiced_in_month.reverse(),
                backgroundColor: colors3
            }] 
        },
        options: {
            title: {
                text: "How many days did you practice per week this past month?",
                display: true
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 7
                    }
                }]
            }
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    time: {
                        unit: 'day',
                        round: 'day',
                        displayFormats: {
                            day: 'MMM D'
                        },
                    },
                    distribution: 'series'
                }
            ],
            yAxes: [{
                ticks: {
                    beginAtZero: true
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
    })
});

//___________________________
let labels4 = [];
let data4 = [];
let colors4 = ['#FCD5BE;', '#F8B195', '#F67280', '#C06C84', '#A8A0B1', '#6C5B7B', '#355C7D'];

// myChart1 = the query in 2D context
let myChart4 = document.getElementById("myChart4").getContext('2d');

// render the chart
let chart4 = new Chart(myChart4, {
    type: 'bar',
    data: {
        labels: labels4, 
        datasets: [ {
            data: data4,
            backgroundColor: colors4
        }] 
    },
    options: {
        // title = the question we are asking
        title: {
            text: "How many minutes did you practice each week this month?",
            display: true
        },
        legend: {
            display: false
        }
    },
    options: {
        title: {
            text: "How many days did you practice per week this past month?",
            display: true
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 7
                }
            }]
        }
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    unit: 'day',
                    round: 'day',
                    displayFormats: {
                        day: 'MMM D'
                    },
                },
                distribution: 'series'
            }
        ],
        yAxes: [{
            ticks: {
                beginAtZero: true
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
});
