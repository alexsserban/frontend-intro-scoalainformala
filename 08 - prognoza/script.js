var URL_CURRENT_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
var URL_FORECAST_WEATHER = 'https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
var URL_WEATHER_ICON_PREFIX = 'http://openweathermap.org/img/w/';
var HTMLvremeTitle = '<h2 class="vremeTitle">Vremea acum</h2><hr>';
var HTMLvremeImg = '<img class="vremeImg" src="%data%"> <br>';
var HTMLvremeDescriere = '<p class="vremeDescriere">Descriere: %data%</p>';
var HTMLvremeUmiditate = '<p class="vremeUmiditate">Umiditate: %data%</p>';
var HTMLvremePresiune = '<p class="vremePresiune">Presiune: %data%</p>';
var HTMLvremeTemperatura = '<p class="vremeTemperatura">Temperatura: %data%</p>';
var HTMLvremeMin = '<p class="vremeMin">Minima zilei: %data%</p>';
var HTMLvremeMax = '<p class="vremeMax">Maxima zilei: %data%</p>';
var HTMLvremeZiua = '<p class="vremeZiua"><strong>Ziua: %data%</strong></p>';
var HTMLvremeOra = '<p class="vremeOra">Ora: %data%</p>';
var HTMLprognozaTitle = '<h2 class="prognozaTitle">Vremea in urmatoarele zile</h2><hr>';

//JSON Vreme
function arataVreme() {
  var location = document.getElementById('location').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);
      afisareVreme(json);
    }
  };

  xhttp.open('GET', URL_CURRENT_WEATHER + location, true);
  xhttp.send();
}

//Afisare Vreme
function afisareVreme(json) {
  document.getElementById('map').style.display = 'inherit';
  var vremeImg = HTMLvremeImg.replace('%data%', URL_WEATHER_ICON_PREFIX + json.weather[0].icon + '.png');
  var vremeDescriere = HTMLvremeDescriere.replace('%data%', json.weather[0].description);
  var vremeUmiditate = HTMLvremeUmiditate.replace('%data%', json.main.humidity);
  var vremePresiune = HTMLvremePresiune.replace('%data%', json.main.pressure);
  var vremeTemperatura = HTMLvremeTemperatura.replace('%data%', json.main.temp);
  var vremeMin = HTMLvremeMin.replace('%data%', json.main.temp_min);
  var vremeMax = HTMLvremeMax.replace('%data%', json.main.temp_max);

  document.getElementById('titleVreme').innerHTML = HTMLvremeTitle;
  document.getElementById('vreme').innerHTML = vremeImg + vremeDescriere +
    vremeUmiditate + vremePresiune + vremeTemperatura + vremeMin + vremeMax;

  var uluru = {
    lat: json.coord.lat,
    lng: json.coord.lon,
  };
  initMap(uluru);
}

//Initializare harta
function initMap(uluru) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: uluru,
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

//Afisare Harta
function displayMap(lat, lon) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, lon),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

//JSON Prognoza
function arataPrognoza() {
  var location = document.getElementById('location').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);
      afisarePrognoza(json);
    }
  };

  xhttp.open('GET', URL_FORECAST_WEATHER + location, true);
  xhttp.send();
}


function afisarePrognoza(json) {
  var rawForecast = [];
  var i;
  var j;

  //Creare vector obiecte
  for (i = 0; i < json.list.length; i++) {
    var date = getDateFromText(json.list[i].dt_txt);
    var description = json.list[i].weather[0].description;
    var icon = json.list[i].weather[0].icon;
    var temperature = json.list[i].main.temp;
    var time = getTimeFromText(json.list[i].dt_txt);
    var obj = createObj(date, description, icon, temperature, time);
    rawForecast.push(obj);
  }

  //Sortare vector
  var forecast = [];
  i = 0;
  forecast[i] = [];
  forecast[i].push(rawForecast[0]);
  for (k = 1; k < rawForecast.length; k++) {
    j = forecast[i].length - 1;
    if (forecast[i][j].date != rawForecast[k].date) {
      i++;
      forecast[i] = [];
    }

    forecast[i].push(rawForecast[k]);
  }

  //Afisare Prognoza
  document.getElementById('prognozaTitle').innerHTML = HTMLprognozaTitle;
  var doc = document.getElementById('prognoza');
  doc.innerHTML = '';
  for (i = 0; i < forecast.length; i++) {
    var vremeZiua = HTMLvremeZiua.replace('%data%', forecast[i][0].date);
    var HTMLprognoza = '<div class="prognoze">' + vremeZiua;
    for (j = 0; j < forecast[i].length; j++) {
      var vremeImg = HTMLvremeImg.replace('%data%', URL_WEATHER_ICON_PREFIX + forecast[i][j].icon +
        '.png');
      var vremeOra = HTMLvremeOra.replace('%data%', forecast[i][j].time);
      var vremeTemperatura = HTMLvremeTemperatura.replace('%data%', forecast[i][j].temperature);
      var vremeDescriere = HTMLvremeDescriere.replace('%data%', forecast[i][j].description);
      HTMLprognoza += vremeImg + vremeOra + vremeTemperatura + vremeDescriere;
    }

    doc.innerHTML += HTMLprognoza + '</div>';
  }
}

//Creeare obiect
function createObj(date, description, icon, temperature, time) {
  var obj = {
    date: date,
    description: description,
    icon: icon,
    temperature: temperature,
    time: time,
  };
  return obj;
}

//Data
function getDateFromText(text) {
  var year = text.substr(0, 4);
  var month = text.substr(5, 2);
  var date = text.substr(8, 2);
  return date + '/' + month + '/' + year;
}

//Ora
function getTimeFromText(text) {
  return text.substr(11);
}

//'Enter' pentru afisare vreme
function submitFromEnter(event) {
  if (event.keyCode == 13) {
    arataVreme();
  }
}
