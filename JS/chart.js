var ctx = document.getElementById('myChart').getContext('2d');

var data = parseJson()

console.log(data.length)
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: data.segundos,
        responsive: true,
        datasets: [{
            label: 'Cars',
            //backgroundColor: 'rgb(91,192,222)',
            borderColor: 'rgb(91,192,222)',
            fill: false,

            data: data.carros
        }, {
            label: 'Personas',
            borderColor: 'rgb(255, 51,34)',
            data: data.personas,
            fill: false
        }]
    },

    // Configuration options go here
    options: {

    }
});


function counter() {
    let counter = []
    for (let i = 0; i < 4; i++) {
        counter[i] = i
    }
    return counter
}

function parseJson() {
    let cars = []
    let segundos = []
    let persons = []
    let i = 0
    var request = new Request('./data.json')

    fetch(request)
        .then(res => res.json())
        .then(function(data) {
            data.processing.forEach(function(processingObjects) {

                processingObjects.detections.forEach(function(detectionsObjects) {
                    console.log(detectionsObjects.objects.car)
                    cars.push(detectionsObjects.objects.car)
                    segundos.push(detectionsObjects.seconds)
                    persons.push(detectionsObjects.objects.person)
                    console.log(detectionsObjects.seconds)


                    //persons[i] = detectionObjects.objects.person
                    i++
                })
            });
        })

    return {
        carros: cars,
        segundos: segundos,
        personas: persons
    }


}