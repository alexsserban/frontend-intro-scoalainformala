//Calculati maximul dintr-un array.
function calcMax(array) {
  var max = array[0];
  for (var i = 1; i < array.length; i++) {
    if (max < array[i]) {
      max = array[i];
    }
  }

  return max;
}

//Aflati pozitia unei valori intr-un vector
function findPositionInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) return i;
  }
}

//Ordonare Crescatoare BubbleSort
function sortAscBubble(array) {
  var aux;
  for (i = 1; i < array.length; i++) {
    for (j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        aux = array[j];
        array[j] = array[j + 1];
        array[j + 1] = aux;
      }
    }
  }

  return array;
}

//Ordonare Descrescatoare BubbleSort
function sortDescBubble(array) {
  var aux;
  for (i = 1; i < array.length; i++) {
    for (j = 0; j < array.length - i; j++) {
      if (array[j] < array[j + 1]) {
        aux = array[j];
        array[j] = array[j + 1];
        array[j + 1] = aux;
      }
    }
  }

  return array;
}

//Ordonare Vector QuickSort
function sortAscQuick(array, left, right) {
  var i = left;
  var j = right;
  var tmp;
  var pivot = array[(i + j) / 2];

  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }

    while (array[j] > pivot) {
      j--;
    }

    if (i <= j) {
      tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      i++;
      j--;
    }
  }

  if (left < j) sortAscQuick(array, left, j);
  if (i < right) sortAscQuick(array, i, right);
  return array;
}

//Afisare HTML Note Random
function displayRandomGrades() {
  var gradesHTML = '';
  var array = [];
  for (var i = 0; i < 10; i++) {
    array[i] = Math.floor((Math.random() * 10) + 1);
    gradesHTML += '<div>' + array[i] + '</div>';
  }

  document.getElementById('grades').innerHTML = gradesHTML;
  return array;
}

//Afisare HTML Note in ordine crescatoare
function displayAsc(array) {
  array = sortAscBubble(array);
  var gradesHTML = '';
  for (var i = 0; i < 10; i++) {
    gradesHTML += '<div>' + array[i] + '</div>';
  }

  document.getElementById('grades').innerHTML = gradesHTML;
}

//Afisare HTML Note in ordine descrescatoare
function displayDesc(array) {
  array = sortDescBubble(array);
  var gradesHTML = '';
  for (var i = 0; i < 10; i++) {
    gradesHTML += '<div>' + array[i] + '</div>';
  }

  document.getElementById('grades').innerHTML = gradesHTML;
}

function parseGrade() {
  var nota1 = document.getElementById('nota1').value;
  var nota2 = document.getElementById('nota2').value;
  var nota3 = document.getElementById('nota3').value;
  var nota4 = document.getElementById('nota4').value;
  var nota5 = document.getElementById('nota5').value;
  var elev = {
    nume: document.getElementById('name').value,
    note: [nota1, nota2, nota3, nota4, nota5],
    medie: (nota1 + nota2 + nota3 + nota4 + nota5) / 5,
  };
  console.log(elev);
  return elev;
}

var note = [8, 7, 3, 9, 10, 2, 1];
console.log('Maximul din Array-ul ', note, ' este: ', calcMax(note));
console.log('Maximul se afla pe pozitia', findPositionInArray(note, calcMax(note)));
console.log('Array-ul ordonat crescator cu Bubble Sort este: ', sortAscBubble(note));
console.log('Array-ul ordonat descrescator cu Bubble Sort este: ', sortDescBubble(note));
console.log('Array-ul ordonat crescator cu Quick Sort este: ', sortAscQuick(note));

var gradesArray = displayRandomGrades();
var dada = parseGrade();
console.log(dada);
