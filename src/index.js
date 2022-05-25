const url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata"
const coins = [
    {
        "symbol": "EUR",
        "name": "Euro"
    },
    {
        "symbol": "GBP",
        "name": "Libra Esterlina"
    },
    {
        "symbol": "USD",
        "name": "Dólar dos Estados Unidos"
    }
]

const getPriceByPeriod = async (coin, startDate, endDate) => {
    const res = await fetch(`${url}/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40moeda='${coin}'&%40dataInicial='${startDate}'&%40dataFinalCotacao='${endDate}'&%24format=json`);
    const data = await res.json();

    return data.value;
}

const getCoinsPriceByPeriod = async (coins, startDate, endDate) => {
    const result = [];

    for (const coin of coins) {
        const prices = await getPriceByPeriod(coin, startDate, endDate);
        console.log(prices)
        result.push(...prices);
    }

    return result;
}

const formatDate = (date) => {
    let day = date.getDate()
    let month = date.getMonth() + 1

    if (day < 10) {
        day = "0" + day
    }

    if (month < 10) {
        month = "0" + month
    }

    const year = date.getFullYear()

    return `${month}-${day}-${year}`
}

const drawLineChart = (coins, startDate, endDate, formatIsTable) => {
    const startDateString = formatDate(startDate)
    const endDateDateString = formatDate(endDate)

    const data = new google.visualization.DataTable();
    data.addColumn('date', 'data');

    coins.forEach(coin => data.addColumn('number', coin));

    getCoinsPriceByPeriod(coins, startDateString, endDateDateString).then(prices => {
        const table = [];

        const sizePerCoin = prices.length / coins.length;
        for (let i = 0; i < sizePerCoin; i++) {
            const row = [new Date(prices[i].dataHoraCotacao)]

            for (let j = 0; j < coins.length; j++) {
                row.push(prices[i + j * sizePerCoin].cotacaoCompra);
            }

            table[i] = row
        }

        data.addRows(table)

        const options = {
            hAxis: {
                title: 'Tempo'
            },
            vAxis: {
                title: 'Valor'
            }
        };

        let chart
        if (formatIsTable) {
            chart = new google.visualization.Table(document.getElementById('chart_div'));
        } else {
            chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        }
        chart.draw(data, options);
    });
}

const initialize = () => {
    document.getElementById("dataInicio").max = new Date().toISOString().split("T")[0];
    document.getElementById("dataFim").max = new Date().toISOString().split("T")[0];

    const coinsToSearch = []

    $(document).ready(function () {
        $("#button").on("click", function () {
            coins.forEach(coin => {
                const checked = document.getElementById(coin.symbol).checked
                if (checked) {
                    coinsToSearch.push(coin.symbol)
                }
            })

            let startDate = document.getElementById("dataInicio").value
            let endDate = document.getElementById("dataFim").value

            if (!startDate || !endDate) {
                alert("Você precisa selecionar a data de inicio e fim");
                return;
            }

            startDate = new Date(startDate)
            endDate = new Date(endDate)

            if (startDate > endDate) {
                alert("A data de inicio não pode ser maior que a data final");
                return;
            }

            const table = document.getElementById('table').checked

            drawLineChart(coinsToSearch, startDate, endDate, table)
        });
    });
}