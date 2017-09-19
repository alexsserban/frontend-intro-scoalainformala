var students = [];
var HTMLstudentsFirstRow =
  '<div id="first-row"class="studentRow"><p class="column">Nume</p><p class="column">Medie</p></div>';
var HTMLnewStudent =
  '<div class="studentRow"><p class="column">%name%</p><p id="%id%" class="column"></p><p class="column"><a class="add" onclick="showStudentGrades(%id%)">%button%</a></p></div>';
var HTMLcurrentStudent = 'Note Elev: %data%';
var HTMLnewGrade = '<div class="studentGrades">%data%</div>';
var HTMLnoGrades = '<p>Nicio nota adaugata.</p>';
var id = 0;

function addStudent() {
  var studentName = document.getElementById('newStudent').value;
  var nameError = document.getElementById('invalidName');
  if (!studentName) {
    nameError.innerHTML = 'Eroare: Nu ai adaugat niciun nume !';
  } else {
    nameError.innerHTML = '';
    var i = students.length;
    if (i == 0) {
      document.getElementById('lista_elevi_wrapper').innerHTML += HTMLstudentsFirstRow;
      document.getElementById('noStudents').style.display = 'none';
    }

    var studentRow = newStudentRow(i, studentName, '', 'Vezi Notele');
    document.getElementById('lista_elevi_wrapper').innerHTML += studentRow;
    students[i] = {};
    students[i].name = studentName;
    students[i].average = 0;
    students[i].gradesSum = 0;
    students[i].grades = [];
  }
}

function newStudentRow(id, studentName, average, button) {
  var studentRow = HTMLnewStudent.replace('%name%', studentName);
  studentRow = studentRow.replace('%button%', button);
  studentRow = studentRow.replace('%id%', id);
  studentRow = studentRow.replace('%id%', id);
  return studentRow;
}

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
      newGrade = HTMLnewGrade.replace('%data%', students[id].grades[i]);
      document.getElementById('grades').innerHTML += newGrade;
    }
  }
}

function hideStudentGrades() {
  document.getElementById('note_elev_wrapper').style.display = 'none';
  document.getElementById('lista_elevi_wrapper').style.width = '100%';
}

function addGrade() {

  var studentGrade = document.getElementById('newGrade').value;
  var gradeError = document.getElementById('invalidGrade');
  if (studentGrade >= 1 && studentGrade <= 10) {
    gradeError.innerHTML = '';
    students[id].grades.push(studentGrade);
    students[id].gradesSum += parseInt(studentGrade);
    students[id].average = (students[id].gradesSum / students[id].grades.length);
    document.getElementById(id).innerHTML = students[id].average;
    showStudentGrades(id);
  } else {
    gradeError.innerHTML = 'Eroare: Nota nu este valida!';
  }

}

function keypress(event) {
  if (event.keyCode == 13) {
    addStudent();
  }
}

/*
<div id="foo1"></div>
<div id="foo2"></div>
<div id="foo3"></div>

document.getElementById('foo2').nextSibling; // #foo3
document.getElementById('foo2').previousSibling; // #foo1
*/
