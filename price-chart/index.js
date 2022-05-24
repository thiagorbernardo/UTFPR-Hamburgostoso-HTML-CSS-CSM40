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
const select = false
const drawLineChart = () => {
    const coins = ["USD", "GBP", "EUR"]
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'X');

    coins.forEach(coin => data.addColumn('number', coin));

    getCoinsPriceByPeriod(coins, "05-16-2021", "05-20-2022").then(prices => {
        console.log(prices)
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
        if (select == true) {
            chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        } else {
            chart = new google.visualization.Table(document.getElementById('chart_div'));
        }
        chart.draw(data, options);
    });
}