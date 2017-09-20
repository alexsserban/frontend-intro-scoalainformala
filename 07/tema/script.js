var students = [];
var HTMLstudentsFirstRow =
  '<div id="first-row"class="studentRow"><p class="column">Nume</p><p class="column">Medie</p></div>';
var HTMLnewStudent =
  '<div class="studentRow"><p class="column">%name%</p><p id="%id%" class="column">%average%</p><p class="column"><a class="button" onclick="showStudentGrades(%id%)">%button%</a></p></div>';
var HTMLcurrentStudent = 'Note Elev: %data%';
var HTMLnewGrade = '<div class="studentGrades">%data%</div>';
var HTMLnoGrades = '<p class="noEntryes">Nicio nota adaugata.</p>';
var id = 0;

//Adaugare Student din formular
function addStudent() {
  var studentName = document.getElementById('newStudent').value;
  var nameError = document.getElementById('invalidName');
  if (!studentName) {
    nameError.innerHTML = 'Eroare: Nu ai adaugat niciun nume !';
  } else if (isAlreadyStudent(studentName)) {
    nameError.innerHTML = 'Eroare: Elevul exista deja!';
  } else {
    nameError.innerHTML = '';
    var i = students.length;
    addStudentRow(i, studentName, '');
    students[i] = {};
    students[i].name = studentName;
    students[i].average = 0;
    students[i].gradesSum = 0;
    students[i].grades = [];
  }
}

// Verificare Nume Student Duplicat
function isAlreadyStudent(studentName) {
  for (var i = 0; i < students.length; i++) {
    if (students[i].name == studentName) return 1;
  }

  return 0;
}

// Adaugare linie Student
function addStudentRow(i, studentName, average) {
  if (i == 0) {
    document.getElementById('students').innerHTML = HTMLstudentsFirstRow;
    document.getElementById('noStudents').style.display = 'none';
  }

  var studentRow = newStudentRow(i, studentName, average, 'Vezi Notele');
  document.getElementById('students').innerHTML += studentRow;
}

// Creeare Linie Student
function newStudentRow(id, studentName, average, button) {
  var studentRow = HTMLnewStudent.replace('%name%', studentName);
  studentRow = studentRow.replace('%button%', button);
  studentRow = studentRow.replace('%average%', round(average, 2) || '-');
  studentRow = studentRow.replace('%id%', id);
  studentRow = studentRow.replace('%id%', id);
  return studentRow;
}

//Afiseaza Panou Note Student
function showStudentGrades(index) {
  document.getElementById('grades').innerHTML = '';
  id = index;
  var currentStudent = HTMLcurrentStudent.replace('%data%', students[id].name);
  document.getElementById('note_elev_wrapper').style.display = 'inline';
  document.getElementById('lista_elevi_wrapper').style.width = '50%';
  document.getElementById('currentStudent').innerHTML = currentStudent;
  if (students[id].grades.length == 0) {
    document.getElementById('grades').innerHTML = HTMLnoGrades;
  } else {
    var newGrade = HTMLnewGrade.replace('%data%', 'Note');
    document.getElementById('grades').innerHTML = '<br>' + newGrade;
    for (var i = 0; i < students[id].grades.length; i++) {
      newGrade = HTMLnewGrade.replace('%data%', round(students[id].grades[i], 2));
      document.getElementById('grades').innerHTML += newGrade;
    }
  }
}

//Ascunde Panou Note Student
function hideStudentGrades() {
  document.getElementById('note_elev_wrapper').style.display = 'none';
  document.getElementById('lista_elevi_wrapper').style.width = '100%';
}

//Adaugare Note din formular
function addGrade() {
  var studentGrade = document.getElementById('newGrade').value;
  var gradeError = document.getElementById('invalidGrade');
  if (studentGrade >= 1 && studentGrade <= 10) {
    gradeError.innerHTML = '';
    students[id].grades.push(parseFloat(studentGrade));
    students[id].gradesSum += parseFloat(studentGrade);
    students[id].average = round(parseFloat(students[id].gradesSum /
      students[id].grades.length), 2);
    document.getElementById(id).innerHTML = students[id].average;
    showStudentGrades(id);
  } else {
    gradeError.innerHTML = 'Eroare: Nota nu este valida!';
  }

}

//Ordonare Crescatoare Note
function sortAscGrades() {
  var aux;
  for (i = 1; i < students[id].grades.length; i++) {
    for (j = 0; j < students[id].grades.length - i; j++) {
      if (students[id].grades[j] > students[id].grades[j + 1]) {
        aux = students[id].grades[j];
        students[id].grades[j] = students[id].grades[j + 1];
        students[id].grades[j + 1] = aux;
      }
    }
  }

  writeGrades();
}

//Ordonare Descrescatoare Note
function sortDescGrades() {
  var aux;
  for (i = 1; i < students[id].grades.length; i++) {
    for (j = 0; j < students[id].grades.length - i; j++) {
      if (students[id].grades[j] < students[id].grades[j + 1]) {
        aux = students[id].grades[j];
        students[id].grades[j] = students[id].grades[j + 1];
        students[id].grades[j + 1] = aux;
      }
    }
  }

  writeGrades();
}

//Afisare Note Ordonate
function writeGrades() {
  var newGrade = HTMLnewGrade.replace('%data%', 'Note');
  document.getElementById('grades').innerHTML = '<br>' + newGrade;
  for (var i = 0; i < students[id].grades.length; i++) {
    newGrade = HTMLnewGrade.replace('%data%', students[id].grades[i]);
    document.getElementById('grades').innerHTML += newGrade;
  }
}

//Ordonare Crescatoare Studenti
function sortAscStudents() {
  var aux;
  for (i = 1; i < students.length; i++) {
    for (j = 0; j < students.length - i; j++) {
      if (students[j].average > students[j + 1].average) {
        aux = students[j];
        students[j] = students[j + 1];
        students[j + 1] = aux;
      }
    }
  }

  writeStudentsList();
}

//Ordonare Descrescatoare Studenti
function sortDescStudents() {
  var aux;
  for (i = 1; i < students.length; i++) {
    for (j = 0; j < students.length - i; j++) {
      if (students[j].average < students[j + 1].average) {
        aux = students[j];
        students[j] = students[j + 1];
        students[j + 1] = aux;
      }
    }
  }

  writeStudentsList();
}

////Afisare Studenti Ordonati
function writeStudentsList() {
  document.getElementById('students').innerHTML = '';
  for (var i = 0; i < students.length; i++) {
    addStudentRow(i, students[i].name, students[i].average);
  }
}

//Rotunjire
function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

//Folosire 'Enter' pentru trimitere entry nou formular
function keypress(event) {
  console.log('event_key', event.keyCode);
  if (event.keyCode == 13) {
    addStudent();
  }
}
