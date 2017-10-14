var stockSigns = '\"GOOGL\",\"AAPL\",\"FB\",\"MSFT\"';
var yahooStocks =
  'https://query.yahooapis.com/v1/public/yql?format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=&q=select * from yahoo.finance.quotes where symbol in (' +
  stockSigns + ')';
var cursEuro = 'https://api.fixer.io/latest?symbols=RON,GBP,USD';

function getStockPrices() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);
      displayStocks(json);
    }
  };

  xhttp.open('GET', yahooStocks, true);
  xhttp.send();
}

function displayStocks(json) {
  var htmlStocks = '';
  var symbols = json.query.results.quote;
  var size = symbols.length;
  for (var i = 0; i < size; i++) {
    htmlStocks += getHtmlStock(symbols[i]);
  }

  document.getElementById('stocks_wrapper').innerHTML = htmlStocks;
}

function getHtmlStock(stock) {
  var htmlStock =
    `
        <div class="stock-box">
            <p class="stock-symbol">Symbol: ${stock.symbol}</p>
            <hr/>
            <p>Bid: ${stock.Bid}</p>
            <p>Year High: ${stock.YearHigh}</p>
            <p>Year Low: ${stock.YearLow}</p>
            <p>Volume: ${stock.Volume}</p>
        </div>
    `;
  return htmlStock;
}

function getCursEuro() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);
      displayCursEuro(json);
    }
  };

  xhttp.open('GET', cursEuro, true);
  xhttp.send();
}

function displayCursEuro(json) {
  var htmlCurs = '';
  var rates = json.rates;
  htmlCurs += getHtmlCurs('GBP', rates.GBP);
  htmlCurs += getHtmlCurs('USD', rates.USD);
  htmlCurs += getHtmlCurs('RON', rates.RON);

  document.getElementById('exchange_wrapper').innerHTML = htmlCurs;
}

function getHtmlCurs(symbol, curs) {
  var htmlCurs =
    `
        <div class="curs-box">
            <p class="stock-symbol">EUR ${symbol}</p>
            <hr/>
            <p>${curs}</p>
        </div>
    `;
  return htmlCurs;
}

getStockPrices();
getCursEuro();
