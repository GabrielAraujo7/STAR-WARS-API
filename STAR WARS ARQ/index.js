// document.getElementById('personagens').innerHTML = 22;

google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(init);

        function init() {
            preencherContador();
            preencherTabela();
            desenharGrafico();
        }
const personagensContador = document.getElementById('personagens');
const luasContador = document.getElementById('luas');
const planetasContador = document.getElementById('planetas');
const navesContador = document.getElementById('naves');

// personagemContador.innerHTML = 25;

preencherContador();
preencherTabela();
desenharGrafico();

async function desenharGrafico() {
        const response = await swapiGet("vehicles/");
        const vehiclesArray = response.data.results;
        console.log(vehiclesArray);


        const dataArray = [];
        dataArray.push(["Veículos", "Passageiros"]);

        vehiclesArray.forEach(vehicle => {
            dataArray.push([vehicle.name, Number(vehicle.passengers)]);
        });
        
        console.log(dataArray);

        var data = google.visualization.arrayToDataTable(dataArray);

        const options = {
            title: 'Número de Passageiros por Veículo'
        };

        const chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }



function preencherContador(){
    // personagemContador.innerHTML = swapiGet("people/").count;

    Promise.all([swapiGet("people/"),swapiGet("starships"),swapiGet("planets/"),swapiGet("vehicles/")]).then(function(
        results
    ){
        // const acct = results[0];
        // const perm = results[1];
        console.log(results)
        personagensContador.innerHTML = results[0].data.count;
        luasContador.innerHTML = results[1].data.count;
        planetasContador.innerHTML = results[2].data.count;
        navesContador.innerHTML = results[3].data.count;

    });
}

async function preencherTabela(){
    const response = await swapiGet('films/');
    console.log(response);
    const tableData = response.data.results;
    console.log(tableData);
    tableData.forEach(film => {
        $('#filmstable').append(`<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
        </tr>`);
    });
}


function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`)
        .then(response => {
            console.log("Response from SWAPI:", response);
            return response; // Retorna a resposta da requisição
        })
        .catch(error => {
            console.error("Error fetching data from SWAPI:", error);
            throw error; // Propaga o erro para ser tratado na função de chamada
        });

        
}