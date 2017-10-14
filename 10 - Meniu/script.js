var MENU_SERVER_URL = 'https://restaurant-menu-v1.firebaseio.com/.json';
var MENU_ITEM_SERVER_URL = 'https://restaurant-menu-v1.firebaseio.com/menu/';
var htmlImagine = '<div class="col col1"><img class="imagine" src="%data%"></div>';
var htmlText = '<div class="col col2"><h2>%name%</h2><p class="ingrediente">%data%</p></div>';
var htmlButton = '<div class="col col3"><a href="./detalii.html?id=%data%"><button class="redButton button">Detalii</button></a></div>';
var htmlDiv = '<div class="rand"></div>';

//Obtinere JSON meniu
function getJson() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);

      console.log(json.menu);
      afisareMeniu(json.menu);
    }
  };

  xhttp.open('GET', MENU_SERVER_URL, true);
  xhttp.send();
}

//Afisare meniu
function afisareMeniu(menu) {
  var form = document.getElementById('input');
  var query = form.value;
  form. value = '';
  document.getElementById('wrapper').innerHTML = '';
  for (var i = 0; i < menu.length; i++) {
    if (query == '' || menu[i].ingrediente.search(query) != -1) {
      var imagine = htmlImagine.replace('%data%', menu[i].imagine);
      var text = htmlText.replace('%data%', menu[i].ingrediente);
      text = text.replace('%name%', menu[i].nume);
      var button = htmlButton.replace('%data%', i);
      document.getElementById('wrapper').innerHTML += htmlDiv;
      var currentDiv = document.getElementById('wrapper').lastChild;
      currentDiv.innerHTML = imagine + text + button;
    }
  }
}

//Afisare detalii mancare
function arataDetalii() {
  var id = getParameterByName('id');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);
      console.log(json);
      afisareDetalii(json);
    }
  };

  xhttp.open('GET', MENU_ITEM_SERVER_URL + id + '.json', true);
  xhttp.send();
}

//Obtinere ID mancare selectata
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//Afisare detalii mancare selectata
function afisareDetalii(json) {
  var img = '<img src="' + json.imagine + '">';
  var nume = '<h2>' + json.nume + '</h2>';
  var reteta = '<p>' + json.reteta + '</p>';
  document.getElementById('wrapper').innerHTML += img + nume + reteta;
}

//'Enter' pentru filtrare
function submitEnter(event) {
  if (event.keyCode == 13) {
    getJson();
  }
}
