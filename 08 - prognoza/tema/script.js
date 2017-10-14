var htmlAscButton = '<button class="sButtons" onclick="sortAsc()">Sort Asc</button>';
var htmlDescButton = '<button class="sButtons" onclick="sortDesc()">Sort Desc</button>';
var htmlItemDesc = '<h3>Item Description</h3>';
var htmlAction = '<h3>Action</h3>';
var htmlItemButton = '<p><button class="item%data%" onclick="buttonAction(this.className)">Mark as buyed</button></p>';
var htmlItemName = '<p class="item%data%">%data%</p>';
var items = [];

//Adaugare Item in Lista
function addItem() {
  var input = document.getElementById('input');
  var errorMessage = document.getElementById('errorMessage');
  if (!input.value) {
    errorMessage.innerHTML = 'Submit an Item.';
  } else if (isAlreadyItem(input.value)) {
    errorMessage.innerHTML = 'Item is already in list.';
  } else {
    errorMessage.innerHTML = '';
    if (items.length == 0) {
      document.getElementById('sortButtons').innerHTML = htmlAscButton + htmlDescButton;
      document.getElementById('items').innerHTML = htmlItemDesc;
      document.getElementById('buttons').innerHTML = htmlAction;
    }

    items.push(createObj(input.value, 0));
    var itemName = htmlItemName.replace('%data%', items.length - 1);
    itemName = itemName.replace('%data%', input.value);
    var itemButton = htmlItemButton.replace('%data%', items.length - 1);
    document.getElementById('items').innerHTML += itemName;
    document.getElementById('buttons').innerHTML += itemButton;
    input.value = '';
  }
}

//Creare obiect
function createObj(value, line) {
  var obj = {
    value: value,
    line: line,
  };
  return obj;
}

//Verificare Item existent
function isAlreadyItem(item) {
  for (var i = 0; i < items.length; i++) {
    if (item == items[i].value) return 1;
  }

  return 0;
}

//Taiere Item din Lista
function buttonAction(id) {
  document.getElementsByClassName(id)[0].style.textDecoration =  'line-through';
  index = id.substr(4);
  console.log(index);
  items[index].line = 1;
}

//Sortare Ascendenta
function sortAsc() {
  var aux;
  for (i = 1; i < items.length; i++) {
    for (j = 0; j < items.length - i; j++) {
      if (items[j].value > items[j + 1].value) {
        aux = items[j];
        items[j] = items[j + 1];
        items[j + 1] = aux;
      }
    }
  }

  displaySortItems();
}

//Sortare Descendenta
function sortDesc() {
  var aux;
  for (i = 1; i < items.length; i++) {
    for (j = 0; j < items.length - i; j++) {
      if (items[j].value < items[j + 1].value) {
        aux = items[j];
        items[j] = items[j + 1];
        items[j + 1] = aux;
      }
    }
  }

  displaySortItems();
}

//Afisare
function displaySortItems() {
  document.getElementById('items').innerHTML = htmlItemDesc;
  for (var i = 0; i < items.length; i++) {
    var itemName = htmlItemName.replace('%data%', i);
    itemName = itemName.replace('%data%', items[i].value);
    document.getElementById('items').innerHTML += itemName;
    if (items[i].line) {
      var id = 'item' + i;
      buttonAction(id);
    }
  }
}

//'Enter' pentru adaugare elev nou
function itemFormEnter(event) {
  if (event.keyCode == 13) {
    addItem();
  }
}
