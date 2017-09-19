var students = [];
var HTMLnewStudent = '<div id="student%id%" class="studentRow"><p class="column">%name%</p><p class="column">%average%</p><p class="column"><a class="add" onclick="click(event, this)">%button%</a></p></div>';
function addStudent() {
  var studentName = document.getElementById('newStudent').value;
  var nameError = document.getElementById('no-name');
  if (!studentName) {
    nameError.innerHTML = 'Eroare: Nu ai adaugat niciun nume !';
  } else {
    nameError.innerHTML = '';
    var i = students.length;
    if (i == 0) {
      var studentsFirstRow = newStudentRow('FirstRow', 'Nume', 'Medie', '');
      document.getElementById('lista_elevi_wrapper').innerHTML += studentsFirstRow;
      document.getElementById('no-students').style.display = 'none';
    }

    var studentRow = newStudentRow(i, studentName, '', 'Vezi Notele');
    document.getElementById('lista_elevi_wrapper').innerHTML += studentRow;
    students[i] = {};
    students[i].name = studentName;
    students[i].average = 0;
    students[i].grades = [];
  }
}

function newStudentRow(id, studentName, average, button) {
  var studentRow = HTMLnewStudent.replace('%name%', studentName);
  studentRow = studentRow.replace('%average%', average);
  studentRow = studentRow.replace('%button%', button);
  studentRow = studentRow.replace('%id%', id);
  return studentRow;
}

function click(event, elem) {
  console.log(event);
}
